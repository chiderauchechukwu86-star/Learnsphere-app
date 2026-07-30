'use client';

import { useMemo, useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { mockCourses } from '@/lib/mock-data';
import { Course } from '@/lib/types';

type FilterKey = 'all' | 'free' | 'paid' | 'beginner' | 'intermediate' | 'advanced';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All levels' },
  { key: 'free', label: 'Free' },
  { key: 'paid', label: 'Paid' },
  { key: 'beginner', label: 'Beginner' },
  { key: 'intermediate', label: 'Intermediate' },
  { key: 'advanced', label: 'Advanced' },
];

function matchesFilter(course: Course, filter: FilterKey): boolean {
  switch (filter) {
    case 'free':
      return course.priceCents === 0;
    case 'paid':
      return course.priceCents > 0;
    case 'beginner':
    case 'intermediate':
    case 'advanced':
      return course.difficulty === filter;
    case 'all':
    default:
      return true;
  }
}

function matchesQuery(course: Course, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return (
    course.title.toLowerCase().includes(q) ||
    course.category.toLowerCase().includes(q) ||
    Boolean(course.instructor?.fullName.toLowerCase().includes(q))
  );
}

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Swap `mockCourses` for a live `api.get<{ items: Course[] }>('/courses', { q: query, ... })`
  // call once the backend is connected — filtering logic below stays the same shape.
  const results = useMemo(
    () => mockCourses.filter((c) => matchesFilter(c, activeFilter) && matchesQuery(c, query)),
    [query, activeFilter],
  );

  return (
    <div>
      <Navbar />
      <section className="border-b border-line bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight">Explore courses</h1>
          <p className="mt-2 text-muted">Search by title, instructor, or category.</p>

          <div className="mt-6 flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-3 focus-within:border-brand">
            <Search size={18} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “VLANs” or “routing”…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeFilter === f.key
                    ? 'border-brand bg-brand-light text-brand-dark'
                    : 'border-line text-ink/70 hover:border-brand/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-sm text-muted">
            {results.length} {results.length === 1 ? 'course' : 'courses'} found
          </p>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-line py-16 text-center">
              <SearchX className="text-muted" size={26} />
              <p className="text-sm text-muted">
                No courses match &ldquo;{query || filters.find((f) => f.key === activeFilter)?.label}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveFilter('all');
                }}
                className="text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
