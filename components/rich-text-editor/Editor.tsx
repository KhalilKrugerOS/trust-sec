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
    content: field.value
      ? JSON.parse(field.value)
      : `<p>Test Course Trust-Sec 🔥</p>`,
  });

  return (
    <div className="w-full border border-input border-t-0 border-x-0 rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
