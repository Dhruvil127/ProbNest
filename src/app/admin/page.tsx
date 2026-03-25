import Link from 'next/link';
import { LayoutDashboard, PlusCircle, Settings } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { Problem } from '@/models/Problem';
import AdminProblemTable from '@/components/AdminProblemTable';

const FILTERS = ['all', 'pending', 'approved', 'spam'] as const;

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = FILTERS.includes((params.status as (typeof FILTERS)[number]) || 'all')
    ? ((params.status as (typeof FILTERS)[number]) || 'all')
    : 'all';

  await connectDB();

  const totalProblems = await Problem.countDocuments();
  const totalCategories = await Category.countDocuments();
  const problemFilter = status === 'all' ? {} : { moderationStatus: status };
  const recentProblems = await Problem.find(problemFilter).sort({ createdAt: -1 }).limit(25).populate('category');

  const serializedProblems = recentProblems.map((problem) => ({
    _id: problem._id.toString(),
    title: problem.title,
    views: problem.views,
    createdAt: problem.createdAt.toISOString(),
    moderationStatus: problem.moderationStatus,
    categoryName:
      problem.category && typeof problem.category === 'object' && 'name' in problem.category
        ? String(problem.category.name)
        : 'Uncategorized',
  }));

  return (
    <div className="page-shell pb-20">
      <section className="page-section pt-10">
        <div className="premium-card p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="pill text-[var(--accent-strong)]">
                <Settings className="h-3.5 w-3.5" />
                Admin console
              </span>
              <h1 className="section-heading mt-5 text-white">Review submitted problems and moderate quality.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-app-muted">
                New submissions land in pending. Move real problems to approved and mark noise as spam.
              </p>
            </div>

            <Link href="/submit" className="btn-primary w-fit">
              <PlusCircle className="h-4 w-4" />
              New post
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section mt-10 grid gap-6 md:grid-cols-2">
        <div className="premium-card flex items-center gap-4 p-6">
          <div className="gold-ring flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(214,163,93,0.14)]">
            <LayoutDashboard className="h-6 w-6 text-[var(--accent-strong)]" />
          </div>
          <div>
            <p className="text-sm text-app-muted">Total problems</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">{totalProblems}</h2>
          </div>
        </div>

        <div className="premium-card flex items-center gap-4 p-6">
          <div className="gold-ring flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(136,174,247,0.14)]">
            <Settings className="h-6 w-6 text-[var(--brand)]" />
          </div>
          <div>
            <p className="text-sm text-app-muted">Categories</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">{totalCategories}</h2>
          </div>
        </div>
      </section>

      <section className="page-section mt-10">
        <div className="premium-card overflow-hidden">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-white">Submission moderation</h2>
              <div className="flex gap-4 text-sm">
                {FILTERS.map((filter) => (
                  <Link
                    key={filter}
                    href={filter === 'all' ? '/admin' : `/admin?status=${filter}`}
                    className={status === filter ? 'text-white' : 'text-app-muted hover:text-white'}
                  >
                    {filter}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <AdminProblemTable problems={serializedProblems} />

          {serializedProblems.length === 0 ? (
            <div className="px-6 py-16 text-center text-app-muted">No problems found for this filter.</div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
