import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "Filename is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  fileSize: z.number().min(1, { message: "File size is required" }),
  isImage: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = fileUploadSchema.safeParse(body);
    if (!validation.success) {
      console.error("Validation error:", validation.error.format());
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 400 }
      );
    }
    const { fileName, contentType, fileSize } = validation.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;

    // Create command with ONLY Bucket and Key
    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: fileSize,
      Key: uniqueKey,
    });

    // Use custom S3 client and strip checksum query params
    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
      signableHeaders: new Set(["content-type"]),
    });
    const response = {
      presignedUrl,
      key: uniqueKey,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
