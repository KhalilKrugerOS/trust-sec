import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PublicNavbar } from "@/components/courses/PublicNavbar";

export function LearnPageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-trustsec-1">
      {/* Navbar */}
      <PublicNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
        {/* Back Link Skeleton */}
        <Skeleton className="h-6 w-36 mb-6" />

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[412px] shrink-0 space-y-6">
            {/* Course Info Card Skeleton */}
            <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-2.5 w-full" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </CardContent>
            </Card>

            {/* Lesson List Skeleton */}
            <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-6 py-5 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                    >
                      <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Video Player Skeleton */}
            <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700 overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full aspect-video rounded-t-xl" />
              </CardContent>
            </Card>

            {/* Lesson Details Skeleton */}
            <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-7 w-2/3" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
                <Skeleton className="h-10 w-40" />
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
