import { LayoutDashboard, Users, DollarSign, Star } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import { mockCourses } from '@/lib/mock-data';

const items = [
  { label: 'Overview', href: '/instructor/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Students', href: '/instructor/dashboard/students', icon: 'Users' as const },
  { label: 'Revenue', href: '/instructor/dashboard/revenue', icon: 'DollarSign' as const },
  { label: 'Reviews', href: '/instructor/dashboard/reviews', icon: 'Star' as const },
];

const monthly = [4200, 5100, 4800, 6300, 7100, 6800, 8200];
const maxMonthly = Math.max(...monthly);

export default function RevenuePage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Instructor" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">Revenue</h1>
          <p className="mt-1 text-sm text-muted">Last 7 months, across all courses</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <StatCard label="This month" value="$8,200" icon={DollarSign} accent="sage" />
            <StatCard label="Total (all time)" value="$48.2k" icon={DollarSign} accent="brand" />
            <StatCard label="Avg. per student" value="$21" icon={DollarSign} accent="amber" />
          </div>

          <div className="mt-8 rounded-xl2 border border-line bg-card p-6 shadow-card">
            <div className="flex h-40 items-end gap-3">
              {monthly.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-brand transition-all"
                    style={{ height: `${(v / maxMonthly) * 100}%` }}
                  />
                  <span className="font-mono text-[11px] text-muted">M{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Students</th>
                  <th className="px-5 py-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {mockCourses.map((c) => (
                  <tr key={c._id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium">{c.title}</td>
                    <td className="px-5 py-3 font-mono">{c.enrollmentCount.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono">
                      ${((c.priceCents / 100) * c.enrollmentCount * 0.7).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
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
