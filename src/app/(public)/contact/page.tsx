import React from 'react';
import ContactForm from '@/components/ContactForm';
import { db } from '@/lib/db';
import { Mail } from 'lucide-react';

export const revalidate = 0; // Fresh products on contact page reload

export default async function ContactPage() {
  const products = await db.getProducts();

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
          <Mail className="h-4 w-4" />
          <span>Contact Us</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
          Get in Touch with Our Specialists
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Submit your research parameters, bulk requirements, or shipping timelines, and our bio-models logistics team will configure a quote for your facility.
        </p>
      </div>

      {/* Main Contact Section */}
      <ContactForm products={products} />
    </div>
  );
}
