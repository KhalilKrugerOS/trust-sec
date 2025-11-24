"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor({
  field,
}: {
  field: { onChange: (value: string) => void; value?: string };
}) {
  // Helper function to parse content safely
  const parseContent = (value?: string) => {
    if (!value) {
      return `<p>Start writing...</p>`;
    }

    // Try to parse as JSON first (for Tiptap JSON format)
    try {
      return JSON.parse(value);
    } catch {
      // If it's not JSON, treat it as plain text or HTML
      return value;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] focus:outline-none p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none",
      },
    },
    onUpdate: ({ editor }: { editor: Editor }) => {
      const json = editor.getJSON();
      field.onChange(JSON.stringify(json));
    },
    content: parseContent(field.value),
  });

  return (
    <div className="w-full border border-input border-t-0 border-x-0 rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
