import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(req: Request) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { key } = await req.json();

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });
    await S3.send(command);
    return new Response("File deleted Successfully", { status: 204 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response("Error deleting file", { status: 500 });
  }
}
