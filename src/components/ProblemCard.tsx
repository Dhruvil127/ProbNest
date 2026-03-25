'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, Lightbulb, Tag } from 'lucide-react';

interface ProblemCardProps {
  title: string;
  slug: string;
  category: string;
  problemDescription: string;
  opportunity: string;
  views?: number;
  delay?: number;
}

export default function ProblemCard({
  title,
  slug,
  category,
  problemDescription,
  opportunity,
  views = 0,
  delay = 0,
}: ProblemCardProps) {
  const shortDescription =
    problemDescription.length > 170 ? `${problemDescription.substring(0, 170)}...` : problemDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay }}
      className="h-full"
    >
      <Link href={`/problem/${slug}`} className="group block h-full">
        <article className="open-rule h-full pt-6">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {views > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs text-app-muted">
                <Eye className="h-3.5 w-3.5" />
                {views}
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] text-white group-hover:text-[var(--accent-strong)]">
            {title}
          </h3>

          <p className="open-copy mt-4 text-base leading-8 text-app-muted">{shortDescription}</p>

          <div className="mt-6 flex items-start gap-3">
            <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-strong)]" />
            <p className="open-copy text-sm leading-7 text-white/84">
              <span className="mr-2 uppercase tracking-[0.22em] text-app-muted">Opportunity</span>
              {opportunity}
            </p>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)]">
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
