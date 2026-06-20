'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building, Layers, MessageSquare, Trash2, Calendar, ClipboardList, CheckCircle, RefreshCw, X, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Dialog, Badge, Select } from '@/components/ui/core';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  quantity_required: number;
  message: string;
  product_id: string | null;
  product_name?: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setProductsToInquiries(data);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to ensure lists are sorted/mapped properly
  const setProductsToInquiries = (data: Inquiry[]) => {
    setInquiries(data);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      // Update locally
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
      
      // Update selected modal details if open
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      alert('Error updating status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the inquiry from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete inquiry');
      }

      // Remove locally
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      if (selectedInquiry?.id === id) {
        setIsDetailOpen(false);
      }
    } catch (err) {
      alert('Failed to delete inquiry.');
    }
  };

  const openDetailModal = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setIsDetailOpen(true);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Inquiry Management</h1>
          <p className="text-xs text-slate-500 mt-1">Review orders, inspect laboratory requirements, and update client statuses.</p>
        </div>
        <Button
          variant="outline"
          onClick={fetchInquiries}
          disabled={loading}
          className="w-fit text-xs py-2 border-slate-200"
        >
          <RefreshCw className={`h-4.5 w-4.5 text-slate-500 mr-2 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </Button>
      </div>

      {/* inquiries catalog */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-3" />
          <p className="text-xs text-slate-500">Retrieving customer order inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <Card className="p-16 text-center border-slate-200 border-dashed">
          <ClipboardList className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-600">No inquiries found</h3>
          <p className="text-xs text-slate-500 mt-1">Inquiries submitted via contact or product forms will display here.</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-600 font-semibold">
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Researcher Name</th>
                  <th className="p-4">Institution</th>
                  <th className="p-4">Product Requested</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Tracking Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(inq.created_at)}
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      {inq.name}
                    </td>
                    <td className="p-4 text-slate-500 font-medium max-w-[150px] truncate" title={inq.institution}>
                      {inq.institution}
                    </td>
                    <td className="p-4 text-slate-600 font-semibold max-w-[150px] truncate" title={inq.product_name}>
                      {inq.product_name || 'General Inquiry'}
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      {inq.quantity_required.toLocaleString()}
                    </td>
                    <td className="p-4">
                      {updatingId === inq.id ? (
                        <span className="text-[10px] text-slate-400">updating...</span>
                      ) : (
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                          className={`text-[10px] font-bold border rounded px-2 py-0.5 outline-none cursor-pointer ${
                            inq.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : inq.status === 'contacted'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : inq.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-50 text-slate-650 border-slate-200'
                          }`}
                        >
                          <option value="pending">PENDING</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="completed">COMPLETED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailModal(inq)}
                        className="py-1 px-2.5 text-xs text-slate-600 hover:text-slate-850 hover:bg-slate-50"
                      >
                        Open Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                        className="py-1 px-2.5 text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-650 bg-white"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Inquiry Detail Dialog */}
      <Dialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Research Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-6 pt-1">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Calendar className="h-4 w-4" />
                <span>Submitted: {formatDate(selectedInquiry.created_at)}</span>
              </div>
              <Badge
                variant={
                  selectedInquiry.status === 'pending'
                    ? 'warning'
                    : selectedInquiry.status === 'contacted'
                    ? 'info'
                    : selectedInquiry.status === 'completed'
                    ? 'success'
                    : 'neutral'
                }
                className="uppercase text-[9px] font-bold"
              >
                {selectedInquiry.status}
              </Badge>
            </div>

            {/* Grid of details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <ClipboardList className="h-4.5 w-4.5 text-slate-450 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block">Researcher Name</span>
                    <span className="text-slate-700 font-semibold">{selectedInquiry.name}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Building className="h-4.5 w-4.5 text-slate-450 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block">Institution / Laboratory</span>
                    <span className="text-slate-700 font-semibold">{selectedInquiry.institution}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Layers className="h-4.5 w-4.5 text-slate-450 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block">Product Requested</span>
                    <span className="text-emerald-700 font-semibold">{selectedInquiry.product_name || 'General Inquiry'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Mail className="h-4.5 w-4.5 text-slate-450 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block">Email Address</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">{selectedInquiry.email}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Phone className="h-4.5 w-4.5 text-slate-450 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block">Phone Number</span>
                    <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">{selectedInquiry.phone}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4.5 w-4.5 text-slate-450 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block">Quantity Required</span>
                    <span className="text-slate-800 font-bold text-sm">{selectedInquiry.quantity_required.toLocaleString()} Larvae</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                <MessageSquare className="h-4.5 w-4.5 text-slate-400" />
                <span className="font-bold">Research message / Context:</span>
              </div>
              <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 justify-between items-center text-xs">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-slate-450 font-bold">Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                  className="border border-slate-200 rounded px-3 py-1 outline-none text-xs font-semibold cursor-pointer"
                >
                  <option value="pending">PENDING</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="completed">COMPLETED</option>
                  <option value="cancelled">CANCELLED</option>
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Nisha Ventures Order Inquiry - ${encodeURIComponent(selectedInquiry.product_name || 'Larvae Model Inquiry')}&body=Hello ${encodeURIComponent(selectedInquiry.name)},%0D%0A%0D%0AThank you for contacting Nisha Ventures. We received your request for ${selectedInquiry.quantity_required} larvae. `}
                  className="flex-1 sm:flex-initial"
                >
                  <Button variant="primary" size="sm" className="w-full">
                    Email Client
                  </Button>
                </a>
                <a
                  href={`https://wa.me/91${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedInquiry.name)},%20this%20is%20the%20Nisha%20Ventures%20biological%20models%20team%20replying%20to%20your%20order%20request.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button variant="outline" size="sm" className="w-full border-emerald-250 text-emerald-655 hover:bg-emerald-50 bg-white flex items-center justify-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDetailOpen(false)}
                  className="border-slate-200 text-slate-700 bg-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
