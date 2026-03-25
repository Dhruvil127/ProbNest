import Link from 'next/link';
import { Compass, Filter } from 'lucide-react';
import ProblemCard from '@/components/ProblemCard';
import { CategoryIcons } from '@/lib/constants';
import { DEMO_CATEGORIES, DEMO_PROBLEMS } from '@/lib/demo-content';

export const metadata = {
  title: 'Categories | ProblemBase',
  description: 'Explore structured problem categories, trending insights, and the latest opportunities on ProblemBase.',
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const currentFilter = params.filter || 'All';
  const currentSort = params.sort === 'latest' ? 'latest' : 'trending';

  const filteredProblems =
    currentFilter === 'All' ? DEMO_PROBLEMS : DEMO_PROBLEMS.filter((problem) => problem.category === currentFilter);

  const displayedProblems =
    currentSort === 'latest'
      ? [...filteredProblems].sort((a, b) => b._id.localeCompare(a._id))
      : [...filteredProblems].sort((a, b) => b.views - a.views);

  const buildSortHref = (sort: 'trending' | 'latest') =>
    currentFilter === 'All'
      ? `/categories?sort=${sort}`
      : `/categories?filter=${encodeURIComponent(currentFilter)}&sort=${sort}`;

  return (
    <div className="page-shell pb-20">
      <section className="page-section pt-10">
        <div className="grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              <Compass className="h-3.5 w-3.5" />
              Problem categories
            </span>
            <h1 className="section-heading mt-5 text-white">Browse problem spaces with structured filters.</h1>
          </div>
          <p className="open-copy text-sm leading-7 text-app-muted">
            Each post follows the same problem, cause, solution, and opportunity model so comparison stays fast and clear.
          </p>
        </div>
      </section>

      <section className="page-section mt-10 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28">
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Filter className="h-4 w-4 text-[var(--accent-strong)]" />
              Filter by category
            </div>

            <div className="mt-5 space-y-3">
              <Link
                href={`/categories?sort=${currentSort}`}
                className={`flex items-center gap-3 text-sm ${
                  currentFilter === 'All' ? 'text-white' : 'text-app-muted hover:text-white'
                }`}
              >
                <Compass className="h-4 w-4 text-[var(--accent-strong)]" />
                All categories
              </Link>
              {DEMO_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories?filter=${encodeURIComponent(category.name)}&sort=${currentSort}`}
                  className={`flex items-center gap-3 text-sm ${
                    currentFilter === category.name ? 'text-white' : 'text-app-muted hover:text-white'
                  }`}
                >
                  <span className="text-[var(--accent-strong)]">{CategoryIcons[category.name] || CategoryIcons.Default}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main>
          <div className="mb-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-app-muted">Results</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-white">
                {currentFilter === 'All' ? 'All Problems' : currentFilter}
              </h2>
            </div>

            <div className="flex gap-5 text-sm">
              <Link href={buildSortHref('trending')} className={currentSort === 'trending' ? 'text-white' : 'text-app-muted hover:text-white'}>
                Trending
              </Link>
              <Link href={buildSortHref('latest')} className={currentSort === 'latest' ? 'text-white' : 'text-app-muted hover:text-white'}>
                Latest
              </Link>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-2">
            {displayedProblems.map((problem, index) => (
              <ProblemCard
                key={problem.slug}
                title={problem.title}
                slug={problem.slug}
                category={problem.category}
                problemDescription={problem.problemDescription}
                opportunity={problem.opportunity}
                views={problem.views}
                delay={index * 0.06}
              />
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}
