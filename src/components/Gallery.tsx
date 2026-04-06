"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/supabase";

export default function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="overflow-hidden rounded-xl shadow-md">
          <div className="grid grid-cols-2">
            <div className="relative aspect-square">
              <Image
                src={item.before_url}
                alt={`Antes — ${item.caption}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                Antes
              </span>
            </div>
            <div className="relative aspect-square">
              <Image
                src={item.after_url}
                alt={`Después — ${item.caption}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                Después
              </span>
            </div>
          </div>
          {item.caption && (
            <p className="bg-white px-4 py-2 text-center text-sm text-gray-600">
              {item.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
