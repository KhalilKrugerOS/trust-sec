"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  rectIntersection,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GripVertical,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileText,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { saveCourseStructure } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types
interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading";
  duration?: number;
  order: number;
}

interface Session {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface CourseStructureProps {
  courseId: string;
}

// Sortable Session Component
function SortableSession({
  session,
  courseId,
  onUpdate,
  onDelete,
  onToggle,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
}: {
  session: Session;
  courseId: string;
  onUpdate: (id: string, updates: Partial<Session>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAddLesson: (sessionId: string) => void;
  onUpdateLesson: (
    sessionId: string,
    lessonId: string,
    updates: Partial<Lesson>
  ) => void;
  onDeleteLesson: (sessionId: string, lessonId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: session.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border border-trustsec-3/20 rounded-lg bg-background shadow-sm",
        isDragging && "opacity-50 shadow-lg shadow-trustsec-2/20"
      )}
    >
      {/* Session Header */}
      <div className="flex items-start gap-3 p-4">
        <button
          className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-5" />
        </button>

        <button
          onClick={() => onToggle(session.id)}
          className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {session.isExpanded ? (
            <ChevronDown className="size-5" />
          ) : (
            <ChevronRight className="size-5" />
          )}
        </button>

        <div className="flex-1">
          <Input
            value={session.title}
            onChange={(e) => onUpdate(session.id, { title: e.target.value })}
            placeholder="Session title..."
            className="font-semibold text-base"
          />
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Session</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this session? This will also
                delete all {session.lessons.length} lesson(s) within it. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(session.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Lessons */}
      {session.isExpanded && (
        <div className="border-t border-trustsec-3/20 p-4 pt-3 space-y-2 bg-muted/30">
          <SortableContext
            items={session.lessons.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {session.lessons.map((lesson) => (
              <SortableLesson
                key={lesson.id}
                lesson={lesson}
                sessionId={session.id}
                courseId={courseId}
                onUpdate={onUpdateLesson}
                onDelete={onDeleteLesson}
              />
            ))}
          </SortableContext>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddLesson(session.id)}
            className="w-full mt-2 border-dashed border-trustsec-3/30 hover:border-trustsec-2 hover:bg-trustsec-1/5"
          >
            <Plus className="size-4 mr-2" />
            Add Lesson
          </Button>
        </div>
      )}
    </div>
  );
}

// Sortable Lesson Component
function SortableLesson({
  lesson,
  sessionId,
  courseId,
  onUpdate,
  onDelete,
}: {
  lesson: Lesson;
  sessionId: string;
  courseId: string;
  onUpdate: (
    sessionId: string,
    lessonId: string,
    updates: Partial<Lesson>
  ) => void;
  onDelete: (sessionId: string, lessonId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-3 rounded-md bg-background border border-border",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>

      {lesson.type === "video" ? (
        <PlayCircle className="size-4 text-trustsec-2" />
      ) : (
        <FileText className="size-4 text-trustsec-3" />
      )}

      <Input
        value={lesson.title}
        onChange={(e) =>
          onUpdate(sessionId, lesson.id, { title: e.target.value })
        }
        placeholder="Lesson title..."
        className="flex-1 h-8"
      />

      <select
        value={lesson.type}
        onChange={(e) =>
          onUpdate(sessionId, lesson.id, {
            type: e.target.value as "video" | "reading",
          })
        }
        className="h-8 px-2 rounded-md border border-input bg-background text-sm"
      >
        <option value="video">Video</option>
        <option value="reading">Reading</option>
      </select>

      <Input
        type="number"
        value={lesson.duration || ""}
        onChange={(e) =>
          onUpdate(sessionId, lesson.id, {
            duration: parseInt(e.target.value) || 0,
          })
        }
        placeholder="Duration (min)"
        className="w-24 h-8"
      />

      <Button
        variant="ghost"
        size="icon"
        asChild
        className="h-8 w-8 text-trustsec-2 hover:text-trustsec-2 hover:bg-trustsec-1/10"
      >
        <Link href={`/admin/courses/${courseId}/lessons/${lesson.id}/edit`}>
          <Pencil className="size-3" />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;
              {lesson.title || "this lesson"}&quot;? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(sessionId, lesson.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface iAppProps {
  coursedata: AdminCourseSingularType;
}

// Main Component
export default function CourseStructure({ coursedata }: iAppProps) {
  const router = useRouter();
  const initialSessions: Session[] = coursedata.courseSessions.map((s) => ({
    id: s.id,
    title: s.title,
    order: s.order,
    isExpanded: false,
    lessons: s.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      type: l.type.toLowerCase() as "video" | "reading",
      order: l.order,
      duration: l.duration ?? undefined,
    })),
  }));
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSessions((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(items, oldIndex, newIndex);
      return reordered.map((item, index) => ({ ...item, order: index }));
    });
  };
  const addSession = () => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      title: "",
      order: sessions.length,
      lessons: [],
      isExpanded: true,
    };
    setSessions([...sessions, newSession]);
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const toggleSession = (id: string) => {
    setSessions(
      sessions.map((s) =>
        s.id === id ? { ...s, isExpanded: !s.isExpanded } : s
      )
    );
  };

  const addLesson = (sessionId: string) => {
    setSessions(
      sessions.map((s) => {
        if (s.id === sessionId) {
          const newLesson: Lesson = {
            id: `lesson-${Date.now()}`,
            title: "",
            type: "video",
            order: s.lessons.length,
          };
          return { ...s, lessons: [...s.lessons, newLesson] };
        }
        return s;
      })
    );
  };

  const updateLesson = (
    sessionId: string,
    lessonId: string,
    updates: Partial<Lesson>
  ) => {
    setSessions(
      sessions.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            lessons: s.lessons.map((l) =>
              l.id === lessonId ? { ...l, ...updates } : l
            ),
          };
        }
        return s;
      })
    );
  };

  const deleteLesson = (sessionId: string, lessonId: string) => {
    setSessions(
      sessions.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            lessons: s.lessons.filter((l) => l.id !== lessonId),
          };
        }
        return s;
      })
    );
  };

  const saveStructure = async () => {
    try {
      toast.loading("Saving course structure...");

      const result = await saveCourseStructure(coursedata.id, sessions);

      if (result.status === "success") {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to save course structure");
      console.error("Save error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Drag to reorder sessions and lessons
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addSession}
            className="border-trustsec-3/30 hover:border-trustsec-2 hover:bg-trustsec-1/5"
          >
            <Plus className="size-4 mr-2" />
            Add Session
          </Button>
          <Button
            onClick={saveStructure}
            className="bg-trustsec-1 hover:bg-trustsec-widget text-white"
          >
            Save Structure
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sessions.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {sessions.map((session) => (
              <SortableSession
                key={session.id}
                session={session}
                courseId={coursedata.id}
                onUpdate={updateSession}
                onDelete={deleteSession}
                onToggle={toggleSession}
                onAddLesson={addLesson}
                onUpdateLesson={updateLesson}
                onDeleteLesson={deleteLesson}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sessions.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-trustsec-3/20 rounded-lg">
          <p className="text-muted-foreground mb-4">
            No sessions yet. Add your first session to get started.
          </p>
          <Button
            onClick={addSession}
            className="bg-trustsec-1 hover:bg-trustsec-widget text-white"
          >
            <Plus className="size-4 mr-2" />
            Add First Session
          </Button>
        </div>
      )}
    </div>
  );
}
