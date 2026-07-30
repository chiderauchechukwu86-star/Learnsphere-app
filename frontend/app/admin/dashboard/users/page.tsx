'use client';

import { useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings, Search, CheckCircle2,
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

const initialUsers = [
  { id: 'u1', name: 'Jordan Ade', email: 'student@learnsphere.dev', role: 'student', approved: true },
  { id: 'u2', name: 'Amara Chukwu', email: 'instructor@learnsphere.dev', role: 'instructor', approved: true },
  { id: 'u3', name: 'Platform Admin', email: 'admin@learnsphere.dev', role: 'admin', approved: true },
  { id: 'u4', name: 'Kwame Asante', email: 'kwame@example.com', role: 'instructor', approved: false },
  { id: 'u5', name: 'Chidinma Obi', email: 'chidinma@example.com', role: 'student', approved: true },
];

const roleStyles: Record<string, string> = {
  student: 'bg-brand-light text-brand-dark',
  instructor: 'bg-amber-light text-amber-dark',
  admin: 'bg-sage-light text-sage-dark',
};

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'instructor' | 'admin'>('all');

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          (roleFilter === 'all' || u.role === roleFilter) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [users, query, roleFilter],
  );

  const approve = (id: string) =>
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, approved: true } : u)));

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">Users</h1>
          <p className="mt-1 text-sm text-muted">{users.length} total accounts</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 min-w-[200px]">
              <Search size={15} className="text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex gap-1.5">
              {(['all', 'student', 'instructor', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    roleFilter === r ? 'border-brand bg-brand-light text-brand-dark' : 'border-line text-ink/70'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${roleStyles[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink/70">
                      {u.role !== 'instructor' ? '—' : u.approved ? 'Approved' : 'Pending'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {u.role === 'instructor' && !u.approved && (
                        <button
                          onClick={() => approve(u.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-sage-dark hover:text-sage"
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-sm text-muted">
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
