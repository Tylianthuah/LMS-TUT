import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import {
  RenderEmptyDropZone,
  RenderErrorDropZone,
  RenderUploadedFile,
  RenderUploadingFile,
} from "./RenderDropbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { on } from "events";

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

interface iApp {
  onChange?: (value: string) => void;
  value?: string;
}

const FileUploader = ({ onChange, value }: iApp) => {
  const [fileState, setFileState] = useState<UploadState>({
    error: false,
    file: null,
    fileType: "image",
    id: null,
    isDeleting: false,
    progress: 0,
    uploading: false,
    key: value,
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
              key: key,
            }));

            onChange?.(key);
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
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error("Something went wrong.");
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }));
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
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
    },
    [fileState.objectUrl]
  );

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

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, //5mb,
    multiple: false,
    onDropRejected: RejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  async function HandleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;
    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });
      if (!response.ok) {
        toast.error("Failed to delete file, please try again.");
        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));
        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");
      setFileState({
        file: null,
        objectUrl: undefined,
        id: null,
        uploading: false,
        fileType: "image",
        progress: 0,
        isDeleting: false,
        error: false,
      });

      toast.success("File deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete file, please try again.");
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  function RenderState() {
    if (fileState.uploading) {
      return <RenderUploadingFile progress={fileState.progress} />;
    }

    if (fileState.error) {
      return <RenderErrorDropZone />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedFile
          previewUrl={fileState.objectUrl}
          handleFileRemove={HandleRemoveFile}
          isDeleting={fileState.isDeleting}
        />
      );
    }

    return <RenderEmptyDropZone isDragActive={isDragActive} />;
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
