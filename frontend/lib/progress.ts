'use client';

import { Course, Lesson } from './types';
import { allLessonsOf } from './course-content';

const KEY_PREFIX = 'learnsphere:progress:';

interface CourseProgress {
  completedLessonIds: string[];
}

function readProgress(courseSlug: string): CourseProgress {
  if (typeof window === 'undefined') return { completedLessonIds: [] };
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + courseSlug);
    if (!raw) return { completedLessonIds: [] };
    const parsed = JSON.parse(raw);
    return { completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [] };
  } catch {
    return { completedLessonIds: [] };
  }
}

function writeProgress(courseSlug: string, progress: CourseProgress) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY_PREFIX + courseSlug, JSON.stringify(progress));
}

export function isLessonComplete(courseSlug: string, lessonId: string): boolean {
  return readProgress(courseSlug).completedLessonIds.includes(lessonId);
}

export function markLessonComplete(courseSlug: string, lessonId: string) {
  const progress = readProgress(courseSlug);
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
    writeProgress(courseSlug, progress);
  }
}

/** A lesson is unlocked if it's the first lesson, or the previous lesson is complete. */
export function isLessonUnlocked(course: Course, lessonIndex: number): boolean {
  if (lessonIndex === 0) return true;
  const lessons = allLessonsOf(course);
  const prev = lessons[lessonIndex - 1];
  if (!prev) return true;
  return isLessonComplete(course.slug, prev.id);
}

export function courseProgressPercent(course: Course): number {
  const lessons = allLessonsOf(course);
  if (lessons.length === 0) return 0;
  const progress = readProgress(course.slug);
  const done = lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
  return Math.round((done / lessons.length) * 100);
}

export function completedLessonCount(course: Course): number {
  const lessons = allLessonsOf(course);
  const progress = readProgress(course.slug);
  return lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
}

export function findLessonIndex(course: Course, lessonId: string): number {
  return allLessonsOf(course).findIndex((l) => l.id === lessonId);
}

export function nextIncompleteLesson(course: Course): Lesson | undefined {
  const lessons = allLessonsOf(course);
  const progress = readProgress(course.slug);
  return lessons.find((l) => !progress.completedLessonIds.includes(l.id)) ?? lessons[lessons.length - 1];
}
