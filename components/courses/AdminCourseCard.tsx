"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { getS3PublicUrl } from "@/lib/s3-utils";
import { AdminCourseType } from "@/app/data/admin/admin-get-courses";

interface iAppProps {
  data: AdminCourseType;
}

export default function AdminCourseCard({ data }: iAppProps) {
  // Build the S3 public URL from fileKey
  const imageUrl = getS3PublicUrl(data.fileKey);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "DRAFT":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "ARCHIVED":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-blue-500/10 text-blue-500";
      case "INTERMEDIATE":
        return "bg-orange-500/10 text-orange-500";
      case "ADVANCED":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
        </div>

        {/* Actions Dropdown */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="size-8">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.id}`}>
                  <Eye className="size-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.id}/edit`}>
                  <Edit className="size-4 mr-2" />
                  Edit Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" asChild>
                <Link href={`/admin/courses/${data.id}/delete`}>
                  <Trash2 className="size-4 mr-2" />
                  Delete Course
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 space-y-4">
        {/* Title & Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor(data.level)}>{data.level}</Badge>
            <span className="text-sm text-muted-foreground">${data.price}</span>
          </div>
          <h3 className="font-semibold text-lg line-clamp-2">{data.title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {data.smallDescription}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/admin/courses/${data.id}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              <Eye className="size-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/admin/courses/${data.id}/edit`} className="flex-1">
            <Button className="w-full" size="sm">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
