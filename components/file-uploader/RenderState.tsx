import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground ",
            isDragActive && "animate-pulse text-primary"
          )}
        />
      </div>
      <p className="text-sm font-semibold text-foreground">
        Drag and drop files here or{" "}
        <span className="text-primary font-bold cursor-pointer ">
          click to upload
        </span>
      </p>
      <Button className="mt-4" type="button">
        Select File
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="text-destructive text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-sm font-semibold">Error uploading file.</p>
      <p className="text-xs  mt-1 text-muted-foreground">
        Something went wrong.
      </p>
      <Button
        className="mt-4 cursor-pointer"
        variant="destructive"
        type="button"
      >
        Retry
      </Button>
    </div>
  );
}

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileTypeAccepted,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileTypeAccepted: "image" | "video";
}) {
  return (
    <div className="text-center">
      {fileTypeAccepted === "image" ? (
        <Image
          src={previewUrl}
          alt="Uploaded Image"
          //width={150}
          //height={150}
          fill
          className="object-contain p-2"
        />
      ) : (
        <video controls className="max-h-64 w-full bg-black">
          <source src={previewUrl} />
          Your browser does not support the video tag.
        </video>
      )}
      <Button
        className={cn("absolute top-4 right-4")}
        variant="destructive"
        type="button"
        size="icon"
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p className="mt-2 text-sm font-medium text-foreground">
        Uploading ...
        <span className="font-bold">{progress}%</span>
      </p>
      <p className="mt-1 text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
}
