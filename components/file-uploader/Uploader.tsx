"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { getS3PublicUrl } from "@/lib/s3-utils";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  error: boolean;
  objectUrl?: string;
  isDeleting: boolean;
  fileType: "image" | "video";
}

interface iAppProps {
  value?: string;
  onChange?: (value: string) => void;
}
export function Uploader({ onChange, value }: iAppProps) {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    key: value,
    error: false,
    objectUrl: value ? getS3PublicUrl(value) : undefined, // Convert fileKey to URL if exists
    isDeleting: false,
    fileType: "image",
  });

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prevState) => ({
        ...prevState,
        uploading: true,
        progress: 0,
      }));

      try {
        // get presigned url from the server
        const presignedRespnse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            fileSize: file.size,
            isImage: true,
          }),
        });
        if (!presignedRespnse.ok) {
          const errorData = await presignedRespnse
            .json()
            .catch(() => ({ error: "Failed to get upload URL" }));
          toast.error(errorData.error || "Failed to get presigned URL");
          setFileState((prevState) => ({
            ...prevState,
            uploading: false,
            progress: 0,
            error: true,
          }));
          return;
        }
        const { presignedUrl, key, publicUrl } = await presignedRespnse.json();

        console.log("🔧 Upload details:", {
          key,
          publicUrl,
          fileSize: file.size,
          fileName: file.name,
        });

        // upload the file to s3 using the presigned url using xhr to track progress
        // fetch does not support tracking progress
        // installing axios just for this is overkill
        // dont change the function to async/await as it will break the progress tracking
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentCompleted = (event.loaded / event.total) * 100;
              setFileState((prevState) => ({
                ...prevState,
                progress: Math.round(percentCompleted),
              }));
            }
          };
          xhr.onload = () => {
            console.log("📤 XHR Statusss:", xhr.status);
            console.log("📤 XHR Response:", xhr.responseText);

            if (xhr.status === 200 || xhr.status === 204) {
              onChange?.(key);

              setFileState((prevState) => ({
                ...prevState,
                uploading: false,
                progress: 100,
                key,
                objectUrl: publicUrl, // Use publicUrl from server response
              }));
              toast.success(`File uploaded successfully!`);
              resolve();
            } else {
              console.error("❌ Upload failed:", xhr.status, xhr.responseText);
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => {
            console.error("❌ XHR Error");
          };
          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);

          console.log(
            "🚀 Starting upload to:",
            presignedUrl.substring(0, 100) + "..."
          );
          xhr.send(file);
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("An unexpected error occurred");
        setFileState((prevState) => ({
          ...prevState,
          progress: 0,
          uploading: false,
          error: true,
        }));
      }
    },
    [onChange]
  );
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState({
          id: uuidv4(),
          file: file,
          uploading: false,
          progress: 0,
          key: undefined,
          error: false,
          objectUrl: URL.createObjectURL(file),
          isDeleting: false,
          fileType: "image",
        });
        uploadFile(file);
      }
    },
    [fileState.objectUrl, uploadFile]
  );
  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;
    try {
      setFileState((prevState) => ({
        ...prevState,
        isDeleting: true,
      }));
      const response = await fetch(`/api/s3/delete`, {
        method: "DELETE",
        body: JSON.stringify({ key: fileState.key }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Failed to delete file");
        setFileState((prevState) => ({
          ...prevState,
          isDeleting: true,
          error: true,
        }));
        return;
        //throw new Error("Failed to delete file");
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
      onChange?.("");

      setFileState(() => ({
        file: null,
        id: null,
        uploading: false,
        progress: 0,
        key: undefined,
        error: false,
        objectUrl: undefined,
        isDeleting: false,
        fileType: "image",
      }));
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file");
      setFileState((prevState) => ({
        ...prevState,
        isDeleting: false,
        error: true,
      }));
    }
  }
  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );
      const fileSizeExceeded = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("You can only upload one file");
        return [tooManyFiles.errors[0].message];
      }
      if (fileSizeExceeded) {
        toast.error("File size exceeds 5MB");
        return [fileSizeExceeded.errors[0].message];
      }
    }
  }
  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }
    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
      URL.revokeObjectURL(fileState.objectUrl);
    }
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 MB
    onDropRejected: rejectedFiles,
    onDrop: onDrop,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });
  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed p-8 text-center cursor-pointer transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
