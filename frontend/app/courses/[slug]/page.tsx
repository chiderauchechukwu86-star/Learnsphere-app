import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Users, FileText, FileQuestion, CheckCircle2, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockCourses } from '@/lib/mock-data';

function formatPrice(cents: number) {
  return cents === 0 ? 'Free' : `$${(cents / 100).toFixed(0)}`;
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = mockCourses.find((c) => c.slug === params.slug);
  if (!course) return notFound();

  const totalLessons = course.curriculum.reduce((n, s) => n + s.lessons.length, 0);
  const totalPages = course.curriculum.reduce(
    (n, s) => n + s.lessons.reduce((m, l) => m + l.pages.length, 0),
    0,
  );

  return (
    <div>
      <Navbar />

      <section className="border-b border-line bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-amber">{course.category}</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">{course.title}</h1>
            <p className="mt-3 max-w-xl text-white/70">{course.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/80">
              <span className="flex items-center gap-1.5 font-medium text-amber">
                <Star size={15} className="fill-amber" /> {course.averageRating} ({course.reviewCount} reviews)
              </span>
              <span className="flex items-center gap-1.5"><Users size={15} /> {course.enrollmentCount.toLocaleString()} students</span>
              <span className="capitalize">{course.difficulty}</span>
            </div>
            <p className="mt-4 text-sm text-white/60">Created by {course.instructor?.fullName}</p>
          </div>

          <div className="h-fit rounded-xl2 border border-white/10 bg-white p-5 text-ink shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.coverImageUrl} alt="" className="aspect-video w-full rounded-lg object-cover" />
            <p className="mt-4 font-mono text-3xl font-semibold">{formatPrice(course.priceCents)}</p>
            <Link
              href={`/courses/${course.slug}/learn`}
              className="mt-4 block rounded-full bg-brand py-3 text-center text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Start course
            </Link>
            <p className="mt-3 text-center text-xs text-muted">Text lessons + quizzes · self-paced</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl gap-10 px-6 py-12 md:grid md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-xl font-semibold">Curriculum</h2>
          <div className="mt-4 space-y-3">
            {course.curriculum.map((section) => (
              <div key={section.id} className="overflow-hidden rounded-xl2 border border-line">
                <div className="bg-paper px-4 py-3 text-sm font-semibold">{section.title}</div>
                <ul className="divide-y divide-line">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center justify-between px-4 py-3 text-sm">
                      <span className="flex items-center gap-2 text-ink/80">
                        <FileText size={15} />
                        {lesson.title}
                      </span>
                      <span className="flex items-center gap-3 text-xs text-muted">
                        {lesson.isPreview && <span className="font-semibold text-brand">Preview</span>}
                        <span className="flex items-center gap-1"><FileText size={12} /> {lesson.pages.length} pages</span>
                        <span className="flex items-center gap-1"><FileQuestion size={12} /> {lesson.quiz.questions.length}-question quiz</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {course.curriculum.length === 0 && (
              <p className="text-sm text-muted">Curriculum coming soon.</p>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl2 border border-line bg-paper px-4 py-3 text-sm text-ink/70">
            <Award size={16} className="text-amber-dark" />
            Finish every lesson to unlock the course final exam and your certificate.
          </div>

          <h2 className="mt-10 font-display text-xl font-semibold">About this course</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{course.description}</p>
        </div>

        <aside className="mt-10 h-fit rounded-xl2 border border-line bg-card p-5 shadow-card md:mt-0">
          <h3 className="font-display font-semibold">This course includes</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-sage" /> {totalLessons} text-based lessons, {totalPages} pages</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-sage" /> A quiz after every lesson</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-sage" /> Diagrams for every core concept</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-sage" /> Progress tracking &amp; course final exam</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-sage" /> Certificate of completion</li>
          </ul>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
