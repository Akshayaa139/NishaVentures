'use client';

import React, { useState } from 'react';
import { Search, FlaskConical, ShoppingCart, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Input, Textarea, Label, Dialog, Badge } from './ui/core';
import confetti from 'canvas-confetti';
import { Product } from '@/lib/db';

interface ProductCatalogProps {
  initialProducts: Product[];
}

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Inquiry form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Get unique categories
  const categories = ['All', ...Array.from(new Set(initialProducts.map((p) => p.category)))];

  // 2. Filter products based on search and category
  const filteredProducts = initialProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.research_use_case.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 3. Open Buy Now Modal
  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setErrorMsg('');
    setSuccessMsg('');
    setIsModalOpen(true);
    // Initialize inquiry details
    setQuantity('');
    setMessage(`Hello, I would like to request an order of ${product.name} for research use in our laboratory.`);
  };

  // 4. Form Submission Handler
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !phone || !institution || !quantity || !message) {
      setErrorMsg('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          institution,
          quantity_required: Number(quantity),
          message,
          product_id: selectedProduct?.id || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success
      setSuccessMsg('Your inquiry has been submitted successfully! The Nisha Ventures admin team will review it and contact you soon.');
      
      // Fire celebration confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setInstitution('');
      setQuantity('');
      setMessage('');
      
      // Delay closing modal slightly so they read success info
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3500);

    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
          <Input
            type="text"
            placeholder="Search products by name, application, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No products found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different product category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-md transition-shadow group">
              {/* Product Image Panel */}
              <div className="relative h-64 bg-slate-950 overflow-hidden border-b border-slate-50 flex-shrink-0">
                <div
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.image_url || '/images/larvae_research.png'}')` }}
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant={product.stock > 0 ? 'success' : 'danger'}>
                    {product.stock > 0 ? `${product.stock.toLocaleString()} available` : 'Out of Stock'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="info">{product.category}</Badge>
                </div>
              </div>

              {/* Card Body */}
              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl font-bold text-slate-800 leading-tight">
                      {product.name}
                    </CardTitle>
                    <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 uppercase tracking-wider whitespace-nowrap">
                      Price on Enquiry
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Research Application:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {product.research_use_case}
                    </p>
                  </div>
                </div>
              </CardContent>

              {/* Card Actions Footer */}
              <CardFooter className="p-6 bg-slate-50/50 border-t border-slate-50 flex gap-3">
                {/* Contact Seller via WhatsApp - Primary Prominent Action */}
                <a
                  href={`https://wa.me/918248612679?text=Hello%20Nisha%20Ventures%20team,%20I%20am%20interested%20in%20inquiring%20about%20ordering%20your%20${encodeURIComponent(product.name)}%20for%20our%20lab%20research.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex"
                >
                  <Button
                    className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10"
                    disabled={product.stock <= 0}
                  >
                    <MessageCircle className="h-4.5 w-4.5 fill-current" />
                    <span>Enquire via WhatsApp</span>
                  </Button>
                </a>

                {/* Email Inquiry Dialog Modal - Secondary Action */}
                <Button
                  variant="outline"
                  onClick={() => handleBuyNow(product)}
                  disabled={product.stock <= 0}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5"
                >
                  <ShoppingCart className="h-4.5 w-4.5 text-slate-500" />
                  <span>Enquire via Email</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Buy Now / Inquiry Dialog Modal */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        title={`Request Research Order: ${selectedProduct?.name}`}
      >
        {successMsg ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">Inquiry Received</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {successMsg}
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 pt-1">
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-100 flex items-start space-x-2">
              <FlaskConical className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                Nisha Ventures products are supplied specifically as biological models for laboratory research. Please provide institutional credentials.
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center space-x-2">
                <AlertCircle className="h-4.5 w-4.5 text-red-500 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inq-name">Your Full Name</Label>
                <Input
                  id="inq-name"
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="inq-inst">Institution / Lab</Label>
                <Input
                  id="inq-inst"
                  type="text"
                  required
                  placeholder="e.g. biotech institute / university"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inq-email">Email Address</Label>
                <Input
                  id="inq-email"
                  type="email"
                  required
                  placeholder="e.g. name@univ.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="inq-phone">Contact Number</Label>
                <Input
                  id="inq-phone"
                  type="tel"
                  required
                  placeholder="e.g. 8248612679"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="inq-qty">Quantity Required (No. of larvae / units)</Label>
              <Input
                id="inq-qty"
                type="number"
                required
                min={1}
                placeholder="e.g. 500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="inq-msg">Research Context / Special Request</Label>
              <Textarea
                id="inq-msg"
                required
                placeholder="Describe your testing needs, target delivery dates, or size/weight constraints (minimum 0.200g)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-1.5"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-1">⌛</span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Order Inquiry</span>
                )}
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
}
