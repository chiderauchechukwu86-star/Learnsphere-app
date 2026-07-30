import {
  LayoutDashboard, Users, DollarSign, Star, PlusCircle, Pencil, BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import { mockCourses } from '@/lib/mock-data';

const items = [
  { label: 'Overview', href: '/instructor/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Students', href: '/instructor/dashboard/students', icon: 'Users' as const },
  { label: 'Revenue', href: '/instructor/dashboard/revenue', icon: 'DollarSign' as const },
  { label: 'Reviews', href: '/instructor/dashboard/reviews', icon: 'Star' as const },
];

const statusStyles: Record<string, string> = {
  published: 'bg-sage-light text-sage-dark',
  pending_review: 'bg-amber-light text-amber-dark',
  draft: 'bg-line/60 text-ink/60',
};

export default function InstructorDashboard() {
  const courses = mockCourses.map((c, i) => ({
    ...c,
    status: ['published', 'pending_review', 'draft'][i % 3],
  }));

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Instructor" />

      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold">Your courses</h1>
              <p className="mt-1 text-sm text-muted">Manage curriculum, track performance, and reply to reviews.</p>
            </div>
            <Link
              href="/instructor/dashboard/courses/new"
              className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              <PlusCircle size={16} /> New course
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
            <StatCard label="Total students" value="10,370" icon={Users} accent="brand" />
            <StatCard label="Total revenue" value="$48.2k" icon={DollarSign} accent="sage" />
            <StatCard label="Total courses" value="7" icon={BarChart3} accent="brand" />
            <StatCard label="Average rating" value="4.8" icon={Star} accent="amber" />
            <StatCard label="Active courses" value="5" icon={BarChart3} accent="sage" />
          </div>

          <section className="mt-10 overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Students</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c._id} className="border-b border-line last:border-0">
                    <td className="flex items-center gap-3 px-5 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.coverImageUrl} alt="" className="h-10 w-14 rounded-md object-cover" />
                      <span className="font-medium">{c.title}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[c.status]}`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono">{c.enrollmentCount.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono">{c.averageRating}</td>
                    <td className="px-5 py-3 text-right">
                      <Link href={`/courses/${c.slug}`} className="inline-flex items-center gap-1 text-brand hover:text-brand-dark">
                        <Pencil size={14} /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
