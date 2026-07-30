'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Award, Lock } from 'lucide-react';
import QuizEngine from '@/components/QuizEngine';
import { mockCourses } from '@/lib/mock-data';
import { allLessonsOf } from '@/lib/course-content';
import { courseProgressPercent } from '@/lib/progress';

/** The course final exam pulls one representative question from every lesson quiz. */
export default function CourseFinalExamPage() {
  const params = useParams<{ slug: string }>();
  const course = mockCourses.find((c) => c.slug === params.slug);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (course) setPercent(courseProgressPercent(course));
  }, [course]);

  if (!course) return notFound();

  const lessons = allLessonsOf(course);
  const finalQuestions = lessons.map((l) => l.quiz.questions[0]);
  const unlocked = percent === 100;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white px-6 py-3">
        <Link href={`/courses/${course.slug}/learn`} className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink">
          <ArrowLeft size={16} /> Back to course
        </Link>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{course.title}</p>
        <h1 className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold">
          <Award size={22} className="text-amber-dark" /> Course Final Exam
        </h1>
        <p className="mt-1 text-sm text-muted">
          One question drawn from every lesson in this course — a cumulative check before you call it complete.
        </p>

        <div className="mt-8">
          {unlocked ? (
            <QuizEngine title="Final Exam" questions={finalQuestions} passingScore={70} />
          ) : (
            <div className="flex items-center gap-3 rounded-xl2 border border-line bg-card p-6 text-sm text-ink/70 shadow-card">
              <Lock size={18} className="shrink-0 text-muted" />
              Finish every lesson and its quiz first — you're at {percent}% through the course.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
