import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function DeleteCourseLoading() {
  return (
    <div className="container max-w-2xl py-10">
      <Card className="border-muted">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Warning Box Skeleton */}
          <div className="p-4 rounded-lg border space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>

          {/* Confirmation Input Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </CardFooter>
      </Card>
    </div>
  );
}
