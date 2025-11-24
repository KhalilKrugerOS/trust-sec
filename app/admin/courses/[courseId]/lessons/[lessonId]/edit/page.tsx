import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditLessonForm from "./_components/EditLessonForm";

type Params = Promise<{ courseId: string; lessonId: string }>;

export default async function EditLessonPage({ params }: { params: Params }) {
  const { courseId, lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/courses/${courseId}/edit`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Lesson</h1>
          <p className="text-muted-foreground mt-1">
            Update lesson content, video, and details
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>
            Upload video, edit content, and update lesson information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditLessonForm lesson={lesson} courseId={courseId} />
        </CardContent>
      </Card>
    </div>
  );
}
