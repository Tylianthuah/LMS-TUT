import { cn } from "@/lib/utils";
import { CloudUploadIcon, Files, FileX, Loader, Loader2, X, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress"
import Image from "next/image";


export const RenderEmptyDropZone = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop your file here or <span className="text-primary font-bold cursor-pointer">click to upload</span>
      </p>

      <Button type="button" className="mt-4">
        Select File <Files />
      </Button>
    </div>
  );
};


export const RenderErrorDropZone = () => {
  return (
    <div className="text-center">
      <div className="border size-16 mx-auto flex justify-center items-center rounded-full text-destructive border-destructive bg-destructive/30 ">
        <FileX className="size-6" />
      </div>
      <p className="mt-4 font-bold text-lg">Uploading Failed.</p>
      <p className="text-sm text-muted-foreground mt-2">
        Please drag 'n' drop or click to{" "}
        <span className="font-bold text-sm text-primary">try again</span>.
      </p>
    </div>
  );
};


export const RenderUploadedFile = ({previewUrl , handleFileRemove , isDeleting} : {previewUrl : string , handleFileRemove : () => void , isDeleting : boolean}) => {
  return (
    <div >
      <Image src={previewUrl} alt="Uploaded File" fill className="object-contain p-2"/>
      <Button type="button" variant={"destructive"} size="icon" className={cn(
        "absolute top-6 right-6"
      )} onClick={handleFileRemove} disabled={isDeleting}>
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
};


export const RenderUploadingFile = ({progress} : {progress : number}) => {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      <p className="text-sm text-muted-foreground">uploading...</p>
      <Progress value={progress} className="w-[50%]" />
    </div>
  );
};
