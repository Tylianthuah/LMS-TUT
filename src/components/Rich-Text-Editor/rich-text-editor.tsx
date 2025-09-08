"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
        heading : {
            levels : [1,2,3,4]
        }
    })],
    immediatelyRender : false,
    shouldRerenderOnTransaction : true
  });

  return <div className="border-input border-2">
    <Menubar editor= {editor} />
    <EditorContent editor={editor} />
  </div>;
};

export default RichTextEditor;
