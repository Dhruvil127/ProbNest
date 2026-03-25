import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { Problem } from '@/models/Problem';

const DEMO_CATEGORIES = [
  { name: 'Money & Finance', slug: 'money-finance', icon: 'Wallet' },
  { name: 'Students & Career', slug: 'students-career', icon: 'GraduationCap' },
  { name: 'Psychology & Life', slug: 'psychology-life', icon: 'Brain' },
  { name: 'Daily Life Problems', slug: 'daily-life-problems', icon: 'Coffee' },
  { name: 'Tech & Internet', slug: 'tech-internet', icon: 'Laptop' },
];

const DEMO_POSTS = [
  {
    title: "Why People Can't Save Money",
    slug: "why-people-cant-save-money",
    categoryName: "Money & Finance",
    problemDescription: "People struggle to save even with stable income. They live paycheck to paycheck because lifestyle inflation eats up any increased earnings, and societal pressure to consume is higher than ever.",
    whyItHappens: [
      "Poor financial planning and lack of clear saving goals",
      "Impulse spending facilitated by frictionless one-click checkouts",
      "Lack of early financial education in the school system",
      "Lifestyle creep as income increases"
    ],
    solutions: [
      "Implement the 50/30/20 budgeting rule immediately",
      "Use automated transfers to a separate high-yield savings account",
      "Delete saved credit cards from browsers to add friction to purchases",
      "Adopt a 'cooling off' period of 48 hours for non-essential buys"
    ],
    opportunity: "Build a smart expense tracking app with behavioral AI insights that intercepts purchases at checkout and suggests depositing that amount to an investment account instead.",
    tags: ["savings", "budgeting", "personal-finance"],
    views: 1250,
  },
  {
    title: "The Anxiety of Choosing What to Watch",
    slug: "streaming-choice-paralysis",
    categoryName: "Psychology & Life",
    problemDescription: "Users spend an average of 15-20 minutes just deciding what to watch on streaming platforms like Netflix or Hulu, leading to decision fatigue and frustration before the movie even starts.",
    whyItHappens: [
      "Paradox of choice: Too many options lead to decision paralysis",
      "Fear of missing out (FOMO) on the 'best' content",
      "Fragmented watch lists across multiple competing platforms",
      "Algorithms surface popular content rather than contextually relevant content"
    ],
    solutions: [
      "Use third-party aggregation apps like JustWatch",
      "Create a strict 'watch next' list on a physical notepad",
      "Let someone else in the group decide without veto power",
      "Limit scrolling time to 5 minutes before defaulting to a known favorite"
    ],
    opportunity: "A cross-platform app that uses your current mood, time limit, and friends' anonymous ratings to pick exactly ONE movie for you. No lists, just one play button.",
    tags: ["streaming", "decision-fatigue", "entertainment"],
    views: 890,
  },
  {
    title: "Freelancer Invoicing is Still Too Complex",
    slug: "freelancer-invoicing-complexity",
    categoryName: "Students & Career",
    problemDescription: "Independent workers struggle with creating professional invoices, tracking partial payments, and reminding clients without feeling awkward. Existing accounting software is built for SMBs, not solo creators.",
    whyItHappens: [
      "Accounting software UX is overly complicated for single projects",
      "Following up on late payments causes social friction",
      "Tracking multiple payment methods (Stripe, Crypto, Wire) is messy",
      "No standardization in creative industry scopes of work"
    ],
    solutions: [
      "Use simple templates built in Notion or Google Docs",
      "Implement a strict 50% upfront payment policy for all new clients",
      "Set up automated email follow-ups using a CRM tool",
      "Clearly define payment terms in the initial contract phase"
    ],
    opportunity: "A 'one-link' payment and escrow solution focused purely on creative freelancers. It automatically chases clients via WhatsApp and holds funds in escrow until delivery.",
    tags: ["freelance", "payments", "creator-economy"],
    views: 2100,
  },
  {
    title: "SaaS Subscriptions are Hard to Cancel",
    slug: "saas-cancellation-friction",
    categoryName: "Tech & Internet",
    problemDescription: "Companies make it deliberately difficult to cancel subscriptions online (Dark Patterns). Users often have to call support during limited hours, leading to unwanted recurring charges for months.",
    whyItHappens: [
      "Companies prioritize short-term retention metrics over user trust",
      "Legal loopholes allow 'must call to cancel' policies in some jurisdictions",
      "Users forget they signed up for a free trial after 7 days",
      "Convoluted UI designed intentionally to hide the cancel button"
    ],
    solutions: [
      "Use privacy.com or virtual burner cards for free trials",
      "Set aggressive calendar reminders 2 days before a trial ends",
      "Search for the cancellation link via Google rather than navigating the app",
      "Use subscription tracking tools built into modern banking apps"
    ],
    opportunity: "A consumer advocacy bot that automatically navigates dark patterns, makes phone calls using AI voice, and legally cancels any subscription for a flat fee.",
    tags: ["saas", "dark-patterns", "subscriptions"],
    views: 3400,
  },
  {
    title: "Difficulty Maintaining Adult Friendships",
    slug: "adult-friendship-maintenance",
    categoryName: "Daily Life Problems",
    problemDescription: "As people enter their late 20s and 30s, maintaining deep friendships becomes incredibly difficult due to conflicting schedules, geographic dispersion, and the mental load of modern life.",
    whyItHappens: [
      "Lack of structural proximity (like school or college dorms) that enforces casual hangouts",
      "Increased responsibilities taking up cognitive bandwidth",
      "Relying on text-based communication which lacks emotional depth",
      "The 'I'm too busy' culture becoming a default social excuse"
    ],
    solutions: [
      "Schedule recurring, low-effort hangouts (e.g., Sunday morning coffee)",
      "Send voice notes instead of texts for more intimate updates",
      "Combine errands like grocery shopping or gym sessions with socializing",
      "Embrace 'maintenance' interaction—quick texts just to share a meme"
    ],
    opportunity: "A social CRM for personal relationships that uses calendar integrations to automatically find overlapping free time between friends and suggests spontaneous low-friction meetups.",
    tags: ["relationships", "mental-health", "adulthood"],
    views: 4200,
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing
    await Category.deleteMany({});
    await Problem.deleteMany({});

    // Seed Categories
    const categories = await Category.insertMany(DEMO_CATEGORIES);
    
    // Map categories for easy lookup
    const categoryMap = categories.reduce<Record<string, string>>((acc, cat) => {
      acc[cat.name] = String(cat._id);
      return acc;
    }, {});

    // Seed Problems with category ObjectIds
    const problemsWithRefs = DEMO_POSTS.map(post => {
      const { categoryName, ...rest } = post;
      return {
        ...rest,
        category: categoryMap[categoryName]
      };
    });

    await Problem.insertMany(problemsWithRefs);

    return NextResponse.json({ message: 'Database seeded successfully with 5 initial posts!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
