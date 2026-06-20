import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import { db } from '@/lib/db';
import { Camera } from 'lucide-react';

export const revalidate = 0; // Fetch fresh gallery content always

export default async function GalleryPage() {
  const galleryItems = await db.getGallery();

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
          <Camera className="h-4 w-4" />
          <span>Visual Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
          Nisha Ventures Photo Gallery
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Explore photographs of our standardized larvae development cycles, climate-controlled rearing chambers, specialized logistics packing, and experimental applications.
        </p>
      </div>

      {/* Main Grid Section */}
      <GalleryGrid initialItems={galleryItems as any} />
    </div>
  );
}
