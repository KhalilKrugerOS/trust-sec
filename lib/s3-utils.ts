/**
 * Utility functions for S3 file handling
 */

/**
 * Converts an S3 file key to a public URL
 * @param fileKey - The S3 file key (e.g., "abc-123.jpg") or full URL
 * @returns Full S3 public URL
 */
export function getS3PublicUrl(fileKey: string): string {
  // If it's already a full URL, return it
  if (fileKey.startsWith("http://") || fileKey.startsWith("https://")) {
    return fileKey;
  }

  // Build the S3 URL
  const bucket =
    process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES || "trust-sec-images";
  const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";

  return `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;
}
