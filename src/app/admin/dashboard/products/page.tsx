'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, ShoppingBag, Package, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Textarea, Label, Dialog, Badge, Select } from '@/components/ui/core';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  research_use_case: string;
  available: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Larvae');
  const [researchUseCase, setResearchUseCase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [available, setAvailable] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Default image choices for easy pick
  const imagePresets = [
    { label: 'White Larvae (Research Grade)', value: '/images/galleria_white_larva.jpg' },
    { label: 'Black Larvae (Research Grade)', value: '/images/larva_black.jpg' },
    { label: 'Galleria Egg Stage', value: '/images/galleria_egg_real.jpg' },
    { label: 'Galleria Pupa Stage', value: '/images/galleria_pupa.jpg' },
    { label: 'Adult Moths (Jar)', value: '/images/galleria_adult.jpg' },
    { label: 'Rearing Racks System', value: '/images/rearing_facility.png' },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setCategory('Larvae');
    setResearchUseCase('');
    setImageUrl('/images/galleria_larva_red.jpg');
    setAvailable(true);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategory(product.category);
    setResearchUseCase(product.research_use_case);
    setImageUrl(product.image_url);
    setAvailable(product.available);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setErrorMsg('');

    if (!name || !description || !price || !stock || !researchUseCase || !imageUrl) {
      setErrorMsg('Please fill in all fields.');
      setFormSubmitting(false);
      return;
    }

    const payload = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      research_use_case: researchUseCase,
      image_url: imageUrl,
      available,
    };

    try {
      let res;
      if (editingProduct) {
        // Edit PUT request
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // Add POST request
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save product');
      }

      // Refresh list
      await fetchProducts();
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while saving product.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete product');
      }

      // Success
      await fetchProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product.');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Product Management</h1>
          <p className="text-xs text-slate-500 mt-1">Add, modify, or retire research products from the catalog.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="flex items-center space-x-2 text-xs py-2 px-4 shadow-sm"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Button
          variant="outline"
          onClick={fetchProducts}
          disabled={loading}
          className="w-full sm:w-auto text-xs py-2 border-slate-200"
          title="Refresh products list"
        >
          <RefreshCw className={`h-4.5 w-4.5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Main Content: Products Grid or Table */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-3" />
          <p className="text-xs text-slate-500">Loading catalog items from database...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card className="p-16 text-center border-slate-200 border-dashed">
          <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-600">No products found</h3>
          <p className="text-xs text-slate-500 mt-1">Click "Add New Product" to start building your catalog.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((p) => (
            <Card key={p.id} className="flex hover:shadow-md transition-shadow relative overflow-hidden h-44">
              {/* Product Image */}
              <div 
                className="w-32 bg-slate-100 bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('${p.image_url}')` }}
              />
              
              {/* Product Details */}
              <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden">
                <div className="space-y-1.5 overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-slate-800 text-sm truncate" title={p.name}>
                      {p.name}
                    </h3>
                    <Badge variant="info" className="flex-shrink-0 text-[9px] px-2 py-0">
                      {p.category}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-600">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Package className="h-3 w-3 text-slate-400" />
                      <span>Stock: <strong>{p.stock}</strong></span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-50 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(p)}
                    className="py-1 px-2.5 text-xs text-slate-600 hover:text-slate-850 hover:bg-slate-50"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    className="py-1 px-2.5 text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 bg-white"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Product Dialog Modal */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => !formSubmitting && setIsModalOpen(false)}
        title={editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center space-x-2">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <Label htmlFor="prod-name">Product Name</Label>
            <Input
              id="prod-name"
              type="text"
              required
              placeholder="e.g. Standardized 6th-Instar Larvae"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={formSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prod-price">Price ($ USD)</Label>
              <Input
                id="prod-price"
                type="number"
                step="0.01"
                required
                min="0"
                placeholder="45.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={formSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="prod-stock">Initial Stock Quantity</Label>
              <Input
                id="prod-stock"
                type="number"
                required
                min="0"
                placeholder="1000"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                disabled={formSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prod-cat">Product Category</Label>
              <Select
                id="prod-cat"
                options={[
                  { value: 'Larvae', label: 'Larvae' },
                  { value: 'Pupae', label: 'Pupae' },
                  { value: 'Breeding', label: 'Breeding' },
                  { value: 'Supplies', label: 'Rearing Supplies' },
                ]}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={formSubmitting}
              />
            </div>
            <div className="flex items-center space-x-2 h-full pt-6">
              <input
                id="prod-avail"
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                disabled={formSubmitting}
                className="w-4.5 h-4.5 rounded border-slate-350 text-emerald-600 focus:ring-emerald-500"
              />
              <Label htmlFor="prod-avail" className="mb-0 cursor-pointer">
                Available for Purchase
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="prod-desc">Description</Label>
            <Textarea
              id="prod-desc"
              required
              placeholder="Provide a detailed description of the cohort specifications, developmental staging, feeding diet, etc..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={formSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="prod-use">Research Use Case</Label>
            <Textarea
              id="prod-use"
              required
              placeholder="e.g. Drug toxicity screening, pathobiology trials, antibiotic assays..."
              value={researchUseCase}
              onChange={(e) => setResearchUseCase(e.target.value)}
              disabled={formSubmitting}
              className="min-h-[70px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            <div>
              <Label htmlFor="prod-img">Product Image Path</Label>
              <Input
                id="prod-img"
                type="text"
                required
                placeholder="/images/galleria_larva_red.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
              <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
