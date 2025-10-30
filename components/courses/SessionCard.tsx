"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Bookmark } from "lucide-react";
import Link from "next/link";

export type SessionStatus = "ongoing" | "upcoming" | "ended";

export type Session = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  thumbnail: string;
  status: SessionStatus;
  startsIn?: string; // e.g., "2 hours", "3 Days"
  isBookmarked?: boolean;
};

type SessionCardProps = {
  session: Session;
};

export default function SessionCard({ session }: SessionCardProps) {
  const getStatusText = () => {
    switch (session.status) {
      case "ongoing":
        return { text: "Session Ongoing", color: "text-trustsec-3" };
      case "upcoming":
        return {
          text: `Starts in : ${session.startsIn}`,
          color: "text-white/80",
        };
      case "ended":
        return { text: "Session Ended", color: "text-red-500" };
    }
  };

  const getButtonConfig = () => {
    switch (session.status) {
      case "ongoing":
        return {
          text: "Join Session",
          variant: "default" as const,
          disabled: false,
        };
      case "upcoming":
        return {
          text: "Sign Up",
          variant: "default" as const,
          disabled: false,
        };
      case "ended":
        return {
          text: "Join Session",
          variant: "outline" as const,
          disabled: true,
        };
    }
  };

  const statusConfig = getStatusText();
  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-trustsec-widget rounded-2xl overflow-hidden h-[700px] flex flex-col shadow-lg">
      {/* Session Thumbnail */}
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={session.thumbnail}
          alt={session.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Bookmark Icon */}
        <div className="absolute top-6 left-6">
          <div className="backdrop-blur-md bg-trustsec-1/90 p-3 rounded-full">
            <Bookmark
              className={`size-7 ${
                session.isBookmarked ? "fill-white text-white" : "text-white"
              }`}
            />
          </div>
        </div>

        {/* Level Badge */}
        <div className="absolute top-6 right-6">
          <div className="backdrop-blur-md bg-trustsec-1/90 px-4 py-1 rounded-xl">
            <span className="text-white font-medium text-base">
              {session.level}
            </span>
          </div>
        </div>
      </div>

      {/* Session Content */}
      <div className="flex-1 flex flex-col p-8 gap-3">
        {/* Title */}
        <h3 className="font-semibold text-[27px] leading-[38px] text-white">
          {session.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-lg leading-[27px]">
          {session.description}
        </p>

        {/* Status */}
        <div className="flex items-center gap-2 mt-auto">
          {session.status === "upcoming" && (
            <Calendar className="size-5 text-white/80" />
          )}
          <span className={`text-lg ${statusConfig.color}`}>
            {statusConfig.text}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-8 pb-8">
        <Link
          href={session.status === "ended" ? "#" : `/sessions/${session.id}`}
          className="block"
          onClick={(e) => session.status === "ended" && e.preventDefault()}
        >
          <Button
            className="w-full h-14 text-lg font-medium rounded-xl"
            variant={buttonConfig.variant}
            disabled={buttonConfig.disabled}
          >
            {buttonConfig.text}
          </Button>
        </Link>
      </div>
    </div>
  );
}
