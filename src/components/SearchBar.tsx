'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { DEMO_PROBLEMS } from '@/lib/demo-content';

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const normalized = query.toLowerCase();
    return DEMO_PROBLEMS.filter(
      (problem) =>
        problem.title.toLowerCase().includes(normalized) ||
        problem.category.toLowerCase().includes(normalized) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(normalized))
    ).slice(0, compact ? 4 : 5);
  }, [compact, query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 border-b border-white/12 px-1 py-3">
        <Search className="h-4 w-4 text-app-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search problems, categories, or tags"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-app-muted"
          aria-label="Search problems"
        />
      </div>

      {results.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 border-t border-white/12 bg-[rgba(7,17,31,0.92)] px-1 py-3 backdrop-blur-xl">
          {results.map((problem) => (
            <Link
              key={problem.slug}
              href={`/problem/${problem.slug}`}
              className="block px-3 py-3 hover:bg-white/4"
            >
              <p className="text-sm font-medium text-white">{problem.title}</p>
              <p className="mt-1 text-xs text-app-muted">{problem.category}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
