// // Cybersecurity Course Categories inspired by TryHackMe

// export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

// // Helper function to check if a string is a valid category
// export function isValidCategory(category: string): category is CourseCategory {
//   return COURSE_CATEGORIES.includes(category as CourseCategory);
// }

// // Get categories grouped by difficulty level (optional)
// export const CATEGORY_GROUPS = {
//   beginner: [
//     "Introduction to Cybersecurity",
//     "Network Security",
//     "OSINT (Open Source Intelligence)",
//     "Security Governance & Compliance",
//   ],
//   intermediate: [
//     "Web Application Security",
//     "Cryptography",
//     "Operating System Security",
//     "Wireless Security",
//     "Cloud Security",
//     "Threat Intelligence",
//   ],
//   advanced: [
//     "Penetration Testing",
//     "Ethical Hacking",
//     "Digital Forensics",
//     "Malware Analysis",
//     "Reverse Engineering",
//     "Exploit Development",
//     "Red Teaming",
//     "Blue Teaming",
//   ],
// } as const;
