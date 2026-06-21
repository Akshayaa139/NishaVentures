'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, Button, Input, Textarea, Label, Select } from './ui/core';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import confetti from 'canvas-confetti';
import { Product } from '@/lib/db';

interface ContactFormProps {
  products: Product[];
}

export default function ContactForm({ products }: ContactFormProps) {
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Prepare product options for Select
  const productOptions = [
    { value: '', label: 'General / No Specific Product' },
    ...products.map((p) => ({ value: p.id, label: p.name })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !phone || !institution || !quantity || !message) {
      setErrorMsg('All fields except product selection are required.');
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
          product_id: productId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      // Success
      setSuccessMsg('Your inquiry has been submitted! Our bio-models team will review your testing request and call/email you shortly.');
      
      // Confetti celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Reset
      setName('');
      setEmail('');
      setPhone('');
      setInstitution('');
      setQuantity('');
      setProductId('');
      setMessage('');
      
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Cards & Maps: Col-span 5 */}
      <div className="lg:col-span-5 space-y-6">
        {/* Contact Info Card */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 border-b border-slate-50 pb-3">
            Contact Information
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 flex-shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Phone Numbers</span>
                <a href="tel:8248612679" className="text-slate-500 hover:text-emerald-600 transition-colors block mt-0.5">8248612679</a>
                <a href="tel:8489437274" className="text-slate-500 hover:text-emerald-600 transition-colors block">8489437274</a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Email Address</span>
                <a href="mailto:nishaventures007@gmail.com" className="text-slate-500 hover:text-emerald-600 transition-colors block mt-0.5">nishaventures007@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 flex-shrink-0">
                <InstagramIcon className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Instagram</span>
                <a 
                  href="https://www.instagram.com/nisha_ventures07" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-emerald-600 transition-colors block mt-0.5"
                >
                  @nisha_ventures07
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Office & Rearing Lab</span>
                <span className="text-slate-500 block mt-0.5">Nisha Ventures, Biotech Models Division, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50">
            <a
              href="https://wa.me/918248612679?text=Hello%20Nisha%20Ventures,%20I%20would%20like%20to%20discuss%20ordering%20research-grade%20larvae."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat Instantly via WhatsApp</span>
              </Button>
            </a>
          </div>
        </Card>

        {/* Google Maps Embed */}
        <Card className="overflow-hidden h-64 border border-slate-100 shadow-sm relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.142277497258!2d77.971510!3d11.026410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzM1LjEiTiA3N8KwNTgnMTcuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nisha Ventures Tamil Nadu Location"
          />
        </Card>
      </div>

      {/* Inquiry Form: Col-span 7 */}
      <div className="lg:col-span-7">
        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 border-b border-slate-50 pb-3 mb-6">
            Submit a Research Inquiry
          </h2>

          {successMsg ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {successMsg}
              </p>
              <div className="pt-4">
                <Button variant="outline" onClick={() => setSuccessMsg('')}>
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center space-x-2">
                  <AlertCircle className="h-4.5 w-4.5 text-red-500 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cont-name">Full Name</Label>
                  <Input
                    id="cont-name"
                    type="text"
                    required
                    placeholder="Dr. John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="cont-inst">Institution / Lab / University</Label>
                  <Input
                    id="cont-inst"
                    type="text"
                    required
                    placeholder="e.g. Bio R&D Corp / University of Madras"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cont-email">Institutional Email</Label>
                  <Input
                    id="cont-email"
                    type="email"
                    required
                    placeholder="john.smith@institution.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="cont-phone">Mobile / Contact Number</Label>
                  <Input
                    id="cont-phone"
                    type="tel"
                    required
                    placeholder="e.g. 8489437274"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cont-prod">Product of Interest</Label>
                  <Select
                    id="cont-prod"
                    options={productOptions}
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="cont-qty">Quantity Required</Label>
                  <Input
                    id="cont-qty"
                    type="number"
                    required
                    min={1}
                    placeholder="Number of larvae / kits"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cont-msg">Detailed Research Requirements</Label>
                <Textarea
                  id="cont-msg"
                  required
                  placeholder="Specify developmental cohorts, weight constraints (e.g. minimum 0.200g), shipping logistics dates, or toxicity test criteria..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⌛</span>
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Inquiry</span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
