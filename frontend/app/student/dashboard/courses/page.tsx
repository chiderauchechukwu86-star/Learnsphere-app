import { LayoutDashboard, BookOpen, Award, Heart, Bell } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ProgressRing from '@/components/ProgressRing';
import { mockEnrollments } from '@/lib/mock-data';
import { Course } from '@/lib/types';

const items = [
  { label: 'Overview', href: '/student/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'My courses', href: '/student/dashboard/courses', icon: 'BookOpen' as const },
  { label: 'Certificates', href: '/certificates', icon: 'Award' as const },
  { label: 'Wishlist', href: '/student/dashboard/wishlist', icon: 'Heart' as const },
  { label: 'Notifications', href: '/student/dashboard/notifications', icon: 'Bell' as const },
];

export default function MyCoursesPage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Student" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">My courses</h1>
          <p className="mt-1 text-sm text-muted">{mockEnrollments.length} enrollments</p>

          <div className="mt-8 space-y-4">
            {mockEnrollments.map((en) => {
              const course = en.courseId as Course;
              return (
                <div
                  key={en._id}
                  className="flex flex-col gap-4 rounded-xl2 border border-line bg-card p-5 shadow-card sm:flex-row sm:items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.coverImageUrl} alt="" className="h-20 w-32 rounded-lg object-cover" />
                  <div className="flex-1">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      en.status === 'completed' ? 'bg-sage-light text-sage-dark' : 'bg-brand-light text-brand-dark'
                    }`}>
                      {en.status === 'completed' ? 'Completed' : 'In progress'}
                    </span>
                    <p className="mt-2 font-display text-lg font-semibold">{course.title}</p>
                    <p className="text-sm text-muted">{course.instructor?.fullName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ProgressRing percent={en.percentComplete} size={52} stroke={5} />
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                    >
                      {en.status === 'completed' ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
