'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Info } from 'lucide-react';
import { api } from '@/lib/api';
import { saveSession } from '@/lib/auth';
import { findDemoUser, isNetworkError, fakeTokens } from '@/lib/demo-auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);
    try {
      const res = await api.post<{
        accessToken: string;
        refreshToken: string;
        user: { fullName: string; email: string; role: 'student' | 'instructor' | 'admin' };
      }>('/auth/login', { email, password });
      saveSession(res, res.user);
      router.push(`/${res.user.role}/dashboard`);
    } catch (err) {
      if (isNetworkError(err)) {
        // Backend isn't running — fall back to the built-in demo accounts so
        // the app is still fully explorable.
        const demoUser = findDemoUser(email, password);
        if (demoUser) {
          setNotice('Backend not reachable — signed in with demo data instead.');
          saveSession(fakeTokens(), demoUser);
          router.push(`/${demoUser.role}/dashboard`);
          return;
        }
        setError(
          'Could not reach the API, and no demo account matches those credentials. Try student@learnsphere.dev / password123.',
        );
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white">LS</span>
          <span className="font-display text-lg font-semibold">LearnSphere</span>
        </Link>

        <h1 className="mt-8 font-display text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Log in to pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-ink">Password</label>
              <Link href="#" className="text-xs font-medium text-brand hover:text-brand-dark">Forgot?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="••••••••"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" className="rounded border-line" />
            Remember me
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {notice && <p className="text-sm text-amber-dark">{notice}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs text-muted">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <a
          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/auth/google`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white py-2.5 text-sm font-semibold text-ink transition hover:border-brand/40"
        >
          Continue with Google
        </a>

        <div className="mt-6 rounded-lg border border-line bg-white p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <Info size={13} /> No backend running? Try a demo account:
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              { label: 'Student', email: 'student@learnsphere.dev' },
              { label: 'Instructor', email: 'instructor@learnsphere.dev' },
              { label: 'Admin', email: 'admin@learnsphere.dev' },
            ].map((d) => (
              <button
                key={d.email}
                type="button"
                onClick={() => fillDemo(d.email)}
                className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-medium hover:border-brand/40"
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          New here?{' '}
          <Link href="/register" className="font-semibold text-brand hover:text-brand-dark">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
