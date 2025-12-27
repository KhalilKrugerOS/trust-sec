"use client";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { useMemo } from "react";

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export function RichTextRenderer({
  content,
  className = "",
}: RichTextRendererProps) {
  const html = useMemo(() => {
    if (!content) return "";

    try {
      // Parse the JSON content
      const json = JSON.parse(content);

      // Generate HTML from TipTap JSON
      return generateHTML(json, [
        StarterKit,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ]);
    } catch {
      // If it's not valid JSON, return as-is (might be plain text or HTML)
      return content;
    }
  }, [content]);

  if (!html) return null;

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
