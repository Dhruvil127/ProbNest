import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CategoryIcons } from '@/lib/constants';
import type { DemoCategory } from '@/lib/demo-content';

export default function CategoryCard({ category }: { category: DemoCategory }) {
  return (
    <Link href={`/categories?filter=${encodeURIComponent(category.name)}`} className="group block">
      <div className="premium-card-soft h-full p-6">
        <div className="gold-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8">
          <span className="text-[var(--accent-strong)]">{CategoryIcons[category.name] || CategoryIcons.Default}</span>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-white">{category.name}</h3>
        <p className="mt-3 text-sm leading-7 text-app-muted">{category.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)]">
          Explore category
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
