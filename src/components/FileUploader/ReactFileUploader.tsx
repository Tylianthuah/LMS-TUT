import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { RenderEmptyDropZone, RenderErrorDropZone } from "./RenderDropbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploadState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  fileType: "image" | "video";
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
}

const FileUploader = () => {
  const [fileState, setFileState] = useState<UploadState>({
    error: false,
    file: null,
    fileType: "image",
    id: null,
    isDeleting: false,
    progress: 0,
    uploading: false,
  });

  const uploadFile = async (file: File) => {
    if (!file) return;

    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          size: file.size,
          isImage: true,
          contentType: file.type,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned Url");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      console.log("PresginedUrl:::",presignedUrl,"KEY:::", key)

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };
        xhr.onload = () => {
          if (xhr.status == 200 || xhr.status == 204) {
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 100,
              key : key,
            }));

            toast.success("File uploaded sucessfully!");
            resolve();
          } else {
            reject(new Error("Uploading failed!."));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Uploading failed!."));
        };
        xhr.open("PUT", presignedUrl);
        // xhr.setRequestHeader("Content-Type", file.type)        
        xhr.send(file);
      });
    } catch (error) {
      toast.error("Something went wrong.");
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error : true,
        uploading : false
      }));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];
    setFileState({
      file: file,
      error: false,
      fileType: "image",
      id: uuidv4(),
      isDeleting: false,
      progress: 0,
      uploading: false,
      objectUrl: URL.createObjectURL(file),
    });

    uploadFile(file);
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

  function RenderState () {
    if(fileState.uploading){
      return <h1>Uploading</h1>
    }

    if(fileState.error){
      return <RenderErrorDropZone />
    }

    if(fileState.objectUrl){
      return <h1>File Uploaded!</h1>
    }

    return <RenderEmptyDropZone isDragActive={isDragActive} />
  }

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
        {RenderState()}   
      </CardContent>
    </Card>
  );
};

export default FileUploader;
