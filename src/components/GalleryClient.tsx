"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ImagePreviewDialog } from "./ImagePreviewDialog";
type DesignImage = {
  id: string
  filename: string
  url: string
}

interface GalleryClientProps {
  designs: DesignImage[];
}

export function GalleryClient({ designs }: GalleryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter instantly as the user types (case-insensitive)
  const filteredDesigns = designs.filter((design) =>
    design.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Input Area */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by filename..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredDesigns.length} {filteredDesigns.length === 1 ? 'result' : 'results'}
      </p>

      {/* Gallery Grid */}
      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <ImagePreviewDialog key={design.id} image={design}>
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-neutral-100 dark:bg-neutral-900 shadow-sm group">
                <Image
                  src={design.url}
                  alt={design.filename}
                  fill
                  className="object-cover"
                  unoptimized // Bypasses cache so expired signed URLs aren't served
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 backdrop-blur-sm transform transition-transform group-hover:bg-black/80">
                  <p className="text-xs text-white truncate">
                    {design.filename}
                  </p>
                </div>
              </div>
            </ImagePreviewDialog>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
          No images found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}