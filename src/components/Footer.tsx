import Link from 'next/link';
import { ArrowUpRight, Bookmark, Compass, Send } from 'lucide-react';

const FOOTER_LINKS = {
  Explore: [
    { href: '/', label: 'Discover problems', icon: Compass },
    { href: '/categories', label: 'Browse categories', icon: ArrowUpRight },
    { href: '/favorites', label: 'Open idea bank', icon: Bookmark },
  ],
  Contribute: [
    { href: '/submit', label: 'Submit a problem', icon: Send },
    { href: '/admin', label: 'Admin dashboard', icon: ArrowUpRight },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-black/6">
      <div className="page-section py-14">
        <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              Premium discovery workflow
            </span>
            <div>
              <h2 className="font-display text-3xl tracking-[-0.04em] text-white">Find pain points before everyone else does.</h2>
              <p className="open-copy mt-3 text-sm leading-7 text-app-muted">
                ProblemBase turns scattered market frustration into a cleaner signal for founders, operators, and curious builders.
              </p>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-app-muted">{title}</h3>
              <div className="mt-5 space-y-3">
                {links.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} className="flex items-center gap-3 text-sm text-app-muted hover:text-white">
                    <Icon className="h-4 w-4 text-[var(--accent-strong)]" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-app-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ProblemBase. Built for people who want sharper problem discovery.</p>
          <p className="uppercase tracking-[0.24em] text-white/45">Curated signal over noisy ideas</p>
        </div>
      </div>
    </footer>
  );
}
