"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  image: {
    url: string;      // The signed URL
    filename: string; // The file name
  };
  children: React.ReactNode; // The trigger (e.g., your image card)
}

export function ImagePreviewDialog({ image, children }: ImagePreviewDialogProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetches the image as a blob to force a browser download
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(image.url);
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = image.filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
      // Optional: Add a toast notification here for the error
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer transition-transform hover:scale-[1.02]">
          {children}
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[800px] w-[90vw] bg-black/95 border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle className="truncate pr-8 text-neutral-200">
            {image.filename}
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full h-[60vh] flex items-center justify-center bg-black/50 rounded-md overflow-hidden">
          {/* Note: unoptimized is used because Next.js Image Optimization 
              caches URLs, which will break when the signed URL expires. */}
          <Image
            src={image.url}
            alt={image.filename}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="gap-2"
          >
            <Download size={16} />
            {isDownloading ? "Downloading..." : "Download Original"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}