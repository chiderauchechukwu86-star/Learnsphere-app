import { LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings, TrendingUp } from 'lucide-react';
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

const signupsByWeek = [820, 910, 875, 1020, 1180, 1240, 1350];
const maxSignups = Math.max(...signupsByWeek);

const categoryShare = [
  { label: 'Web Development', pct: 38 },
  { label: 'Databases', pct: 22 },
  { label: 'Design', pct: 18 },
  { label: 'Data Science', pct: 14 },
  { label: 'Mobile', pct: 8 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">Platform analytics</h1>
          <p className="mt-1 text-sm text-muted">Last 7 weeks</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <StatCard label="New signups (7d)" value="1,350" icon={TrendingUp} accent="sage" />
            <StatCard label="Course completion rate" value="64%" icon={BarChart3} accent="brand" />
            <StatCard label="Avg. session length" value="24 min" icon={BarChart3} accent="amber" />
          </div>

          <div className="mt-8 rounded-xl2 border border-line bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Weekly signups</h2>
            <div className="mt-5 flex h-40 items-end gap-3">
              {signupsByWeek.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-brand transition-all"
                    style={{ height: `${(v / maxSignups) * 100}%` }}
                  />
                  <span className="font-mono text-[11px] text-muted">W{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl2 border border-line bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Enrollment by category</h2>
            <div className="mt-5 space-y-3">
              {categoryShare.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/80">{c.label}</span>
                    <span className="font-mono text-muted">{c.pct}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-line">
                    <div className="h-full rounded-full bg-amber" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
