"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: true,
  });

  return (
    <div>
      <MenuBar editor={editor} />
    </div>
  );
}
