import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Inbox, 
  Image as ImageIcon, 
  AlertCircle, 
  ChevronRight, 
  ClipboardList, 
  Package, 
  CheckCircle 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui/core';
import { db } from '@/lib/db';

export const revalidate = 0; // Fetch fresh data on dashboard entry

export default async function AdminDashboardPage() {
  // Query all database values
  const products = await db.getProducts();
  const inquiries = await db.getInquiries();
  const gallery = await db.getGallery();

  // Compute metrics
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'pending').length;
  const totalGallery = gallery.length;

  const statCards = [
    { title: 'Total Products', val: totalProducts, desc: 'Active catalog items', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { title: 'Available Inventory', val: totalStock.toLocaleString(), desc: 'Larvae/breeding stock', icon: Package, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Customer Inquiries', val: totalInquiries, desc: 'Total order submissions', icon: Inbox, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Pending Follow-Ups', val: pendingInquiries, desc: 'Awaiting call/email', icon: AlertCircle, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  // Slice recent 5 inquiries for table
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time metrics, product stock levels, and laboratory inquiry requests.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {stat.title}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-850">
                    {stat.val}
                  </h3>
                  <span className="text-[10px] text-slate-500 block">
                    {stat.desc}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.color} flex-shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Recent Inquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-1.5 text-base">
                <ClipboardList className="h-5 w-5 text-slate-500" />
                <span>Recent Order Inquiries</span>
              </CardTitle>
              <Link href="/admin/dashboard/inquiries">
                <Button variant="ghost" size="sm" className="text-xs flex items-center space-x-1">
                  <span>View All</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentInquiries.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-slate-600 font-semibold">
                        <th className="p-4">Researcher</th>
                        <th className="p-4">Institution</th>
                        <th className="p-4">Product</th>
                        <th className="p-4">Qty</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentInquiries.map((inq) => (
                        <tr key={inq.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-700">{inq.name}</td>
                          <td className="p-4 text-slate-500 max-w-[150px] truncate">{inq.institution}</td>
                          <td className="p-4 text-slate-600 font-medium truncate max-w-[150px]">{inq.product_name}</td>
                          <td className="p-4 text-slate-700 font-bold">{inq.quantity_required.toLocaleString()}</td>
                          <td className="p-4">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${
                                inq.status === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : inq.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-50 text-slate-650 border-slate-200'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Utilities Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/dashboard/products" className="block">
                <Button className="w-full justify-start space-x-2 text-xs" variant="outline">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Manage Products Catalogue</span>
                </Button>
              </Link>
              <Link href="/admin/dashboard/inquiries" className="block">
                <Button className="w-full justify-start space-x-2 text-xs" variant="outline">
                  <Inbox className="h-4 w-4" />
                  <span>Review Pending Inquiries</span>
                </Button>
              </Link>
              <Link href="/admin/dashboard/gallery" className="block">
                <Button className="w-full justify-start space-x-2 text-xs" variant="outline">
                  <ImageIcon className="h-4 w-4" />
                  <span>Update Photo Gallery</span>
                </Button>
              </Link>
              <Link href="/admin/dashboard/content" className="block">
                <Button className="w-full justify-start space-x-2 text-xs" variant="outline">
                  <ClipboardList className="h-4 w-4" />
                  <span>Edit Page Site Copy</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Database Backup Status Card */}
          <Card className="bg-slate-900 border-slate-800 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Database Status</h4>
              <h3 className="text-sm font-bold flex items-center space-x-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Local Data Backup Active</span>
              </h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                The database is operating in local-backup mode using JSON file storage. Updates are automatically persisted to `src/data/db.json`. Connection parameters for Supabase Postgres can be specified in `.env.local` to trigger server-database synchronization.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
