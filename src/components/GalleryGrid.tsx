'use client';

import React, { useState } from 'react';
import { Badge } from './ui/core';
import { Camera, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: 'larvae' | 'facility' | 'packaging' | 'application';
}

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

export default function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Images' },
    { value: 'larvae', label: 'Larvae' },
    { value: 'facility', label: 'Rearing Facility' },
    { value: 'packaging', label: 'Packaging & Shipping' },
    { value: 'application', label: 'Lab Applications' },
  ];

  const filteredItems = initialItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
              selectedCategory === cat.value
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-250 max-w-md mx-auto">
          <Camera className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No images in this category</h3>
          <p className="text-sm text-slate-500 mt-1">
            Check back later as the admin uploads new photos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow relative"
            >
              {/* Photo Area */}
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image_url}')` }}
                />
                
                {/* Zoom overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-white/95 text-slate-800 p-2 rounded-full shadow-md scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="h-4.5 w-4.5 text-slate-700" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="info" className="uppercase tracking-wider text-[10px]">
                    {item.category}
                  </Badge>
                </div>
              </div>

              {/* Caption Area */}
              <div className="p-4 bg-white border-t border-slate-50">
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
