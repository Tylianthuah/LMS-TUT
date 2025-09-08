import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="border border-input rounted-t-lg bg-card p-2 flex flex-wrap gap-1 items-center border-t-0 border-x-0">
      <TooltipProvider>
        <div className="flex items-center gap-1 flex-wrap ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive("bold") && "bg-muted text-muted-foreground"
                )}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={() => {
                  editor.chain().focus().toggleItalic().run();
                }}
                className={cn(
                  editor.isActive("italic") && "bg-muted text-muted-foreground"
                )}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("underline")}
                onPressedChange={() => {
                  editor.chain().focus().toggleUnderline().run();
                }}
                className={cn(
                  editor.isActive("underline") &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Underline />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={() => {
                  editor.chain().focus().toggleStrike().run();
                }}
                className={cn(
                  editor.isActive("strike") && "bg-muted text-muted-foreground"
                )}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-4"></div>
        <div className="flex items-center gap-2 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={cn(
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading1 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={cn(
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
                className={cn(
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading3 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 4 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 4 }).run();
                }}
                className={cn(
                  editor.isActive("heading", { level: 4 }) &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Heading4 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 4</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
