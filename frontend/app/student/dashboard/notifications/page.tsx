'use client';

import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Award, Heart, Bell, CheckCheck, GraduationCap, FileQuestion, MessageSquare,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const items = [
  { label: 'Overview', href: '/student/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'My courses', href: '/student/dashboard/courses', icon: 'BookOpen' as const },
  { label: 'Certificates', href: '/certificates', icon: 'Award' as const },
  { label: 'Wishlist', href: '/student/dashboard/wishlist', icon: 'Heart' as const },
  { label: 'Notifications', href: '/student/dashboard/notifications', icon: 'Bell' as const },
];

const initialNotifications = [
  { id: '1', icon: GraduationCap, title: 'New lesson available', body: '"Designing the enrollments collection" just went live.', read: false },
  { id: '2', icon: FileQuestion, title: 'Quiz available', body: 'Section quiz for MongoDB for Backend Engineers is ready.', read: false },
  { id: '3', icon: MessageSquare, title: 'Instructor announcement', body: 'Amara Chukwu posted an update in React for Product Teams.', read: true },
  { id: '4', icon: Award, title: 'Certificate ready', body: 'Your certificate for MongoDB for Backend Engineers is ready to download.', read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markRead = (id: string) =>
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Student" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-semibold">Notifications</h1>
              <p className="mt-1 text-sm text-muted">{unreadCount} unread</p>
            </div>
            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCheck size={14} /> Mark all as read
            </button>
          </div>

          <div className="mt-6 space-y-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex w-full items-start gap-3 rounded-xl2 border p-4 text-left transition ${
                  n.read ? 'border-line bg-card' : 'border-brand/30 bg-brand-light'
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  n.read ? 'bg-paper text-muted' : 'bg-white text-brand-dark'
                }`}>
                  <n.icon size={16} />
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${n.read ? 'text-ink/70' : 'text-ink'}`}>{n.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{n.body}</p>
                </div>
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
