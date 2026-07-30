'use client';

import { useState } from 'react';
import {
  LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings, CheckCircle2, XCircle,
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

const initialCourses = [
  { id: 'c1', title: 'GraphQL for REST Developers', instructor: 'Chidi Nwosu' },
  { id: 'c2', title: 'Figma to Production', instructor: 'Sarah Lin' },
];

const initialInstructors = [
  { id: 'i1', name: 'Kwame Asante', email: 'kwame@example.com' },
];

export default function ApprovalsPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [instructors, setInstructors] = useState(initialInstructors);
  const [resolved, setResolved] = useState<string[]>([]);

  const resolveCourse = (id: string, decision: 'approved' | 'rejected') => {
    setCourses((cs) => cs.filter((c) => c.id !== id));
    setResolved((r) => [`Course ${decision}: ${id}`, ...r]);
  };
  const resolveInstructor = (id: string, decision: 'approved' | 'rejected') => {
    setInstructors((is) => is.filter((i) => i.id !== id));
    setResolved((r) => [`Instructor ${decision}: ${id}`, ...r]);
  };

  const nothingLeft = courses.length === 0 && instructors.length === 0;

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-2xl font-semibold">Approvals</h1>
          <p className="mt-1 text-sm text-muted">Courses go live and instructors gain publishing rights only after approval.</p>

          {nothingLeft && (
            <div className="mt-8 rounded-xl2 border border-dashed border-line py-16 text-center">
              <CheckCircle2 className="mx-auto text-sage" size={26} />
              <p className="mt-3 text-sm text-muted">All caught up — nothing pending review.</p>
            </div>
          )}

          {courses.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold">Courses awaiting review</h2>
              <div className="mt-3 space-y-3">
                {courses.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-xl2 border border-line bg-card p-4 shadow-card">
                    <div>
                      <p className="text-sm font-semibold">{c.title}</p>
                      <p className="text-xs text-muted">by {c.instructor}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => resolveCourse(c.id, 'approved')}
                        className="flex items-center gap-1.5 rounded-full bg-sage-light px-3 py-1.5 text-xs font-semibold text-sage-dark hover:bg-sage/20"
                      >
                        <CheckCircle2 size={14} /> Approve
                      </button>
                      <button
                        onClick={() => resolveCourse(c.id, 'rejected')}
                        className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {instructors.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold">Instructor applications</h2>
              <div className="mt-3 space-y-3">
                {instructors.map((u) => (
                  <div key={u.id} className="flex items-center justify-between rounded-xl2 border border-line bg-card p-4 shadow-card">
                    <div>
                      <p className="text-sm font-semibold">{u.name}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => resolveInstructor(u.id, 'approved')}
                        className="flex items-center gap-1.5 rounded-full bg-sage-light px-3 py-1.5 text-xs font-semibold text-sage-dark hover:bg-sage/20"
                      >
                        <CheckCircle2 size={14} /> Approve
                      </button>
                      <button
                        onClick={() => resolveInstructor(u.id, 'rejected')}
                        className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resolved.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Recently resolved</h2>
              <ul className="mt-2 space-y-1 text-sm text-ink/60">
                {resolved.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
