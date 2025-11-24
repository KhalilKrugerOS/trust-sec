"server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins/admin";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    // google social provider
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ otp }) {
        // Implement your email sending logic here
        await resend.emails.send({
          from: "Trust-Sec <onboarding@resend.dev>",
          to: ["arabickhalil@gmail.com"],
          subject: "Trust-Sec - Verify your email",
          html: `your OTP is: <strong>${otp}</strong>`,
        });
      },
    }),
    admin(),
  ],
});
