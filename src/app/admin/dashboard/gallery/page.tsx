'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Camera, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Label, Dialog, Badge, Select, Textarea } from '@/components/ui/core';

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: 'eggs' | 'larvae' | 'pupae' | 'moths' | 'facility' | 'packaging' | 'application';
  created_at?: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('/images/galleria_larva_red.jpg');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<'eggs' | 'larvae' | 'pupae' | 'moths' | 'facility' | 'packaging' | 'application'>('larvae');
  
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Presets of biological images to easily add to gallery
  const imagePresets = [
    { label: 'Larvae (Petri Dish / Red)', value: '/images/galleria_larva_red.jpg' },
    { label: 'Larvae (Well Plate / Research)', value: '/images/galleria_larva_well.jpg' },
    { label: 'Adult Moths (Jar)', value: '/images/galleria_adult.jpg' },
    { label: 'Pupae (Brown Cocoon Staging)', value: '/images/galleria_pupa.jpg' },
    { label: 'Rearing Racks System', value: '/images/rearing_facility.png' },
    { label: 'Biotech Lab Background', value: '/images/hero_lab_bg.png' },
    { label: 'Egg Clutches Illustration', value: '/images/galleria_egg.png' },
  ];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openAddModal = () => {
    setImageUrl('/images/galleria_larva_red.jpg');
    setCaption('');
    setCategory('larvae');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setErrorMsg('');

    if (!imageUrl || !caption || !category) {
      setErrorMsg('Please fill in all fields.');
      setFormSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          category,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to add gallery item');
      }

      await fetchGallery();
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while saving gallery item.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) {
      return;
    }

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete item');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete gallery item.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Gallery Management</h1>
          <p className="text-xs text-slate-500 mt-1">Upload and catalog photography of larvae, packaging and lab studies.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="flex items-center space-x-2 text-xs py-2 px-4 shadow-sm"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Upload New Photo</span>
        </Button>
      </div>

      {/* Rearing grid list */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-3" />
          <p className="text-xs text-slate-500">Loading gallery images...</p>
        </div>
      ) : items.length === 0 ? (
        <Card className="p-16 text-center border-slate-200 border-dashed">
          <Camera className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-600">No gallery items</h3>
          <p className="text-xs text-slate-500 mt-1">Upload photos to display on the public gallery page.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden flex flex-col justify-between h-80 hover:shadow-md transition-shadow">
              {/* Photo */}
              <div 
                className="h-48 bg-slate-100 bg-cover bg-center border-b border-slate-50 relative"
                style={{ backgroundImage: `url('${item.image_url}')` }}
              >
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="info" className="uppercase text-[9px] font-bold">
                    {item.category}
                  </Badge>
                </div>
                
                {/* Delete overlay button on hover */}
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex items-center space-x-1.5 shadow"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Photo</span>
                  </Button>
                </div>
              </div>

              {/* Caption details */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <p className="text-[11px] text-slate-650 leading-relaxed font-semibold line-clamp-3">
                  {item.caption}
                </p>
                <div className="text-[9px] text-slate-400 mt-2 text-right">
                  System ID: {item.id.substr(0, 8)}...
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Gallery Item Modal */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => !formSubmitting && setIsModalOpen(false)}
        title="Upload New Photo"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center space-x-2">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gal-cat">Image Category</Label>
              <Select
                id="gal-cat"
                options={[
                  { value: 'eggs', label: 'Eggs Stage' },
                  { value: 'larvae', label: 'Larvae Stage' },
                  { value: 'pupae', label: 'Pupae Stage' },
                  { value: 'moths', label: 'Adult Moths' },
                  { value: 'facility', label: 'Rearing Facility' },
                  { value: 'packaging', label: 'Packaging & Logistics' },
                  { value: 'application', label: 'Research Application' },
                ]}
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                disabled={formSubmitting}
              />
            </div>
            <div>
              <Label>Image Template Presets</Label>
              <Select
                options={[
                  { value: '', label: '-- Select a template image --' },
                  ...imagePresets
                ]}
                onChange={(e) => {
                  if (e.target.value) setImageUrl(e.target.value);
                }}
                disabled={formSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gal-img">Image URL Path</Label>
            <Input
              id="gal-img"
              type="text"
              required
              placeholder="/images/galleria_larva_red.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={formSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="gal-cap">Photo Caption</Label>
            <Textarea
              id="gal-cap"
              required
              placeholder="Describe what is shown in this photo (e.g. Standardized 6th-instar larvae matched for 280-300 mg weight class...)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={formSubmitting}
              className="min-h-[90px]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={formSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formSubmitting}
              className="flex items-center space-x-1"
            >
              <span>Add to Gallery</span>
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
