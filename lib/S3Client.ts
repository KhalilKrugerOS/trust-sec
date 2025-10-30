import "server-only"; // Ensure this file is only included in server bundles to avoid leaking credentials to the client

import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

export const S3 = new S3Client({
  region: env.AWS_REGION || "us-east-1", // Use your AWS region
  //endpoint: env.AWS_ENDPOINT_URL_S3, // Remove this line for real AWS S3
  forcePathStyle: false,
  // env.AWS_ENDPOINT_URL_S3?.includes("minio") ||
  // env.AWS_ENDPOINT_URL_S3?.includes("tigris"), // Only for MinIO/Tigris
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

// Only remove checksum middleware for Tigris/MinIO, not for real AWS S3
// if (
//   env.AWS_ENDPOINT_URL_S3?.includes("tigris") ||
//   env.AWS_ENDPOINT_URL_S3?.includes("minio")
// ) {
//   S3.middlewareStack.remove("flexibleChecksumsMiddleware");
//   S3.middlewareStack.remove("flexibleChecksumsMiddlewareOptions");
// }
