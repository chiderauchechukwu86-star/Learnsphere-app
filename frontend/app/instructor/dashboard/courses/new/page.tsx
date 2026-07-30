'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, DollarSign, Star, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const items = [
  { label: 'Overview', href: '/instructor/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Students', href: '/instructor/dashboard/students', icon: 'Users' as const },
  { label: 'Revenue', href: '/instructor/dashboard/revenue', icon: 'DollarSign' as const },
  { label: 'Reviews', href: '/instructor/dashboard/reviews', icon: 'Star' as const },
];

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [difficulty, setDifficulty] = useState('beginner');
  const [price, setPrice] = useState('49');
  const [created, setCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Real implementation: POST /courses (instructor-only, see backend/src/modules/courses).
    // This demo confirms the flow end-to-end without a live API.
    setCreated(true);
  };

  if (created) {
    return (
      <div className="flex min-h-screen bg-paper">
        <Sidebar items={items} roleLabel="Instructor" />
        <main className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-sm text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-light text-sage-dark">
              <CheckCircle2 size={26} />
            </span>
            <h1 className="mt-4 font-display text-xl font-semibold">&ldquo;{title}&rdquo; created as a draft</h1>
            <p className="mt-2 text-sm text-muted">
              Next, add your curriculum and submit it for review. Once approved by an admin, it goes live.
            </p>
            <button
              onClick={() => router.push('/instructor/dashboard')}
              className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Back to dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Instructor" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="mt-4 font-display text-2xl font-semibold">Create a new course</h1>
          <p className="mt-1 text-sm text-muted">Start with the basics — you can build out curriculum next.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-ink">Course title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced TypeScript Patterns"
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink">Subtitle</label>
              <input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="One line describing the outcome"
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ink">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
                >
                  {['Web Development', 'Databases', 'Design', 'Data Science', 'Mobile'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-ink">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-ink">Price (USD, 0 for free)</label>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Create draft
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
