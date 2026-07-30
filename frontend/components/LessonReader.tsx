'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Lesson } from '@/lib/types';
import NetworkDiagram from './diagrams/NetworkDiagram';

export default function LessonReader({
  lesson,
  onReachEnd,
}: {
  lesson: Lesson;
  onReachEnd: () => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const page = lesson.pages[pageIndex];
  const isLast = pageIndex === lesson.pages.length - 1;

  const goNext = () => {
    if (isLast) {
      onReachEnd();
    } else {
      setPageIndex((i) => Math.min(i + 1, lesson.pages.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const goPrev = () => {
    setPageIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="rounded-xl2 border border-line bg-card shadow-card">
      {/* Page progress */}
      <div className="flex items-center gap-3 border-b border-line px-6 py-4">
        <span className="font-mono text-xs font-semibold text-muted">
          Page {pageIndex + 1} of {lesson.pages.length}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${((pageIndex + 1) / lesson.pages.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-[28px]">{page.heading}</h2>

        <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/80">
          {page.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {page.bullets && (
          <ul className="mt-5 space-y-2">
            {page.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {page.diagram && (
          <div className="mt-6">
            <NetworkDiagram id={page.diagram} caption={page.diagramCaption} />
          </div>
        )}

        {page.callout && (
          <div className="mt-6 flex gap-3 rounded-xl border border-amber/40 bg-amber-light px-4 py-3.5">
            <Info size={18} className="mt-0.5 shrink-0 text-amber-dark" />
            <p className="text-sm text-ink/80">
              <span className="font-semibold text-amber-dark">{page.callout.label}: </span>
              {page.callout.text}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-line px-6 py-4 sm:px-10">
        <button
          onClick={goPrev}
          disabled={pageIndex === 0}
          className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          onClick={goNext}
          className="flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          {isLast ? 'Take the lesson quiz' : 'Next page'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
