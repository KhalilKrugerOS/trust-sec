"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { updateLesson } from "../actions";
import { toast } from "sonner";
import { Upload, Video, Image as ImageIcon } from "lucide-react";
import { Uploader } from "@/components/file-uploader/Uploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { useRouter } from "next/navigation";

const LessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  duration: z.number().min(1, "Duration must be at least 1 minute").nullable(),
  thumbnailKey: z.string().nullable(),
  videoKey: z.string().nullable(),
  content: z.string().nullable(),
});

type LessonFormValues = z.infer<typeof LessonSchema>;

interface EditLessonFormProps {
  lesson: AdminLessonType;
  courseId: string;
}

export default function EditLessonForm({
  lesson,
  courseId,
}: EditLessonFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: lesson.title,
      duration: lesson.duration,
      thumbnailKey: lesson.thumbnailKey,
      videoKey: lesson.videoKey,
      content: lesson.content,
    },
  });

  function onSubmit(values: LessonFormValues) {
    startTransition(async () => {
      const result = await updateLesson(lesson.id, values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Lesson updated successfully");
        router.push(`/admin/courses/${courseId}/edit?tab=course-structure`);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Title</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to Security..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                />
              </FormControl>
              <FormDescription>
                Estimated time to complete this lesson
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail Upload */}
        <FormField
          control={form.control}
          name="thumbnailKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <ImageIcon className="size-4" />
                Lesson Thumbnail
              </FormLabel>
              <FormControl>
                <Uploader value={field.value ?? ""} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Upload a thumbnail image for the lesson (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video Upload */}
        <FormField
          control={form.control}
          name="videoKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Video className="size-4" />
                Lesson Video
              </FormLabel>
              <FormControl>
                <Uploader value={field.value ?? ""} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Upload the video file for this lesson (max 500MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Editor */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  field={{
                    ...field,
                    value: field.value ?? undefined,
                  }}
                />
              </FormControl>
              <FormDescription>
                Add supplementary text, code snippets, or resources
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-trustsec-1 hover:bg-trustsec-widget text-white"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(
                `/admin/courses/${courseId}/edit?tab=course-structure`
              )
            }
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
