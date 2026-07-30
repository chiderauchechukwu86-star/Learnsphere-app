'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, PenSquare } from 'lucide-react';
import { api } from '@/lib/api';
import { saveSession } from '@/lib/auth';
import { isNetworkError, fakeTokens, roleFromSignup } from '@/lib/demo-auth';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

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
      }>('/auth/register', { fullName, email, password, role });
      saveSession(res, res.user);
      router.push(`/${res.user.role}/dashboard`);
    } catch (err) {
      if (isNetworkError(err)) {
        // Backend isn't running — create a local demo session so signup still works.
        const demoUser = roleFromSignup(fullName, email, role);
        setNotice('Backend not reachable — created a local demo session instead.');
        saveSession(fakeTokens(), demoUser);
        router.push(`/${role}/dashboard`);
        return;
      }
      setError(err instanceof Error ? err.message : 'Something went wrong');
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

        <h1 className="mt-8 font-display text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-muted">Start as a student or an instructor — you can add roles later.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex flex-col items-center gap-2 rounded-xl2 border p-4 text-sm font-medium transition ${
              role === 'student' ? 'border-brand bg-brand-light text-brand-dark' : 'border-line text-ink/70'
            }`}
          >
            <GraduationCap size={20} /> Student
          </button>
          <button
            type="button"
            onClick={() => setRole('instructor')}
            className={`flex flex-col items-center gap-2 rounded-xl2 border p-4 text-sm font-medium transition ${
              role === 'instructor' ? 'border-brand bg-brand-light text-brand-dark' : 'border-line text-ink/70'
            }`}
          >
            <PenSquare size={20} /> Instructor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">Full name</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="Jordan Ade"
            />
          </div>
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
            <label className="text-sm font-medium text-ink">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="At least 8 characters"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {notice && <p className="text-sm text-amber-dark">{notice}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand hover:text-brand-dark">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
