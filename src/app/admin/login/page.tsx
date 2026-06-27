'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, AlertCircle, FlaskConical } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Label } from '@/components/ui/core';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Success, route to dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check your username and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 shadow-lg shadow-emerald-500/20 mb-2">
            <FlaskConical className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Nisha Ventures</h1>
          <p className="text-xs text-slate-400">Bio-Models Research Portal Admin Access</p>
        </div>

        <Card className="border-slate-800 bg-slate-950/80 shadow-2xl backdrop-blur-md">
          <CardHeader className="border-slate-900 pb-4 text-center">
            <CardTitle className="text-base font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
              <span>Admin Authentication</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-900/30 text-red-400 text-xs rounded-lg flex items-start space-x-2">
                  <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <Label htmlFor="login-username" className="text-slate-200 font-semibold">Username</Label>
                <Input
                  id="login-username"
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                  className="bg-slate-950 border-slate-700 text-slate-100 text-base sm:text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 caret-emerald-400"
                />
              </div>

              <div>
                <Label htmlFor="login-password" className="text-slate-200 font-semibold">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="bg-slate-950 border-slate-700 text-slate-100 text-base sm:text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 caret-emerald-400"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center py-2.5 font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⌛</span>
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <span>Log In to Dashboard</span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Note on default accounts */}
        <div className="text-center text-[10px] text-slate-500">
          <p>For initial deployment, use default credentials:</p>
          <p className="mt-0.5 font-mono">admin / Password123!</p>
        </div>
      </div>
    </div>
  );
}
