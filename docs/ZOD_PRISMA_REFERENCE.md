# Zod & Prisma Integration Reference

This document covers our usage of Zod for validation, common issues encountered, and how it integrates with Prisma.

---

## Table of Contents

1. [Schema Organization](#schema-organization)
2. [Common Patterns](#common-patterns)
3. [Type Conversions: Zod ↔ Prisma](#type-conversions-zod--prisma)
4. [React Hook Form Integration](#react-hook-form-integration)
5. [Problems & Solutions](#problems--solutions)
6. [Best Practices](#best-practices)

---

## Schema Organization

All shared Zod schemas are defined in `lib/zodSchemas.ts`:

```typescript
// lib/zodSchemas.ts
import { z } from "zod";

// Constants as const arrays (for enum-like behavior)
export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const CourseStatus = ["PUBLISHED", "DRAFT", "ARCHIVED"] as const;

// Schema definition
export const CourseSchema = z.object({
  title: z.string().min(3).max(255),
  level: z.enum(COURSE_LEVELS),
  // ...
});

// Type inference
export type CourseSchemaType = z.infer<typeof CourseSchema>;
```

### Schema Types We Use

| Schema | Purpose | Used In |
|--------|---------|---------|
| `CourseSchema` | Create/Update course | Course forms, server actions |
| `lessonSchema` | Create lesson (all required fields) | Lesson creation |
| `lessonUpdateSchema` | Update lesson (editable fields only) | Lesson edit form, update action |
| `courseSessionSchema` | Create session | Session creation |

---

## Common Patterns

### 1. Create vs Update Schemas

**Create Schema** - All required fields for initial creation:
```typescript
export const lessonSchema = z.object({
  title: z.string().min(3),
  type: z.enum(["VIDEO", "ARTICLE", "QUIZ"]),
  sessionId: z.uuid(),
  courseId: z.uuid(),
  order: z.coerce.number().min(1),
  // Optional fields
  content: z.string().optional(),
  duration: z.coerce.number().optional(),
});
```

**Update Schema** - Only editable fields, often nullable:
```typescript
export const lessonUpdateSchema = z.object({
  title: z.string().min(3),
  duration: z.number().min(1).nullable(),
  thumbnailKey: z.string().nullable(),
  videoKey: z.string().nullable(),
  content: z.string().nullable(),
});
```

### 2. UUID Validation

```typescript
// For foreign key references
sessionId: z.uuid({ message: "Invalid Session Id", version: "v4" }),
courseId: z.uuid({ message: "Invalid Course Id", version: "v4" }),
```

### 3. Coercion for Form Inputs

HTML form inputs always return strings. Use `z.coerce` to convert:

```typescript
// Input: "10" → Output: 10
price: z.coerce.number().min(0),
duration: z.coerce.number().min(1),
order: z.coerce.number().min(1),
```

---

## Type Conversions: Zod ↔ Prisma

### Enum Handling

**Problem**: Prisma enums are UPPERCASE, UI often uses lowercase.

```typescript
// Prisma Schema
enum LessonType {
  VIDEO
  READING
}

// UI State (lowercase for user-friendliness)
type: "video" | "reading"

// Conversion when saving to database
type: lessonData.type.toUpperCase() as "VIDEO" | "READING"

// Conversion when loading from database
type: lesson.type.toLowerCase() as "video" | "reading"
```

### Nullable vs Optional

| Zod | TypeScript | Prisma | Use Case |
|-----|------------|--------|----------|
| `.optional()` | `field?: T` | No `?` in schema | Field may be omitted |
| `.nullable()` | `field: T \| null` | `field Type?` | Field exists but can be null |
| `.nullish()` | `field?: T \| null` | `field Type?` | Can be undefined OR null |

**Example**:
```typescript
// Zod
content: z.string().nullable()

// Prisma
content String?

// TypeScript Result
content: string | null
```

### Null to Undefined Conversion

React Hook Form and some UI components prefer `undefined` over `null`:

```typescript
// In form component
<RichTextEditor
  field={{
    ...field,
    value: field.value ?? undefined,  // null → undefined
  }}
/>
```

---

## React Hook Form Integration

### Standard Setup

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(3),
  // ...
});

type FormValues = z.infer<typeof FormSchema>;

function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });
  
  function onSubmit(values: FormValues) {
    // values is fully typed
  }
}
```

### ⚠️ Known Issue: External Schema Import

**Problem**: Importing schemas from external files can cause TypeScript errors with `@hookform/resolvers`:

```typescript
// This can cause type errors!
import { lessonUpdateSchema, LessonUpdateSchemaType } from "@/lib/zodSchemas";

const form = useForm<LessonUpdateSchemaType>({
  resolver: zodResolver(lessonUpdateSchema),  // ❌ Type error: unknown
});
```

**Error Message**:
```
Type 'Resolver<{ duration: unknown; ... }>' is not assignable to 
Type 'Resolver<{ duration: number | null; ... }>'
```

**Solutions**:

1. **Local Schema Definition** (Recommended):
```typescript
// In form component - matches the shared schema
const LessonFormSchema = z.object({
  title: z.string().min(3),
  duration: z.number().min(1).nullable(),
  // ...
});

type LessonFormValues = z.infer<typeof LessonFormSchema>;
```

2. **Type Casting** (Workaround):
```typescript
const form = useForm<LessonUpdateSchemaType>({
  resolver: zodResolver(lessonUpdateSchema) as any,
});
```

3. **Avoid z.coerce in Shared Schemas**:
```typescript
// ❌ Causes type inference issues with react-hook-form
duration: z.coerce.number().nullable()

// ✅ Works better
duration: z.number().nullable()
```

---

## Problems & Solutions

### Problem 1: Form Input Returns String, Schema Expects Number

**Symptom**: Validation fails or type mismatch errors.

**Solution**: Use `z.coerce` or handle in onChange:
```typescript
// Option A: Coerce in schema
duration: z.coerce.number().min(1)

// Option B: Handle in form
onChange={(e) => field.onChange(parseInt(e.target.value) || null)}
```

### Problem 2: Prisma Enum vs Zod Enum Mismatch

**Symptom**: `Type '"video"' is not assignable to type '"VIDEO"'`

**Solution**: Convert at the boundary:
```typescript
// When saving
await prisma.lesson.create({
  data: {
    type: formData.type.toUpperCase() as "VIDEO" | "READING",
  }
});

// When loading
const lesson = {
  ...data,
  type: data.type.toLowerCase() as "video" | "reading",
};
```

### Problem 3: safeParse Returns Union Type

**Symptom**: Can't access `.data` without checking `.success`

**Solution**: Always check success first:
```typescript
const result = CourseSchema.safeParse(data);

if (!result.success) {
  return { status: "error", message: result.error.message };
}

// TypeScript now knows result.data exists
await prisma.course.create({ data: result.data });
```

### Problem 4: Optional vs Required Fields Between Create/Update

**Symptom**: Update form requires fields that should be optional.

**Solution**: Create separate schemas:
```typescript
// For creation - strict requirements
export const lessonSchema = z.object({
  title: z.string().min(3),
  sessionId: z.uuid(),
  courseId: z.uuid(),
  order: z.coerce.number().min(1),
});

// For updates - flexible
export const lessonUpdateSchema = z.object({
  title: z.string().min(3),
  duration: z.number().nullable(),
  content: z.string().nullable(),
});
```

---

## Best Practices

### 1. Keep Schemas Close to Usage

For forms with react-hook-form, define the schema in the same file to avoid resolver type issues:

```typescript
// components/EditLessonForm.tsx
const LessonFormSchema = z.object({ ... });
```

### 2. Export Types from zodSchemas.ts

```typescript
export type CourseSchemaType = z.infer<typeof CourseSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
```

### 3. Use Const Arrays for Enums

```typescript
// Define once, use everywhere
export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

// In Zod
level: z.enum(COURSE_LEVELS)

// In components (for dropdowns)
COURSE_LEVELS.map(level => <option key={level}>{level}</option>)
```

### 4. Validate in Server Actions

```typescript
export async function updateLesson(id: string, data: unknown) {
  const result = lessonUpdateSchema.safeParse(data);
  
  if (!result.success) {
    return { error: "Invalid data" };
  }
  
  // Proceed with validated data
  await prisma.lesson.update({
    where: { id },
    data: result.data,
  });
}
```

### 5. Match Prisma Schema Field Names

```typescript
// Prisma
model Lesson {
  thumbnailKey String?
  videoKey     String?
}

// Zod (use same names!)
const lessonSchema = z.object({
  thumbnailKey: z.string().nullable(),
  videoKey: z.string().nullable(),
});
```

---

## Quick Reference

### Zod Methods Cheatsheet

| Method | Description | Example |
|--------|-------------|---------|
| `.min(n)` | Minimum length/value | `z.string().min(3)` |
| `.max(n)` | Maximum length/value | `z.string().max(255)` |
| `.optional()` | Field can be omitted | `z.string().optional()` |
| `.nullable()` | Field can be null | `z.string().nullable()` |
| `.nullish()` | Can be null or undefined | `z.string().nullish()` |
| `.default(v)` | Provide default value | `z.boolean().default(false)` |
| `z.coerce.number()` | Coerce string to number | Form inputs |
| `z.enum([...])` | Enum validation | `z.enum(["A", "B"])` |
| `z.uuid()` | UUID validation | Foreign keys |
| `.safeParse()` | Parse without throwing | Server actions |
| `.parse()` | Parse and throw on error | When you want exceptions |

### Type Inference

```typescript
// Infer type from schema
type MyType = z.infer<typeof MySchema>;

// Infer input type (before transforms)
type MyInput = z.input<typeof MySchema>;

// Infer output type (after transforms)
type MyOutput = z.output<typeof MySchema>;
```

---

## Related Files

- `lib/zodSchemas.ts` - All shared schemas
- `prisma/schema.prisma` - Database schema
- `app/admin/courses/[courseId]/edit/actions.ts` - Server actions using validation
- `app/admin/courses/[courseId]/lessons/[lessonId]/edit/_components/EditLessonForm.tsx` - Form with local schema

---

*Last updated: December 2024*
