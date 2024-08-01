"use client";
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { EditorContent, JSONContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-5 mt-5">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        Italic
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
      >
        Strike
      </Button>
    </div>
  );
};

export function TipTapEditor({ setJson, json }: { setJson: (json: JSONContent) => void, json: JSONContent | null }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? { type: "doc", content: [] },
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
    onUpdate: ({ editor }) => {
      if (editor) {
        const jsonContent = editor.getJSON();
        setJson(jsonContent);
      }
    }
  });

  useEffect(() => {
    if (editor && json && editor.getJSON()?.content?.length === 0) {
      editor.commands.setContent(json);
    }
  }, [editor, json]);

  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] mt-2" />
    </div>
  );
}
