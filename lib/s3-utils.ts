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

  // Build the S3 URL for OVHcloud (virtual host style)
  const bucket =
    process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES || "eatable-schawlow";
  const endpoint =
    process.env.NEXT_PUBLIC_S3_ENDPOINT || "https://s3.sbg.io.cloud.ovh.net";

  // OVHcloud virtual host format: https://{bucket}.s3.{region}.io.cloud.ovh.net/{key}
  // Or path style: https://s3.{region}.io.cloud.ovh.net/{bucket}/{key}
  // Using virtual host style as shown in OVHcloud dashboard
  const virtualHost = endpoint.replace("https://s3.", `https://${bucket}.s3.`);
  return `${virtualHost}/${fileKey}`;
}
