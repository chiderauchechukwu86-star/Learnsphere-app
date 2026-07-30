import { LayoutDashboard, Users, DollarSign, Star, Mail } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { mockCourses } from '@/lib/mock-data';

const items = [
  { label: 'Overview', href: '/instructor/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Students', href: '/instructor/dashboard/students', icon: 'Users' as const },
  { label: 'Revenue', href: '/instructor/dashboard/revenue', icon: 'DollarSign' as const },
  { label: 'Reviews', href: '/instructor/dashboard/reviews', icon: 'Star' as const },
];

const students = [
  { name: 'Chidinma Obi', email: 'chidinma@example.com', course: mockCourses[0].title, progress: 82 },
  { name: 'Tunde Bakare', email: 'tunde@example.com', course: mockCourses[0].title, progress: 45 },
  { name: 'Wale Adeyemi', email: 'wale@example.com', course: mockCourses[1].title, progress: 100 },
  { name: 'Ifeoma Nnaji', email: 'ifeoma@example.com', course: mockCourses[1].title, progress: 12 },
];

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Instructor" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">Students</h1>
          <p className="mt-1 text-sm text-muted">{students.length} enrolled across your courses</p>

          <div className="mt-6 overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.email} className="border-b border-line last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted">{s.email}</p>
                    </td>
                    <td className="px-5 py-3 text-ink/70">{s.course}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
                          <div className="h-full rounded-full bg-sage" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="font-mono text-xs text-muted">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1 text-brand hover:text-brand-dark">
                        <Mail size={14} /> Message
                      </a>
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
