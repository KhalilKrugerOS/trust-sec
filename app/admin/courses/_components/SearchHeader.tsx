"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchHeader() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative w-[464px]">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/80" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
