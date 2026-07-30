'use client';

import {
  LayoutDashboard, BookOpen, Award, Heart, Bell, Calendar, Clock, Flame, CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import ProgressRing from '@/components/ProgressRing';
import CourseCard from '@/components/CourseCard';
import { mockEnrollments, mockCourses } from '@/lib/mock-data';
import { Course } from '@/lib/types';
import { courseProgressPercent } from '@/lib/progress';

const items = [
  { label: 'Overview', href: '/student/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'My courses', href: '/student/dashboard/courses', icon: 'BookOpen' as const },
  { label: 'Certificates', href: '/certificates', icon: 'Award' as const },
  { label: 'Wishlist', href: '/student/dashboard/wishlist', icon: 'Heart' as const },
  { label: 'Notifications', href: '/student/dashboard/notifications', icon: 'Bell' as const },
];

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Student" />

      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
              <p className="mt-1 text-sm text-muted">You&apos;re on a 6-day learning streak — keep it going.</p>
            </div>
            <Link
              href="/courses"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Find your next course
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Hours learned" value="42.5" icon={Clock} accent="brand" />
            <StatCard label="Lessons completed" value="118" icon={CheckCircle2} accent="sage" />
            <StatCard label="Learning streak" value="6 days" icon={Flame} accent="amber" />
            <StatCard label="Certificates earned" value="3" icon={Award} accent="brand" />
          </div>

          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Continue learning</h2>
              <Link href="/student/dashboard/courses" className="text-sm font-semibold text-brand hover:text-brand-dark">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {mockEnrollments.map((en) => {
                const course = en.courseId as Course;
                const percent = courseProgressPercent(course);
                return (
                  <Link
                    key={en._id}
                    href={`/courses/${course.slug}/learn`}
                    className="flex items-center gap-4 rounded-xl2 border border-line bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={course.coverImageUrl} alt="" className="h-16 w-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-display font-semibold">{course.title}</p>
                      <p className="text-sm text-muted">{course.instructor?.fullName}</p>
                    </div>
                    <ProgressRing percent={percent} size={48} stroke={5} />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Recommended for you</h2>
              <Link href="/courses" className="text-sm font-semibold text-brand hover:text-brand-dark">
                See all
              </Link>
            </div>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mockCourses.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          </section>

          <section className="mt-10 flex items-center gap-3 rounded-xl2 border border-line bg-card p-5 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand-dark">
              <Calendar size={18} />
            </div>
            <div>
              <p className="font-semibold">Pick up where you left off</p>
              <p className="text-sm text-muted">Every lesson quiz you pass unlocks the next one — no rush.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
