import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calendar, Eye, Tag } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import { Problem } from '@/models/Problem';
import { Category } from '@/models/Category';
import OpportunityBox from '@/components/OpportunityBox';
import ProblemCard from '@/components/ProblemCard';
import ShareButtons from '@/components/ShareButtons';
import VisionEngine from '@/components/VisionEngine';
import ProblemModeView from '@/components/ProblemModeView';
import type { FounderSwipeData } from '@/components/FounderSwipeCards';
import { getSiteUrl } from '@/lib/site-url';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();

  const problem = await Problem.findOne({ slug });
  if (!problem) {
    return { title: 'Problem not found | ProblemBase' };
  }

  return {
    title: `${problem.title} | ProblemBase`,
    description: problem.problemDescription.substring(0, 160),
    openGraph: {
      title: problem.title,
      description: problem.problemDescription.substring(0, 160),
      type: 'article',
    },
  };
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();

  const problem = await Problem.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } },
    { returnDocument: 'after' }
  ).populate({
    path: 'category',
    model: Category,
  });

  if (!problem) {
    notFound();
  }

  const relatedProblems = await Problem.find({
    category: problem.category._id,
    _id: { $ne: problem._id },
  })
    .limit(3)
    .populate({ path: 'category', model: Category });

  const categoryName =
    problem.category && typeof problem.category === 'object' && 'name' in problem.category
      ? String(problem.category.name)
      : 'Uncategorized';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: problem.title,
    description: problem.problemDescription,
    datePublished: new Date(problem.createdAt).toISOString(),
    dateModified: new Date(problem.updatedAt).toISOString(),
    keywords: problem.tags,
    articleSection: categoryName,
  };
  const siteUrl = getSiteUrl();

  const visionData = {
    title: String(problem.title),
    slug: String(problem.slug),
    category: categoryName,
    problemDescription: String(problem.problemDescription),
    whyItHappens: problem.whyItHappens.map((reason: string) => String(reason)),
    solutions: problem.solutions.map((solution: string) => String(solution)),
    opportunity: String(problem.opportunity),
  };

  const founderData: FounderSwipeData = {
    opportunity: {
      market:
        categoryName === 'Students & Career'
          ? 'Rs5000Cr+'
          : categoryName === 'Money & Finance'
            ? 'Rs7200Cr+'
            : categoryName === 'Tech & Internet'
              ? 'Rs9100Cr+'
              : 'Rs3800Cr+',
      demand:
        categoryName === 'Tech & Internet' || categoryName === 'Students & Career'
          ? 'High'
          : 'Medium',
      score: categoryName === 'Tech & Internet' ? 8.8 : categoryName === 'Students & Career' ? 8.5 : 7.6,
      demandPercent: categoryName === 'Tech & Internet' ? 88 : categoryName === 'Students & Career' ? 84 : 72,
    },
    ideas: [
      {
        title: `AI ${categoryName.split(' & ')[0]} App`,
        description: `A focused product around ${problem.title.toLowerCase()}.`,
        monetization: 'Subscription',
      },
      {
        title: `${categoryName.split(' & ')[0]} Marketplace`,
        description: `Match users to the right expert, tool, or workflow fast.`,
        monetization: 'Commission',
      },
      {
        title: 'Automation Layer',
        description: 'Turn the repeated pain into an always-on workflow.',
        monetization: 'B2B SaaS',
      },
    ],
    competitors: [
      {
        name: categoryName === 'Students & Career' ? 'Coursera' : 'Incumbents',
        flaw: 'Generic and content-heavy.',
      },
      {
        name: categoryName === 'Students & Career' ? 'Unacademy' : 'Category apps',
        flaw: 'Weak personalization and limited execution support.',
      },
    ],
    gap:
      categoryName === 'Students & Career'
        ? 'No AI-driven personalized roadmap with startup-grade decision support.'
        : 'Existing platforms solve fragments, not the full high-intent workflow.',
    execution: [
      'Ship a narrow MVP around the strongest repeated pain.',
      'Launch to one sharp niche with obvious urgency.',
      'Add the sticky feature users come back for weekly.',
      'Monetize with paid workflow, subscription, or marketplace take rate.',
    ],
    revenue: {
      simulation:
        categoryName === 'Students & Career'
          ? '10,000 users x Rs99'
          : categoryName === 'Tech & Internet'
            ? '12,000 users x Rs149'
            : '8,000 users x Rs99',
      result:
        categoryName === 'Students & Career'
          ? 'Rs9.9L/month'
          : categoryName === 'Tech & Internet'
            ? 'Rs17.9L/month'
            : 'Rs7.9L/month',
    },
  };

  return (
    <div className="page-shell pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <ProblemModeView title={problem.title} category={categoryName} founderData={founderData}>
        <section className="page-section pt-10">
          <div className="border-t border-white/10 pt-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-app-muted">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">{categoryName}</span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(problem.createdAt).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {problem.views} views
              </span>
            </div>

            <h1 className="mt-6 max-w-5xl font-display text-4xl leading-[1.02] tracking-[-0.05em] text-white md:text-6xl">
              {problem.title}
            </h1>
          </div>
        </section>

        <section className="page-section mt-10">
          <div className="border-t border-white/10 pt-10">
            <p className="open-copy text-lg leading-9 text-app-muted">{problem.problemDescription}</p>

            <VisionEngine {...visionData} />

            <div className="mt-8">
              <ShareButtons url={`${siteUrl}/problem/${problem.slug}`} title={problem.title} />
            </div>
          </div>
        </section>

        <section className="page-section mt-10">
          <div className="grid gap-14 border-t border-white/10 pt-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">Problem</h2>
              <p className="open-copy mt-5 text-base leading-8 text-white/88">{problem.problemDescription}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">Why It Happens</h2>
              <ul className="mt-5 space-y-5">
                {problem.whyItHappens.map((reason: string, index: number) => (
                  <li key={`${reason}-${index}`} className="flex items-start gap-4 border-l border-white/10 pl-5">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)]" />
                    <span className="open-copy text-base leading-8 text-white/86">{reason}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">Solution</h2>
              <ul className="mt-5 space-y-5">
                {problem.solutions.map((solution: string, index: number) => (
                  <li key={`${solution}-${index}`} className="flex items-start gap-4 border-l border-white/10 pl-5">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
                    <span className="open-copy text-base leading-8 text-white/86">{solution}</span>
                  </li>
                ))}
              </ul>
            </section>

            <OpportunityBox content={problem.opportunity} />

            {problem.tags?.length > 0 ? (
              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <div className="mr-1 inline-flex items-center gap-2 text-sm text-app-muted">
                  <Tag className="h-4 w-4" />
                  Tags
                </div>
                {problem.tags.map((tag: string) => (
                  <span key={tag} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-app-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {relatedProblems.length > 0 ? (
          <section className="page-section mt-14">
            <div className="mb-8 border-t border-white/10 pt-8">
              <p className="text-sm uppercase tracking-[0.24em] text-app-muted">Related</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">More in {categoryName}</h2>
            </div>
            <div className="grid gap-8 xl:grid-cols-3">
              {relatedProblems.map((related) => (
                <ProblemCard
                  key={related.slug}
                  title={related.title}
                  slug={related.slug}
                  category={
                    related.category && typeof related.category === 'object' && 'name' in related.category
                      ? String(related.category.name)
                      : 'Uncategorized'
                  }
                  problemDescription={related.problemDescription}
                  opportunity={related.opportunity}
                  views={related.views}
                />
              ))}
            </div>
          </section>
        ) : null}
      </ProblemModeView>
    </div>
  );
}
