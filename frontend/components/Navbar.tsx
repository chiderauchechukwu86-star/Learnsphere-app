'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { useCurrentUser } from '@/lib/use-current-user';
import { logout } from '@/lib/auth';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Navbar() {
  const { user, ready } = useCurrentUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white">
            LS
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">LearnSphere</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/80 md:flex">
          <Link href="/courses" className="hover:text-ink">Explore courses</Link>
          <Link href="/#instructors" className="hover:text-ink">Teach on LearnSphere</Link>
          <Link href="/#pricing" className="hover:text-ink">Pricing</Link>
        </nav>

        {!ready ? (
          <div className="h-9 w-24" />
        ) : user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium hover:border-brand/40"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                {initials(user.fullName)}
              </span>
              {user.fullName.split(' ')[0]}
              <ChevronDown size={14} className={`transition ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl2 border border-line bg-white shadow-lift">
                <div className="border-b border-line px-4 py-3">
                  <p className="truncate text-sm font-semibold text-ink">{user.fullName}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
                <Link
                  href={`/${user.role}/dashboard`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink/80 hover:bg-paper"
                >
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} /> Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm font-medium text-ink/80 hover:text-ink sm:block">
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-dark"
            >
              Start learning
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
