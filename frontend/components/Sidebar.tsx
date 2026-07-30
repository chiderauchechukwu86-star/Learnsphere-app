'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LogOut, LayoutDashboard, BookOpen, Award, Heart, Bell,
  Users, DollarSign, Star, ShieldCheck, BarChart3, Megaphone, FileClock, Settings,
} from 'lucide-react';
import { useCurrentUser } from '@/lib/use-current-user';
import { logout } from '@/lib/auth';

// Server Component pages can't pass component/function references as props
// into a Client Component (they aren't serializable across that boundary),
// so sidebar items reference icons by name and get resolved here instead.
const ICONS = {
  LayoutDashboard, BookOpen, Award, Heart, Bell,
  Users, DollarSign, Star, ShieldCheck, BarChart3, Megaphone, FileClock, Settings,
} as const;

export type IconName = keyof typeof ICONS;

export interface SidebarItem {
  label: string;
  href: string;
  icon: IconName;
  /** Only needed when a route should also highlight for nested paths (e.g. /courses/new). */
  matchPrefix?: boolean;
}

export default function Sidebar({
  items,
  roleLabel,
}: {
  items: SidebarItem[];
  roleLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useCurrentUser();

  const isActive = (item: SidebarItem) =>
    item.matchPrefix ? pathname.startsWith(item.href) : pathname === item.href;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-white md:flex md:flex-col">
      <div className="flex items-center gap-2 border-b border-line px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white">
          LS
        </span>
        <div>
          <p className="font-display text-sm font-semibold leading-none">LearnSphere</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">{roleLabel}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item)
                  ? 'bg-brand-light text-brand-dark'
                  : 'text-ink/70 hover:bg-paper hover:text-ink'
              }`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-4">
        {user && (
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
              {user.fullName.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-ink">{user.fullName}</p>
              <p className="truncate text-[11px] text-muted">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} /> Log out
        </button>
        <Link href="/" className="mt-2 block text-center text-xs text-muted hover:text-ink">
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
