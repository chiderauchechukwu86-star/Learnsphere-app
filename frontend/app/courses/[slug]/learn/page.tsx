'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { BookOpen, FileQuestion, CheckCircle2, Lock, ArrowLeft, PartyPopper } from 'lucide-react';
import LessonReader from '@/components/LessonReader';
import QuizEngine from '@/components/QuizEngine';
import CourseProgressBar from '@/components/CourseProgressBar';
import { mockCourses } from '@/lib/mock-data';
import { allLessonsOf } from '@/lib/course-content';
import {
  isLessonComplete,
  isLessonUnlocked,
  markLessonComplete,
  courseProgressPercent,
  findLessonIndex,
} from '@/lib/progress';

export default function CourseLearnPage() {
  const params = useParams<{ slug: string }>();
  const course = mockCourses.find((c) => c.slug === params.slug);
  const allLessons = course ? allLessonsOf(course) : [];

  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<'reading' | 'quiz'>('reading');
  const [percent, setPercent] = useState(0);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    if (course && !activeLessonId) {
      setActiveLessonId(allLessons[0]?.id);
    }
  }, [course]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (course) setPercent(courseProgressPercent(course));
  }, [course, refreshTick]);

  if (!course) return notFound();

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeIndex = activeLesson ? findLessonIndex(course, activeLesson.id) : 0;
  const courseComplete = percent === 100;

  const goToLesson = (lessonId: string, lessonIndex: number) => {
    if (!isLessonUnlocked(course, lessonIndex)) return;
    setActiveLessonId(lessonId);
    setMode('reading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (passed: boolean) => {
    if (!activeLesson) return;
    if (passed) {
      markLessonComplete(course.slug, activeLesson.id);
      setRefreshTick((t) => t + 1);
    }
  };

  const advanceToNextLesson = () => {
    const nextLesson = allLessons[activeIndex + 1];
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      setMode('reading');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b border-line bg-white px-6 py-3.5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <Link href={`/courses/${course.slug}`} className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink">
            <ArrowLeft size={16} /> <span className="hidden sm:inline">{course.title}</span>
          </Link>
          <div className="w-full max-w-xs">
            <CourseProgressBar percent={percent} label="Course progress" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8 lg:flex-row">
        <main className="min-w-0 flex-1">
          {courseComplete && (
            <div className="mb-6 flex items-center gap-3 rounded-xl2 border border-sage bg-sage-light px-5 py-4">
              <PartyPopper size={22} className="shrink-0 text-sage-dark" />
              <p className="text-sm font-medium text-sage-dark">
                You've completed every lesson and quiz in {course.title}. Nice work!
              </p>
            </div>
          )}

          {activeLesson && mode === 'reading' && (
            <>
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                <BookOpen size={14} /> Lesson {activeIndex + 1} of {allLessons.length}
              </div>
              <LessonReader lesson={activeLesson} onReachEnd={() => setMode('quiz')} />
            </>
          )}

          {activeLesson && mode === 'quiz' && (
            <div>
              <button
                onClick={() => setMode('reading')}
                className="mb-4 text-sm font-medium text-ink/60 hover:text-ink"
              >
                ← Back to lesson
              </button>
              <QuizEngine
                title={activeLesson.quiz.title}
                questions={activeLesson.quiz.questions}
                passingScore={activeLesson.quiz.passingScore}
                onComplete={handleQuizComplete}
              />
              {isLessonComplete(course.slug, activeLesson.id) && activeIndex + 1 < allLessons.length && (
                <button
                  onClick={advanceToNextLesson}
                  className="mt-5 w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/85"
                >
                  Continue to next lesson →
                </button>
              )}
            </div>
          )}
        </main>

        <aside className="w-full shrink-0 lg:w-80">
          <div className="rounded-xl2 border border-line bg-white p-4 shadow-card lg:sticky lg:top-24">
            <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted">Curriculum</h2>
            <ul className="mt-3 space-y-1">
              {allLessons.map((lesson, i) => {
                const done = isLessonComplete(course.slug, lesson.id);
                const unlocked = isLessonUnlocked(course, i);
                const active = lesson.id === activeLesson?.id;
                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => goToLesson(lesson.id, i)}
                      disabled={!unlocked}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        active
                          ? 'bg-brand-light text-brand-dark'
                          : unlocked
                          ? 'text-ink/70 hover:bg-paper'
                          : 'cursor-not-allowed text-ink/30'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 size={15} className="shrink-0 text-sage" />
                      ) : !unlocked ? (
                        <Lock size={14} className="shrink-0" />
                      ) : (
                        <FileQuestion size={15} className="shrink-0" />
                      )}
                      <span className="flex-1">{lesson.title}</span>
                      <span className="shrink-0 font-mono text-[10px] text-muted">{lesson.pages.length}p</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
