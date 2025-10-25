# Authentication Documentation

## Overview

This project uses Better Auth with Prisma ORM and Neon PostgreSQL for authentication. The system supports Google OAuth social login with plans to extend to email/password authentication.

## Tech Stack

### Better Auth

- Modern authentication library for Next.js
- Handles OAuth flows, session management, and security
- Type-safe with full TypeScript support
- Built-in CSRF protection and secure cookie handling

### Prisma ORM

- Type-safe database client with auto-generated TypeScript types
- Manages database schema and migrations
- Provides query builder interface for database operations
- Custom output path: `lib/generated/prisma`

### Neon PostgreSQL

- Serverless PostgreSQL database
- Auto-scaling and auto-suspend on free tier
- Requires direct connection URL for migrations, pooled connection for app queries

## Database Schema

### Models

```prisma
model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Schema Generation

Generated using Better Auth CLI:

```bash
npx @better-auth/cli generate
```

This command analyzes your Better Auth configuration and creates the necessary Prisma models.

## File Structure

```
lib/
├── auth.ts              # Better Auth server configuration
├── auth-client.ts       # Better Auth client instance
├── db.ts                # Prisma client singleton
└── env.ts               # Environment variable validation

app/
└── api/
    └── auth/
        └── [...all]/
            └── route.ts # Auth API route handler

prisma/
└── schema.prisma        # Database schema definition
```

## Core Files

### `lib/auth.ts` - Server Configuration

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
});
```

**Purpose**: Configure Better Auth with database adapter and OAuth providers.

### `lib/auth-client.ts` - Client Instance

```typescript
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();
```

**Purpose**: Create client-side auth instance for use in React components.

### `lib/db.ts` - Prisma Singleton

```typescript
import { PrismaClient } from "./generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Purpose**: Prevent multiple Prisma instances in development due to hot reloading.

### `lib/env.ts` - Environment Validation

```typescript
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    AUTH_GOOGLE_CLIENT_ID: z.string().min(1),
    AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

**Purpose**: Type-safe environment variable validation using Zod schemas.

### `app/api/auth/[...all]/route.ts` - API Route

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

**Purpose**: Expose Better Auth endpoints as Next.js API routes. Handles all auth requests at `/api/auth/*`.

## Social Login Implementation

### Google OAuth Setup

1. **Google Cloud Console**
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret

2. **Environment Variables**

```env
AUTH_GOOGLE_CLIENT_ID=your_client_id
AUTH_GOOGLE_CLIENT_SECRET=your_client_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
DATABASE_URL=postgresql://...
```

3. **Client Implementation**

```typescript
import { authClient } from "@/lib/auth-client";

async function handleGoogleSignIn() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    fetchOptions: {
      onSuccess: () => {
        toast.success("Successfully signed in!");
      },
      onError: (error) => {
        toast.error("Failed to sign in", { description: error.error.message });
      }
    }
  });
}
```

### Authentication Flow

1. User clicks "Sign in with Google"
2. Client calls `authClient.signIn.social({ provider: "google" })`
3. Better Auth redirects to Google OAuth consent screen
4. User approves permissions
5. Google redirects to `/api/auth/callback/google`
6. Better Auth validates OAuth response
7. Better Auth creates/updates User and Account records via Prisma
8. Session created and stored in database
9. User redirected to `callbackURL` with session cookie

## Development Workflow

### Initial Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Push schema to database (development)
pnpm dlx prisma db push

# Start development server
pnpm dev
```

### Schema Changes

When modifying `prisma/schema.prisma`:

```bash
# Push changes to database (fast, no migration files)
pnpm dlx prisma db push

# Regenerate Prisma Client (usually automatic with db push)
pnpm dlx prisma generate
```

### Debugging

```bash
# Open Prisma Studio to view database
pnpm dlx prisma studio

# Validate schema syntax
pnpm dlx prisma validate

# Format schema file
pnpm dlx prisma format
```

## Production Migration

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Schema sync | `prisma db push` | `prisma migrate deploy` |
| Database URL | Direct connection | Pooled connection (optional) |
| Migration files | Not created | Version controlled |
| Rollback | Manual | Via migrations |

### Migration Strategy

1. **Create Migration**

```bash
pnpm dlx prisma migrate dev --name initial_auth_schema
```

This creates:

- `prisma/migrations/` directory
- SQL migration files with timestamps
- Applies migration to development database

2. **Commit Migrations**

```bash
git add prisma/migrations
git commit -m "Add initial auth schema"
```

3. **Deploy to Production**

```bash
# Run in production environment
pnpm dlx prisma migrate deploy
```

### Connection String Configuration

Development (direct connection):

```env
DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"
```

Production (pooled connection):

```env
DATABASE_URL="postgresql://user:pass@host-pooler.neon.tech/db?sslmode=require&channel_binding=require"
```

For Prisma migrations, always use direct connection. For application queries in high-traffic scenarios, use pooled connection.

### Environment Variables in Production

Ensure all required variables are set:

```env
DATABASE_URL=postgresql://...
AUTH_GOOGLE_CLIENT_ID=...
AUTH_GOOGLE_CLIENT_SECRET=...
BETTER_AUTH_URL=https://your-domain.com
BETTER_AUTH_SECRET=... # Use strong random value
```

Update Google OAuth redirect URIs to include production domain:

- `https://your-domain.com/api/auth/callback/google`

## Common Issues

### "Table does not exist"

**Cause**: Schema not pushed to database  
**Solution**: Run `pnpm dlx prisma db push`

### "EPERM: operation not permitted"

**Cause**: Next.js dev server has Prisma files locked  
**Solution**: Stop dev server, run `prisma generate`, restart

### "Can't reach database server"

**Cause**: Using pooled connection for migrations or database suspended  
**Solution**: Use direct connection URL, wake database in Neon dashboard

### "Environment variable not found"

**Cause**: `prisma.config.ts` blocks `.env` loading  
**Solution**: Delete `prisma.config.ts`, Prisma auto-loads `.env`

## Security Considerations

- Never commit `.env` file to version control
- Use strong random values for `BETTER_AUTH_SECRET`
- Rotate OAuth credentials regularly
- Enable HTTPS in production
- Set secure cookie flags in production
- Implement rate limiting on auth endpoints
- Monitor failed login attempts

## Future Extensions

### Email/Password Authentication

Add to `lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // ... existing config
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
});
```

### Additional OAuth Providers

```typescript
socialProviders: {
  google: { /* ... */ },
  github: {
    clientId: env.AUTH_GITHUB_CLIENT_ID,
    clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
  },
},
```

## Resources

- [Better Auth Documentation](https://better-auth.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Google OAuth Setup](https://console.cloud.google.com)
