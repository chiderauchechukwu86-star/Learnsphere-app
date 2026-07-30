import { LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings } from 'lucide-react';
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

const logs = [
  { id: 'l1', actor: 'admin@learnsphere.dev', action: 'Approved course', target: 'MongoDB for Backend Engineers', at: '2026-07-10 14:22' },
  { id: 'l2', actor: 'admin@learnsphere.dev', action: 'Rejected course', target: 'Blockchain Basics', at: '2026-07-09 09:03' },
  { id: 'l3', actor: 'instructor@learnsphere.dev', action: 'Published course', target: 'React for Product Teams', at: '2026-07-08 17:45' },
  { id: 'l4', actor: 'admin@learnsphere.dev', action: 'Approved instructor', target: 'Amara Chukwu', at: '2026-07-05 11:12' },
  { id: 'l5', actor: 'student@learnsphere.dev', action: 'Earned certificate', target: 'MongoDB for Backend Engineers', at: '2026-07-01 08:30' },
];

export default function AuditLogsPage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">Audit logs</h1>
          <p className="mt-1 text-sm text-muted">A record of platform-affecting actions.</p>

          <div className="mt-6 overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Actor</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                  <th className="px-5 py-3 font-medium">Target</th>
                  <th className="px-5 py-3 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-mono text-xs text-ink/70">{l.actor}</td>
                    <td className="px-5 py-3 font-medium">{l.action}</td>
                    <td className="px-5 py-3 text-ink/70">{l.target}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted">{l.at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
