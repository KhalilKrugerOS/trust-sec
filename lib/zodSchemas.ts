import { z } from "zod";

export const COURSE_CATEGORIES = [
  "Introduction to Cybersecurity",
  "Network Security",
  "Web Application Security",
  "Operating System Security",
  "Cryptography",
  "Penetration Testing",
  "Ethical Hacking",
  "Digital Forensics",
  "Incident Response",
  "Malware Analysis",
  "Reverse Engineering",
  "Cloud Security",
  "Mobile Security",
  "Threat Intelligence",
  "Security Operations (SOC)",
  "Red Teaming",
  "Blue Teaming",
  "OSINT (Open Source Intelligence)",
  "Privilege Escalation",
  "Vulnerability Assessment",
  "Exploit Development",
  "Wireless Security",
  "Social Engineering",
  "Security Governance & Compliance",
  "Secure Coding",
] as const;
export const CourseStatus = ["PUBLISHED", "DRAFT", "ARCHIVED"] as const;

export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const CourseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(255),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(10000),
  fileKey: z.string().min(1, { message: "File key is required" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration is at least 1 hour long" })
    .max(50),
  level: z.enum(COURSE_LEVELS, { message: "Level is required" }),
  category: z.enum(COURSE_CATEGORIES, {
    message: "Course category is required",
  }),
  smallDescription: z
    .string()
    .min(10, {
      message: "Small description must be at least 10 characters long",
    })
    .max(1000),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(255),
  status: z.enum(CourseStatus, { message: "Course status is required" }),
});

export const courseSessionSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  courseId: z.uuid({ message: "Invalid Course Id", version: "v4" }),
});

export const lessonSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  type: z.enum(["VIDEO", "ARTICLE", "QUIZ"], {
    message: "Invalid lesson type",
  }),
  sessionId: z.uuid({ message: "Invalid Session Id", version: "v4" }),
  courseId: z.uuid({ message: "Invalid Course Id", version: "v4" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .optional(),
  order: z.coerce
    .number()
    .int()
    .min(1, { message: "Order must be at least 1" }),
  duration: z.coerce
    .number()
    .int()
    .min(1, { message: "Duration must be at least 1 minute" })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

// Schema for updating a lesson (edit form) - only editable fields
export const lessonUpdateSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" })
    .nullable(),
  thumbnailKey: z.string().nullable(),
  videoKey: z.string().nullable(),
  content: z.string().nullable(),
});

export type courseSessionSchemaType = z.infer<typeof courseSessionSchema>;
export type CourseSchemaType = z.infer<typeof CourseSchema>;
export type CourseUpdateInput = Partial<CourseSchemaType>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
export type LessonUpdateSchemaType = z.infer<typeof lessonUpdateSchema>;
