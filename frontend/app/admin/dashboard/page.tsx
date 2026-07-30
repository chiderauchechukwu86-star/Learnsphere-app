import {
  LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings, CheckCircle2, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';

const items = [
  { label: 'Overview', href: '/admin/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Users', href: '/admin/dashboard/users', icon: 'Users' as const },
  { label: 'Approvals', href: '/admin/dashboard/approvals', icon: 'ShieldCheck' as const },
  { label: 'Analytics', href: '/admin/dashboard/analytics', icon: 'BarChart3' as const },
  { label: 'Announcements', href: '/admin/dashboard/announcements', icon: 'Megaphone' as const },
  { label: 'Audit logs', href: '/admin/dashboard/audit-logs', icon: 'FileClock' as const },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: 'Settings' as const },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />

      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-2xl font-semibold">Platform overview</h1>
          <p className="mt-1 text-sm text-muted">Everything that needs a decision, in one place.</p>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total users" value="14,982" icon={Users} accent="brand" />
            <StatCard label="Platform revenue" value="$212k" icon={BarChart3} accent="sage" />
            <StatCard label="Pending approvals" value="3" icon={ShieldCheck} accent="amber" />
            <StatCard label="Published courses" value="340" icon={CheckCircle2} accent="brand" />
          </div>

          <section className="mt-10 rounded-xl2 border border-line bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold">3 items need your review</h2>
                <p className="mt-1 text-sm text-muted">2 courses and 1 instructor application are pending.</p>
              </div>
              <Link
                href="/admin/dashboard/approvals"
                className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Review now <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
