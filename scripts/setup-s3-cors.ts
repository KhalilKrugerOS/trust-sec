/**
 * Script to configure CORS settings for Tigris S3 bucket
 * Run with: pnpm exec tsx scripts/setup-s3-cors.ts
 */

import { S3Client } from "@aws-sdk/client-s3";
import { PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { resolve } from "path";

// Manually load .env file
const envPath = resolve(process.cwd(), ".env");
const envFile = readFileSync(envPath, "utf-8");
envFile.split("\n").forEach((line) => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    process.env[key] = value;
  }
});

// Use env variables
const AWS_REGION = process.env.AWS_REGION!;
const AWS_ENDPOINT_URL_S3 = process.env.AWS_ENDPOINT_URL_S3!;
const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!;

console.log("🔧 Configuration:");
console.log("  Region:", AWS_REGION);
console.log("  Endpoint:", AWS_ENDPOINT_URL_S3);
console.log("  Bucket:", BUCKET_NAME);
console.log("");

// Create S3 client for script
const s3Client = new S3Client({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT_URL_S3,
  forcePathStyle: false,
});

const corsConfiguration = {
  CORSRules: [
    {
      AllowedHeaders: ["*"],
      AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      AllowedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        // Add your production domain later:
        // "https://yourdomain.com",
      ],
      ExposeHeaders: ["ETag"],
      MaxAgeSeconds: 3000,
    },
  ],
};

async function setupCORS() {
  try {
    const command = new PutBucketCorsCommand({
      Bucket: BUCKET_NAME,
      CORSConfiguration: corsConfiguration,
    });

    await s3Client.send(command);
    console.log(
      "✅ CORS configuration successfully applied to bucket:",
      BUCKET_NAME
    );
    console.log("\nCORS Rules:");
    console.log(JSON.stringify(corsConfiguration, null, 2));
  } catch (error) {
    console.error("❌ Failed to configure CORS:", error);
    process.exit(1);
  }
}

setupCORS();
