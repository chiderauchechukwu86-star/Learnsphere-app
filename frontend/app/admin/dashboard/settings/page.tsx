'use client';

import { useState } from 'react';
import { LayoutDashboard, Users, ShieldCheck, BarChart3, Megaphone, FileClock, Settings } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const items = [
  { label: 'Overview', href: '/admin/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Users', href: '/admin/dashboard/users', icon: 'Users' as const },
  { label: 'Approvals', href: '/admin/dashboard/approvals', icon: 'ShieldCheck' as const },
  { label: 'Analytics', href: '/admin/dashboard/analytics', icon: 'BarChart3' as const },
  { label: 'Announcements', href: '/admin/dashboard/announcements', icon: 'Megaphone' as const },
  { label: 'Audit logs', href: '/admin/dashboard/audit-logs', icon: 'FileClock' as const },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: 'Settings' as const },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-brand' : 'bg-line'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    allowInstructorSignups: true,
    requireCourseApproval: true,
    maintenanceMode: false,
    emailNotifications: true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const rows: { key: keyof typeof settings; label: string; help: string }[] = [
    { key: 'allowInstructorSignups', label: 'Allow instructor sign-ups', help: 'New users can request instructor accounts.' },
    { key: 'requireCourseApproval', label: 'Require course approval', help: 'Courses must be reviewed before going live.' },
    { key: 'emailNotifications', label: 'Email notifications', help: 'Send email alongside in-app notifications.' },
    { key: 'maintenanceMode', label: 'Maintenance mode', help: 'Show a maintenance banner and block new sign-ins.' },
  ];

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} roleLabel="Admin" />
      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-semibold">Platform settings</h1>
          <p className="mt-1 text-sm text-muted">These map to feature flags read by the backend on each request.</p>

          <div className="mt-6 divide-y divide-line rounded-xl2 border border-line bg-card shadow-card">
            {rows.map((r) => (
              <div key={r.key} className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-semibold text-ink">{r.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{r.help}</p>
                </div>
                <Toggle checked={settings[r.key]} onChange={() => toggle(r.key)} />
              </div>
            ))}
          </div>

          {settings.maintenanceMode && (
            <div className="mt-4 rounded-lg border border-amber/40 bg-amber-light px-4 py-3 text-sm text-amber-dark">
              Maintenance mode is on — new sign-ins would be blocked platform-wide.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
