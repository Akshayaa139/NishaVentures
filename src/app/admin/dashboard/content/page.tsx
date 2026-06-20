'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Save, AlertCircle, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Textarea, Label } from '@/components/ui/core';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact'>('home');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. HOME copy states
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [stat1, setStat1] = useState('');
  const [stat2, setStat2] = useState('');
  const [stat3, setStat3] = useState('');
  const [stat4, setStat4] = useState('');

  // 2. ABOUT copy states
  const [whatIs, setWhatIs] = useState('');
  const [whyUse, setWhyUse] = useState('');
  const [rearing, setRearing] = useState('');
  const [qa, setQa] = useState('');

  // 3. CONTACT copy states
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [instagram, setInstagram] = useState('');
  const [address, setAddress] = useState('');

  const fetchContent = async (key: 'home' | 'about' | 'contact') => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/content?key=${key}`);
      if (!res.ok) {
        throw new Error(`Failed to load content for ${key}`);
      }
      const data = await res.json();
      
      if (key === 'home') {
        setHeroTitle(data.heroTitle || '');
        setHeroSubtitle(data.heroSubtitle || '');
        setStat1(data.stats?.stat1 || '');
        setStat2(data.stats?.stat2 || '');
        setStat3(data.stats?.stat3 || '');
        setStat4(data.stats?.stat4 || '');
      } else if (key === 'about') {
        setWhatIs(data.whatIs || '');
        setWhyUse(data.whyUse || '');
        setRearing(data.rearing || '');
        setQa(data.qa || '');
      } else if (key === 'contact') {
        setEmail(data.email || '');
        setPhone1(data.phone1 || '');
        setPhone2(data.phone2 || '');
        setInstagram(data.instagram || '');
        setAddress(data.address || '');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch content block.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    let payload: any = {};
    if (activeTab === 'home') {
      payload = {
        heroTitle,
        heroSubtitle,
        stats: {
          stat1,
          stat2,
          stat3,
          stat4
        }
      };
    } else if (activeTab === 'about') {
      payload = {
        whatIs,
        whyUse,
        rearing,
        qa
      };
    } else if (activeTab === 'contact') {
      payload = {
        email,
        phone1,
        phone2,
        instagram,
        address
      };
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: activeTab,
          content: payload
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update website content.');
      }

      setSuccessMsg(`Website content for "${activeTab.toUpperCase()}" page updated successfully!`);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Website Content Management</h1>
          <p className="text-xs text-slate-500 mt-1">Modify page copy, hero headers, statistics lists, and contact info.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        {(['home', 'about', 'contact'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3.5 px-6 text-xs font-bold tracking-wider uppercase border-b-2 transition-all -mb-px ${
              activeTab === tab
                ? 'border-emerald-600 text-emerald-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-850 hover:border-slate-300'
            }`}
          >
            {tab} Page Content
          </button>
        ))}
      </div>

      {/* Message banners */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-250 flex items-center space-x-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center space-x-2">
          <AlertCircle className="h-4.5 w-4.5 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Content */}
      {loading ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-3" />
          <p className="text-xs text-slate-500">Fetching database parameters for {activeTab}...</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-1.5">
              <FileText className="h-5 w-5 text-slate-450" />
              <span className="capitalize">{activeTab} Page Copy Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* -------------------- HOME TAB -------------------- */}
              {activeTab === 'home' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Hero Section Title</Label>
                    <Input
                      id="hero-title"
                      type="text"
                      required
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero-sub">Hero Section Subtitle / Slogan</Label>
                    <Textarea
                      id="hero-sub"
                      required
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      disabled={saving}
                      className="min-h-[70px]"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Statistics Section Bullet Headers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stat-1">Statistic 1 Header</Label>
                        <Input
                          id="stat-1"
                          type="text"
                          required
                          value={stat1}
                          onChange={(e) => setStat1(e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor="stat-2">Statistic 2 Header</Label>
                        <Input
                          id="stat-2"
                          type="text"
                          required
                          value={stat2}
                          onChange={(e) => setStat2(e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor="stat-3">Statistic 3 Header</Label>
                        <Input
                          id="stat-3"
                          type="text"
                          required
                          value={stat3}
                          onChange={(e) => setStat3(e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor="stat-4">Statistic 4 Header</Label>
                        <Input
                          id="stat-4"
                          type="text"
                          required
                          value={stat4}
                          onChange={(e) => setStat4(e.target.value)}
                          disabled={saving}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------- ABOUT TAB -------------------- */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="abt-what">What is Galleria mellonella? (Scientific introduction)</Label>
                    <Textarea
                      id="abt-what"
                      required
                      value={whatIs}
                      onChange={(e) => setWhatIs(e.target.value)}
                      disabled={saving}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="abt-why">Why researchers use Galleria mellonella? (Invertebrate benefits)</Label>
                    <Textarea
                      id="abt-why"
                      required
                      value={whyUse}
                      onChange={(e) => setWhyUse(e.target.value)}
                      disabled={saving}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="abt-rear">Standardized Rearing Protocols (Diet, temperature parameters)</Label>
                    <Textarea
                      id="abt-rear"
                      required
                      value={rearing}
                      onChange={(e) => setRearing(e.target.value)}
                      disabled={saving}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="abt-qa">Quality Assurance and Dormancy Shipment Checks</Label>
                    <Textarea
                      id="abt-qa"
                      required
                      value={qa}
                      onChange={(e) => setQa(e.target.value)}
                      disabled={saving}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {/* -------------------- CONTACT TAB -------------------- */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="c-email">Office Email</Label>
                      <Input
                        id="c-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="c-insta">Instagram Business Handle URL</Label>
                      <Input
                        id="c-insta"
                        type="text"
                        required
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="c-phone1">Contact Number 1</Label>
                      <Input
                        id="c-phone1"
                        type="text"
                        required
                        value={phone1}
                        onChange={(e) => setPhone1(e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="c-phone2">Contact Number 2</Label>
                      <Input
                        id="c-phone2"
                        type="text"
                        required
                        value={phone2}
                        onChange={(e) => setPhone2(e.target.value)}
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="c-addr">Rearing Facility / Office Address</Label>
                    <Input
                      id="c-addr"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={saving}
                    />
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4.5 w-4.5" />
                  <span>{saving ? 'Saving updates...' : 'Save Site Content'}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
