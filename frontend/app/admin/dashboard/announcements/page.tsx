'use client';

import { useState } from 'react';
import {
  LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings, Send,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const items = [
  { label: 'Overview', href: '/admin/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Users', href: '/admin/dashboard/users', icon: 'Users' as const },
  { label: 'Approvals', href: '/admin/dashboard/approvals', icon: 'ShieldCheck' as const },
  { label: 'Analytics', href: '/admin/dashboard/analytics', icon: 'BarChart3' as const },
  { label: 'Announcements', href: '/admin/dashboard/announcements', icon: 'Megaphone' as const },
  { label: 'Audit logs', href: '/admin/dashboard/audit-logs', icon: 'FileClock' as const },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: 'Settings' as const },
];

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  sentAt: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Scheduled maintenance — July 15',
    body: 'The platform will be briefly unavailable for a database upgrade.',
    audience: 'All users',
    sentAt: '2026-07-08',
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('All users');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setAnnouncements((a) => [
      { id: `a${Date.now()}`, title, body, audience, sentAt: new Date().toISOString().slice(0, 10) },
      ...a,
    ]);
    setTitle('');
    setBody('');
  };

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-semibold">Announcements</h1>
          <p className="mt-1 text-sm text-muted">Broadcast a notification to students, instructors, or everyone.</p>

          <form onSubmit={handleSend} className="mt-6 space-y-4 rounded-xl2 border border-line bg-card p-5 shadow-card">
            <div>
              <label className="text-sm font-medium text-ink">Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-brand"
                placeholder="e.g. New certificate design is live"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink">Message</label>
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                className="mt-1.5 w-full resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink">Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-brand"
              >
                <option>All users</option>
                <option>Students</option>
                <option>Instructors</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              <Send size={15} /> Send announcement
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-xl2 border border-line bg-card p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{a.title}</p>
                  <span className="text-xs text-muted">{a.sentAt}</span>
                </div>
                <p className="mt-1 text-sm text-ink/70">{a.body}</p>
                <span className="mt-2 inline-block rounded-full bg-brand-light px-2 py-0.5 text-xs font-semibold text-brand-dark">
                  {a.audience}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
