export type DemoCategory = {
  name: string;
  slug: string;
  icon: string;
  description: string;
};

export type DemoProblem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  problemDescription: string;
  whyItHappens: string[];
  solutions: string[];
  opportunity: string;
  tags: string[];
  views: number;
  votes: string;
  featured?: boolean;
};

export const DEMO_CATEGORIES: DemoCategory[] = [
  {
    name: 'Money & Finance',
    slug: 'money-finance',
    icon: 'Wallet',
    description: 'Saving, spending, credit, and financial behavior problems people repeatedly struggle with.',
  },
  {
    name: 'Students & Career',
    slug: 'students-career',
    icon: 'GraduationCap',
    description: 'Problems related to learning, job searching, freelancing, and professional growth.',
  },
  {
    name: 'Psychology & Life',
    slug: 'psychology-life',
    icon: 'Brain',
    description: 'Emotional, mental, and behavioral friction in everyday personal life.',
  },
  {
    name: 'Daily Life Problems',
    slug: 'daily-life-problems',
    icon: 'Coffee',
    description: 'Everyday routines, logistics, and household issues that create hidden frustration.',
  },
  {
    name: 'Tech & Internet',
    slug: 'tech-internet',
    icon: 'Laptop',
    description: 'Internet-native pain points, subscription issues, and broken digital workflows.',
  },
];

export const DEMO_PROBLEMS: DemoProblem[] = [
  {
    _id: '1',
    title: "Why People Can't Save Money",
    slug: 'why-people-cant-save-money',
    category: 'Money & Finance',
    problemDescription:
      'People struggle to save even with stable income because everyday spending decisions compound faster than they realize.',
    whyItHappens: [
      'Poor financial planning creates no clear saving target.',
      'Impulse spending is easier than ever through one-click checkouts.',
      'Most people never build strong financial literacy early in life.',
    ],
    solutions: [
      'Use budget tracking with fixed saving goals.',
      'Add expense control systems that create friction before non-essential purchases.',
      'Use simple financial literacy tools that make tradeoffs visible.',
    ],
    opportunity: 'Build a smart expense tracking app with AI insights that intercepts waste before it happens.',
    tags: ['savings', 'budgeting', 'personal-finance'],
    views: 1250,
    votes: '12.8k',
    featured: true,
  },
  {
    _id: '2',
    title: 'The Anxiety of Choosing What to Watch',
    slug: 'streaming-choice-paralysis',
    category: 'Psychology & Life',
    problemDescription:
      'People spend too much time scrolling across streaming apps and too little time actually watching something they enjoy.',
    whyItHappens: [
      'Too many choices create decision paralysis.',
      'Recommendations optimize for popularity instead of current mood and context.',
      'Watchlists are fragmented across different platforms.',
    ],
    solutions: [
      'Use single-purpose curation instead of endless browsing.',
      'Limit the decision window to a few minutes.',
      'Choose tools that optimize for one high-confidence recommendation.',
    ],
    opportunity:
      "Create a cross-platform recommendation app that picks exactly one title based on a user's mood, time, and social context.",
    tags: ['streaming', 'decision-fatigue', 'entertainment'],
    views: 890,
    votes: '9.4k',
    featured: true,
  },
  {
    _id: '3',
    title: 'Freelancer Invoicing is Still Too Complex',
    slug: 'freelancer-invoicing-complexity',
    category: 'Students & Career',
    problemDescription:
      'Independent workers still struggle to invoice professionally, collect payments smoothly, and follow up without social friction.',
    whyItHappens: [
      'Most accounting products are built for larger businesses, not solo workers.',
      'Payment follow-up feels awkward when the relationship is personal.',
      'Freelancers work across inconsistent scopes, tools, and payment methods.',
    ],
    solutions: [
      'Use simplified invoicing workflows tailored to solo operators.',
      'Automate reminders so collection does not depend on manual follow-up.',
      'Centralize project, scope, and payment status in one place.',
    ],
    opportunity:
      'Build a one-link invoicing and payment workflow specifically for freelancers, with automated reminders and trust-building client updates.',
    tags: ['freelance', 'payments', 'creator-economy'],
    views: 2100,
    votes: '8.2k',
    featured: false,
  },
  {
    _id: '4',
    title: 'SaaS Subscriptions are Hard to Cancel',
    slug: 'saas-cancellation-friction',
    category: 'Tech & Internet',
    problemDescription:
      'Users lose money to recurring subscriptions because cancellation flows are intentionally confusing or operationally painful.',
    whyItHappens: [
      'Retention teams are rewarded for reducing churn by any means available.',
      'Cancellation patterns are often hidden behind support or multi-step flows.',
      'Consumers forget trials and recurring renewals until after payment happens.',
    ],
    solutions: [
      'Track every subscription in one place.',
      'Create proactive reminders before renewals.',
      'Use cancellation assistants that reduce dark-pattern friction.',
    ],
    opportunity:
      'Build an AI-powered subscription management assistant that monitors charges, predicts waste, and executes cancellation on behalf of the user.',
    tags: ['saas', 'dark-patterns', 'subscriptions'],
    views: 3400,
    votes: '15.1k',
    featured: true,
  },
  {
    _id: '5',
    title: 'Difficulty Maintaining Adult Friendships',
    slug: 'adult-friendship-maintenance',
    category: 'Daily Life Problems',
    problemDescription:
      'Maintaining close adult friendships becomes unexpectedly hard once schedules, geography, and mental load become fragmented.',
    whyItHappens: [
      'People lose structural proximity after school or college.',
      'Calendars become crowded with work, family, and admin responsibilities.',
      'Text-first communication often lacks emotional depth and momentum.',
    ],
    solutions: [
      'Use recurring low-friction hangout rituals.',
      'Coordinate around tiny shared windows instead of waiting for a perfect plan.',
      'Use lightweight prompts and reminders to maintain continuity.',
    ],
    opportunity:
      'Create a social scheduling product that automatically finds overlap between close friends and suggests low-effort meetups based on context.',
    tags: ['relationships', 'mental-health', 'adulthood'],
    views: 4200,
    votes: '7.9k',
    featured: false,
  },
];
