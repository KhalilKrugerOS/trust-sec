"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { deleteCourse } from "../actions";
import { toast } from "sonner";

interface DeleteCourseConfirmationProps {
  courseId: string;
  courseTitle: string;
  sessionCount: number;
}

export default function DeleteCourseConfirmation({
  courseId,
  courseTitle,
  sessionCount,
}: DeleteCourseConfirmationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmText, setConfirmText] = useState("");

  const isConfirmed = confirmText === courseTitle;

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCourse(courseId);

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Card className="border-destructive/50">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-destructive/10">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-destructive">Delete Course</CardTitle>
            <CardDescription>This action cannot be undone</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Warning Message */}
        <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 space-y-2">
          <p className="font-medium text-foreground">
            You are about to delete:
          </p>
          <p className="text-lg font-semibold text-destructive">
            &quot;{courseTitle}&quot;
          </p>
          {sessionCount > 0 && (
            <p className="text-sm text-muted-foreground">
              This will also delete{" "}
              <span className="font-medium text-foreground">
                {sessionCount} session(s)
              </span>{" "}
              and all associated lessons.
            </p>
          )}
        </div>

        {/* Confirmation Input */}
        <div className="space-y-3">
          <Label htmlFor="confirm">
            Type <span className="font-mono font-semibold">{courseTitle}</span>{" "}
            to confirm:
          </Label>
          <Input
            id="confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Enter course title to confirm"
            className="font-mono"
            autoComplete="off"
          />
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 pt-6">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isPending}
          className="flex-1"
        >
          <ArrowLeft className="size-4 mr-2" />
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={!isConfirmed || isPending}
          className="flex-1"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="size-4 mr-2" />
              Delete Course
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
