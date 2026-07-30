import { LucideIcon } from 'lucide-react';

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'brand',
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: 'brand' | 'amber' | 'sage';
}) {
  const accentClasses = {
    brand: 'bg-brand-light text-brand-dark',
    amber: 'bg-amber-light text-amber-dark',
    sage: 'bg-sage-light text-sage-dark',
  }[accent];

  return (
    <div className="rounded-xl2 border border-line bg-card p-5 shadow-card">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${accentClasses}`}>
        <Icon size={18} />
      </div>
      <p className="mt-4 font-mono text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
