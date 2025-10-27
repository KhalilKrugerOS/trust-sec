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
    .max(100),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000),
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
    .max(255),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(100),
  courseStatus: z.enum(CourseStatus, { message: "Course status is required" }),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
export type CourseUpdateInput = Partial<CourseSchemaType>;
