"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { toast } from "sonner";

export function AvatarEdit(props: React.HTMLProps<HTMLDivElement>) {
  const { className, ...rest } = props;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const onDropRejected = useCallback(
    () => toast.error("Only JPG and PNG files are supported"),
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <button {...getRootProps({ className: "relative" })}>
        <Avatar {...rest} className={cn("h-52 w-52", className)}>
          <AvatarImage src="/avatar.jpg" />
          <AvatarFallback />
        </Avatar>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="pointer-events-none absolute bottom-3 left-3"
        >
          <span>
            <PencilIcon className="h-4 w-4" />
            Edit
          </span>
        </Button>
        <input {...getInputProps()} />
      </button>
    </div>
  );
}
