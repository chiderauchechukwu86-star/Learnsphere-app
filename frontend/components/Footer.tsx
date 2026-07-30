import Link from 'next/link';

const columns = [
  {
    title: 'Learn',
    links: [
      { label: 'Explore courses', href: '/courses' },
      { label: 'Certificates', href: '/certificates' },
      { label: 'Student dashboard', href: '/student/dashboard' },
    ],
  },
  {
    title: 'Teach',
    links: [
      { label: 'Instructor dashboard', href: '/instructor/dashboard' },
      { label: 'Course guidelines', href: '/#' },
      { label: 'Revenue & payouts', href: '/#' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Admin console', href: '/admin/dashboard' },
      { label: 'Verify a certificate', href: '/certificates/verify/example' },
      { label: 'Status', href: '/#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white">
                LS
              </span>
              <span className="font-display text-lg font-semibold">LearnSphere</span>
            </div>
            <p className="mt-3 max-w-[22ch] text-sm text-muted">
              A calmer, more structured way to learn and to teach.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} LearnSphere. Built as a portfolio project.</span>
          <span className="font-mono">v2.0 · MongoDB Edition</span>
        </div>
      </div>
    </footer>
  );
}
