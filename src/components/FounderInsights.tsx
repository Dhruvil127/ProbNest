import { BarChart3, BadgeIndianRupee, BriefcaseBusiness, CircleDollarSign, Rocket, TrendingUp } from 'lucide-react';

export interface FounderIdea {
  title: string;
  description: string;
  monetization: string;
}

export interface FounderCompetitor {
  name: string;
  description: string;
  gap: string;
}

export interface FounderInsightsData {
  marketSize: string;
  growth: string;
  demand: number;
  demandLabel: string;
  ideas: FounderIdea[];
  competitors: FounderCompetitor[];
  executionSteps: string[];
  revenue: string;
  revenueLevel: 'High' | 'Medium' | 'Low';
}

function revenueBadgeClass(level: FounderInsightsData['revenueLevel']) {
  if (level === 'High') {
    return 'bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/20';
  }

  if (level === 'Medium') {
    return 'bg-amber-400/12 text-amber-200 ring-1 ring-amber-300/20';
  }

  return 'bg-rose-400/12 text-rose-200 ring-1 ring-rose-300/20';
}

export default function FounderInsights({ data }: { data: FounderInsightsData }) {
  return (
    <section className="mt-14 rounded-[32px] border border-white/10 bg-gradient-to-r from-[rgba(15,24,42,0.96)] via-[rgba(17,33,62,0.94)] to-[rgba(31,24,61,0.94)] p-6 shadow-lg shadow-black/20 transition-all duration-300 ease-in-out sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-200">Founder Insights Panel</p>
          <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.05em] text-white sm:text-5xl">
            Startup analysis view.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
            Founder Mode reframes this problem as a buildable business with market signals, execution paths, and monetization opportunities.
          </p>
        </div>

        <div className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${revenueBadgeClass(data.revenueLevel)}`}>
          Revenue Potential: {data.revenueLevel}
        </div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-black/10 p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-sky-200" />
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">Market Size</h3>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Market Size</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">{data.marketSize}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Growth Rate</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">{data.growth}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.28em] text-white/45">Demand Level</span>
                <span className="text-sm font-medium text-sky-100">{data.demandLabel}</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 transition-all duration-300 ease-in-out"
                  style={{ width: `${data.demand}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-[var(--accent-strong)]" />
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">Business Ideas</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {data.ideas.map((idea) => (
                <article
                  key={idea.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-sky-200/20 hover:bg-white/[0.07]"
                >
                  <h4 className="text-xl font-semibold tracking-[-0.03em] text-white">{idea.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/72">{idea.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-sky-100">
                    <BadgeIndianRupee className="h-3.5 w-3.5" />
                    {idea.monetization}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-emerald-200" />
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">Competitor Analysis</h3>
            </div>
            <div className="space-y-4">
              {data.competitors.map((competitor) => (
                <article key={competitor.name} className="rounded-3xl border border-white/10 bg-black/10 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{competitor.name}</h4>
                      <p className="mt-2 text-sm leading-7 text-white/68">{competitor.description}</p>
                    </div>
                    <div className="max-w-xs rounded-2xl bg-[rgba(103,213,192,0.08)] px-4 py-3 text-sm leading-6 text-emerald-100 ring-1 ring-emerald-200/12">
                      <span className="block text-[11px] uppercase tracking-[0.24em] text-emerald-200/70">Market Gap</span>
                      <span className="mt-1 block">{competitor.gap}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-black/10 p-6">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-[var(--accent-strong)]" />
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">Execution Steps</h3>
            </div>
            <ol className="mt-6 space-y-4">
              {data.executionSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                      {['MVP', 'Launch', 'Scale', 'Monetize'][index] ?? `Step ${index + 1}`}
                    </p>
                    <p className="mt-2 text-base leading-7 text-white/84">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-400/10 to-indigo-500/10 p-6">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="h-5 w-5 text-emerald-200" />
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">Revenue Potential</h3>
            </div>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white">{data.revenue}</p>
            <p className="mt-3 text-sm leading-7 text-white/68">
              This range reflects a realistic paid product or marketplace path if the startup solves this friction clearly and repeatedly.
            </p>
            <div className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${revenueBadgeClass(data.revenueLevel)}`}>
              {data.revenueLevel} confidence opportunity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
