/**
 * Script to make S3 bucket publicly readable
 * Run with: pnpm exec tsx scripts/setup-s3-public.ts
 */

import { S3Client, PutBucketPolicyCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { resolve } from "path";

// Manually load .env file
const envPath = resolve(process.cwd(), ".env");
const envFile = readFileSync(envPath, "utf-8");
envFile.split("\n").forEach((line) => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let value = match[2].trim();
    // Remove surrounding quotes if present
    value = value.replace(/^["']|["']$/g, "");
    process.env[key] = value;
  }
});

// Use env variables
const AWS_REGION = process.env.AWS_REGION!;
const AWS_ENDPOINT_URL_S3 = process.env.AWS_ENDPOINT_URL_S3;
const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!;

console.log("🔧 Configuration:");
console.log("  Region:", AWS_REGION);
console.log("  Endpoint:", AWS_ENDPOINT_URL_S3 || "AWS Default (S3)");
console.log("  Bucket:", BUCKET_NAME);
console.log("");

// Create S3 client for script
const s3ClientConfig: any = {
  region: AWS_REGION,
  forcePathStyle: false,
};

// Only add endpoint if it exists (for MinIO/Tigris)
if (AWS_ENDPOINT_URL_S3) {
  s3ClientConfig.endpoint = AWS_ENDPOINT_URL_S3;
  s3ClientConfig.forcePathStyle = true;
}

const s3Client = new S3Client(s3ClientConfig);

// Public read policy for the bucket
const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${BUCKET_NAME}/*`,
    },
  ],
};

async function makePublic() {
  try {
    const command = new PutBucketPolicyCommand({
      Bucket: BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy),
    });

    await s3Client.send(command);
    console.log("✅ Bucket policy applied successfully!");
    console.log(`✅ All objects in '${BUCKET_NAME}' are now publicly readable`);
    console.log("\nBucket Policy:");
    console.log(JSON.stringify(bucketPolicy, null, 2));
  } catch (error) {
    console.error("❌ Failed to apply bucket policy:", error);
    console.log(
      "\n⚠️  If using AWS S3, you may need to disable 'Block Public Access' in the AWS Console first."
    );
    process.exit(1);
  }
}

makePublic();
