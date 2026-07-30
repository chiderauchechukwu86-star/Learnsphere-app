import Link from 'next/link';
import { Star, Users } from 'lucide-react';
import { Course } from '@/lib/types';

function formatPrice(cents: number) {
  if (cents === 0) return 'Free';
  return `$${(cents / 100).toFixed(0)}`;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-light">
        {course.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.coverImageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold capitalize text-ink shadow-card">
          {course.difficulty}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">
          {course.category}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {course.title}
        </h3>
        {course.instructor && (
          <p className="text-sm text-muted">by {course.instructor.fullName}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-1 font-medium text-ink">
              <Star size={14} className="fill-amber text-amber" />
              {course.averageRating || 'New'}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {course.enrollmentCount.toLocaleString()}
            </span>
          </div>
          <span className="font-mono text-sm font-semibold text-ink">
            {formatPrice(course.priceCents)}
          </span>
        </div>
      </div>
    </Link>
  );
}
