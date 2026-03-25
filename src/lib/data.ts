export interface Problem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  problemDescription: string;
  whyItHappens: string[];
  solutions: string[];
  opportunity: string;
  tags: string[];
  votes: string;
  views: number;
}

export const CATEGORIES = [
  { name: "Finance", slug: "finance" },
  { name: "Career", slug: "career" },
  { name: "Life", slug: "life" },
  { name: "Tech", slug: "tech" }
];

export const PROBLEMS: Problem[] = [
  {
    _id: "1",
    title: "Why is tracking multiple freelancers manual?",
    slug: "freelancer-tracking",
    category: "Finance",
    problemDescription: "Companies spend 20+ hours a month manually verifying invoices from multiple individual contractors across different currencies.",
    whyItHappens: [
       "Fragmentation of payment rails (Wise, PayPal, Crypto)",
       "Lack of a unified 'Source of Truth' for contract milestones",
       "Manual overhead of currency conversion and local tax compliance"
    ],
    solutions: [
       "Automated invoice matching via OCR and AI",
       "Unified treasury dashboard for all global contractors",
       "Real-time milestone approval system"
    ],
    opportunity: "A unified portal for global freelancer management with automated invoice matching and multi-currency payouts.",
    tags: ["SaaS", "FinTech", "RemoteWork"],
    votes: "8.2k",
    views: 1250
  },
  {
    _id: "2",
    title: "Why are personal trainers so expensive?",
    slug: "personal-trainers",
    category: "Life",
    problemDescription: "Getting personalized health advice currently requires paying $100+/hr, excluding most of the middle-class families.",
    whyItHappens: [
       "High customer acquisition costs for trainers",
       "Physical location overhead and travel time",
       "Lack of scalable 1-on-1 feedback mechanisms"
    ],
    solutions: [
       "AI-native posture correction via mobile cameras",
       "Asynchronous video-based coaching platforms",
       "Community-driven accountability pods"
    ],
    opportunity: "AI-native fitness coach that uses real-time computer vision to correct form at home for a fraction of the cost.",
    tags: ["Health", "AI", "Consumer"],
    votes: "12.5k",
    views: 3400
  },
  {
    _id: "3",
    title: "Why is moving homes so stressful?",
    slug: "moving-stress",
    category: "Tech",
    problemDescription: "Fragmented logistics market leads to hidden costs and broken items every time a family relocates.",
    whyItHappens: [
       "Lack of transparent pricing models in moving companies",
       "No real-time tracking of fragile items",
       "Disjointed insurance claim processes"
    ],
    solutions: [
       "IoT-based fragile item trackers for move-day",
       "Dynamic pricing engine based on volume and distance",
       "Integrated white-glove packing and digital inventory"
    ],
    opportunity: "A full-stack moving platform with guaranteed pricing and digital item inventory tracking.",
    tags: ["Logistics", "IoT", "RealEstate"],
    votes: "5.4k",
    views: 980
  }
];
