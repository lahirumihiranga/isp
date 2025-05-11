"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FileUploaderMinimal } from "@uploadcare/react-uploader/next";

interface FileUploaderProps {
  value: string;
  onChange: (url: string) => void;
}



export function FileUploader({ value, onChange }: FileUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageUpload = (uploadInfo: any) => {
    if (
      uploadInfo?.status === "success" &&
      uploadInfo?.successEntries?.[0]?.cdnUrl
    ) {
      const url = uploadInfo.successEntries[0].cdnUrl;
      const name = uploadInfo.successEntries[0].name || "Uploaded file";
      onChange(url);
      setFileName(name);
      toast.success("File uploaded successfully");
    }
  };

  return (
    <div>
      <FileUploaderMinimal
        sourceList="local, camera, url, facebook, gdrive"
        className="uc-light"
        pubkey={`${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}`}
        multiple={false}
        onChange={handleImageUpload}
      />
    </div>
  );
}
