"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Menubar from "./Menubar";

const RichTextEditor = ({field} : {field : any}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types : ["heading", "paragraph"]
      })
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "min-h-[300px] outline-none p-4 bg-input/30 prose prose-sm lg:prose-md dark:prose-invert !max-w-none !overflow-hidden",
      },
    },
    onUpdate : ({editor}) => {
        field.onChange(JSON.stringify(editor.getJSON()));
    },
    content : field.value ? JSON.parse(field.value) : "<p>Hello World 🚀</p>"
  });

  return (
    <div className="border-input border-2">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
