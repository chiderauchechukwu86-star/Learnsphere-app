import Link from 'next/link';
import {
  BookOpenText, FileCheck2, ShieldCheck, Search, Star, GraduationCap,
  PenSquare, Users2, ArrowRight, CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { mockCourses } from '@/lib/mock-data';

const roleTabs = [
  {
    role: 'Student',
    icon: GraduationCap,
    headline: 'Follow a curriculum that stays out of your way',
    points: ['Resume exactly where you left off', 'Paginated text lessons with diagrams', 'A certificate the moment you finish'],
  },
  {
    role: 'Instructor',
    icon: PenSquare,
    headline: 'Publish a course like you mean it',
    points: ['Drag-and-drop curriculum builder', 'Quiz authoring with auto-grading', 'Revenue and completion analytics'],
  },
  {
    role: 'Admin',
    icon: Users2,
    headline: 'Run the platform, not just the spreadsheet',
    points: ['Instructor and course approval queue', 'Platform-wide analytics', 'Full audit log'],
  },
];

const features = [
  { icon: BookOpenText, title: 'Text-based lessons', body: 'Paginated reading with diagrams for every core concept — no video required.' },
  { icon: FileCheck2, title: 'A quiz after every lesson', body: 'Auto-graded, multiple choice, with a passing score gate before you move on.' },
  { icon: ShieldCheck, title: 'Verifiable certificates', body: 'Every certificate ships with a QR code and a digital signature.' },
  { icon: Search, title: 'Real search & filters', body: 'By price, level, category, and rating — sorted your way.' },
];

export default function HomePage() {
  return (
    <div>
      <Navbar />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
              Spec → Product
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
              Learn without limits.
              <br />
              <span className="italic text-brand">Teach</span> without friction.
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              LearnSphere is a complete learning platform — courses, quizzes,
              certificates, and analytics — built for students, instructors,
              and the admins who keep it all honest.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-brand-dark"
              >
                Start learning free <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand/40"
              >
                Explore courses
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 font-mono text-sm">
              <div>
                <p className="font-semibold text-ink">12,400+</p>
                <p className="text-xs text-muted">active learners</p>
              </div>
              <div>
                <p className="font-semibold text-ink">340</p>
                <p className="text-xs text-muted">published courses</p>
              </div>
              <div>
                <p className="font-semibold text-ink">4.8 / 5</p>
                <p className="text-xs text-muted">average rating</p>
              </div>
            </div>
          </div>

          {/* Signature element: the curriculum stack — a course rendered as
              physical, overlapping syllabus cards rather than a dashboard screenshot. */}
          <div className="relative mx-auto hidden h-[420px] w-full max-w-sm md:block" aria-hidden="true">
            {[
              { rotate: '-6deg', top: '0px', title: 'Networking Fundamentals', tone: 'bg-white', z: 10 },
              { rotate: '3deg', top: '90px', title: 'Switching & VLANs', tone: 'bg-white', z: 20 },
              { rotate: '-2deg', top: '180px', title: 'Network Security Basics', tone: 'bg-white', z: 30 },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`absolute left-0 w-full rounded-xl2 border border-line ${card.tone} p-5 shadow-lift animate-rise`}
                style={{ top: card.top, transform: `rotate(${card.rotate})`, zIndex: card.z, animationDelay: `${i * 120}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{card.title}</p>
                <div className="mt-3 space-y-2">
                  {[0, 1, 2].map((l) => (
                    <div key={l} className="flex items-center gap-2 text-sm text-ink/80">
                      <CheckCircle2
                        size={15}
                        className={l <= i ? 'text-sage' : 'text-line'}
                      />
                      <span className="h-2 flex-1 rounded-full bg-paper" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ROLES ---------------- */}
      <section id="instructors" className="border-b border-line bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-lg font-display text-3xl font-semibold tracking-tight">
            One platform, three very different jobs to do.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {roleTabs.map((r) => (
              <div key={r.role} className="rounded-xl2 border border-line p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand-dark">
                  <r.icon size={19} />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">{r.role}</p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{r.headline}</h3>
                <ul className="mt-4 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-ink/70">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sage" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="border-b border-line py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-lg font-display text-3xl font-semibold tracking-tight">
            Everything a modern course needs, none of the busywork.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl2 border border-line bg-card p-6 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-light text-amber-dark">
                  <f.icon size={19} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-ink/70">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COURSE SHOWCASE ---------------- */}
      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Popular right now</h2>
            <Link href="/courses" className="flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark">
              Browse all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIAL BAND ---------------- */}
      <section className="border-y border-line bg-ink py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <div className="flex gap-1 text-amber">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-amber" />)}
          </div>
          <p className="max-w-2xl font-display text-2xl italic leading-snug">
            &ldquo;The curriculum builder made publishing feel like writing an
            outline, not fighting a CMS.&rdquo;
          </p>
          <p className="text-sm text-white/60">— Amara Chukwu, Instructor</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
