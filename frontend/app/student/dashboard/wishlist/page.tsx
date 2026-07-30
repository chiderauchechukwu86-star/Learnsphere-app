'use client';

import { useState } from 'react';
import { LayoutDashboard, BookOpen, Award, Heart, Bell, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import CourseCard from '@/components/CourseCard';
import { mockCourses } from '@/lib/mock-data';

const items = [
  { label: 'Overview', href: '/student/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'My courses', href: '/student/dashboard/courses', icon: 'BookOpen' as const },
  { label: 'Certificates', href: '/certificates', icon: 'Award' as const },
  { label: 'Wishlist', href: '/student/dashboard/wishlist', icon: 'Heart' as const },
  { label: 'Notifications', href: '/student/dashboard/notifications', icon: 'Bell' as const },
];

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState(mockCourses.map((c) => c._id));
  const wishlisted = mockCourses.filter((c) => wishlistIds.includes(c._id));

  const remove = (id: string) => setWishlistIds((ids) => ids.filter((i) => i !== id));

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Student" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-semibold">Wishlist</h1>
          <p className="mt-1 text-sm text-muted">{wishlisted.length} saved courses</p>

          {wishlisted.length === 0 ? (
            <div className="mt-8 rounded-xl2 border border-dashed border-line py-16 text-center">
              <Heart className="mx-auto text-muted" size={26} />
              <p className="mt-3 text-sm text-muted">Nothing saved yet — browse courses and tap the heart icon.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {wishlisted.map((course) => (
                <div key={course._id} className="relative">
                  <button
                    onClick={() => remove(course._id)}
                    aria-label={`Remove ${course.title} from wishlist`}
                    className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-ink shadow-card hover:bg-red-50 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
