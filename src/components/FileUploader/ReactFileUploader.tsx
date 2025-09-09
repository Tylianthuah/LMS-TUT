import React, { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { RenderEmptyDropZone, RenderErrorDropZone } from "./RenderDropbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const RejectedFiles = (fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );
      if (tooManyFiles) {
        toast.error("Too many files selected, limit to 1 file.");
      }
      const fileSizeTooBig = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );
      if (fileSizeTooBig) {
        toast.error("File size exceed the limit, should be 5mb or lesser.");
      }

      const fileInvalid = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-invalid-type"
      );
      if (fileInvalid) {
        toast.error("Please upload a supported file format.");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, //5mb,
    multiple: false,
    onDropRejected: RejectedFiles,
  });
  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative w-full h-[300px] border-dashed transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-solid border-primary bg-primary/10"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full ">
        <input {...getInputProps()} />
        {/* <RenderErrorDropZone /> */}
        <RenderEmptyDropZone isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
};

export default FileUploader;
