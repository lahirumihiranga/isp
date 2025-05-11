"use client";
import { useState } from "react";
import { Check, Copy, Download, ShieldAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type { SecureLink } from "@/lib/types/global";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

interface SecureContentProps {
  secureLink: SecureLink;
}

export function SecureContent({ secureLink }: SecureContentProps) {
  const isExpired =
    secureLink.expiresAt && new Date(secureLink.expiresAt) < new Date();
  const viewsExhausted = secureLink.currentViews >= secureLink.maxViews;
  const isAccessible = !isExpired && !viewsExhausted;

  const expiryText = secureLink.expiresAt
    ? `Expires ${formatDistanceToNow(new Date(secureLink.expiresAt), {
        addSuffix: true,
      })}`
    : "No expiry set";

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(secureLink.content || "");
      setCopied(true);

      toast("Text copied to clipboard");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast("Failed to copy text");
    }
  };

  const handleDownload = async () => {
    try {
      if (!secureLink.fileUrl) {
        throw new Error("File URL is not available");
      }
      const response = await fetch(secureLink.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      // Extract filename or fallback
      const urlParts = secureLink.fileUrl.split("/");
      const filename = urlParts[urlParts.length - 1] || "downloaded_file";

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("File download failed:", error);
    }
  };

  if (!isAccessible) {
    return (
      <Card className="w-full mx-5">
        <CardHeader className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <CardTitle className="text-xl">Content Unavailable</CardTitle>
          <CardDescription>
            {isExpired
              ? "This secure link has expired."
              : "The maximum number of views for this content has been reached."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-5">
      <CardHeader>
        <CardTitle>{secureLink.title || "Secure Content"}</CardTitle>
        <CardDescription>
          {expiryText} • {secureLink.currentViews + 1} of {secureLink.maxViews}{" "}
          views
        </CardDescription>
      </CardHeader>
      <CardContent>
        {secureLink.type === "TEXT" ? (
          <div className="whitespace-pre-wrap rounded-md bg-muted p-4 relative">
            <div className="max-w-[45rem]">{secureLink.content}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="flex-shrink-0 absolute top-2 right-2 cursor-pointer"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {secureLink.fileUrl &&
              (secureLink.fileUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <Image
                  src={secureLink.fileUrl || "/placeholder.svg"}
                  alt={secureLink.title || "Secure file"}
                  className="max-h-[500px] rounded-md object-contain"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Image
                    src={secureLink.fileUrl || "/placeholder.svg"}
                    alt={secureLink.title || "Secure file"}
                    className="max-h-[500px] rounded-md object-contain"
                    width={500}
                    height={500}
                  />
                  <Button
                    variant="secondary"
                    className="cursor-pointer mt-2"
                    onClick={handleDownload}
                  >
                    <Download
                      className="-ms-1 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    Download File
                  </Button>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
