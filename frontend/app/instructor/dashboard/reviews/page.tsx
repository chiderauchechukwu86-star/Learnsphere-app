'use client';

import { useState } from 'react';
import { LayoutDashboard, Users, DollarSign, Star, CornerDownRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const items = [
  { label: 'Overview', href: '/instructor/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Students', href: '/instructor/dashboard/students', icon: 'Users' as const },
  { label: 'Revenue', href: '/instructor/dashboard/revenue', icon: 'DollarSign' as const },
  { label: 'Reviews', href: '/instructor/dashboard/reviews', icon: 'Star' as const },
];

const initialReviews = [
  { id: '1', student: 'Chidinma Obi', rating: 5, comment: 'Clear, practical, and paced well. The forms section alone was worth it.', reply: '' },
  { id: '2', student: 'Tunde Bakare', rating: 4, comment: 'Great content — wish there were more exercises on custom hooks.', reply: '' },
  { id: '3', student: 'Wale Adeyemi', rating: 5, comment: 'Best React course I have taken. Certificate looks great too.', reply: 'Thank you, Wale! More hook exercises are coming in the next update.' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const submitReply = (id: string) => {
    const message = drafts[id]?.trim();
    if (!message) return;
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, reply: message } : r)));
    setDrafts((d) => ({ ...d, [id]: '' }));
  };

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Instructor" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-2xl font-semibold">Reviews</h1>
          <p className="mt-1 text-sm text-muted">Reply publicly — students see your response under their review.</p>

          <div className="mt-6 space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl2 border border-line bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.student}</p>
                  <div className="flex gap-0.5 text-amber">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < r.rating ? 'fill-amber' : 'text-line'} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-ink/70">{r.comment}</p>

                {r.reply && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-paper p-3 text-sm text-ink/70">
                    <CornerDownRight size={14} className="mt-0.5 shrink-0 text-brand" />
                    {r.reply}
                  </div>
                )}

                {!r.reply && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={drafts[r.id] || ''}
                      onChange={(e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value }))}
                      placeholder="Write a reply…"
                      className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brand"
                    />
                    <button
                      onClick={() => submitReply(r.id)}
                      className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-dark"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
