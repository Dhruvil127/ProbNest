import { generateProblemFromAI } from '@/services/llama';
import { PROBLEMS, CATEGORIES } from '@/lib/data';
import { NextResponse } from 'next/server';

// This is the "Auto-Refresh" engine.
// It can be triggered by a Cron Job to keep the site fresh without you doing anything.
export async function GET() {
  // 1: Fetch trending topics from the internet
  // For a pure automated MVP, we start with a "Velocty Seed" of raw complaints
  const RAW_HUNT_TOPICS = [
      "I hate how difficult it is to find a pet-friendly apartment in Mumbai without a massive broker fee.",
      "Why is personalized dietary advice so expensive and not covered by insurance?",
      "It's annoying that there's no way to track small item losses across 5 different shipping companies."
  ];

  // 2: Pick one random topic to "Auto-Refresh" into a problem
  const randomTopic = RAW_HUNT_TOPICS[Math.floor(Math.random() * RAW_HUNT_TOPICS.length)];

  // 3: Use the local Llama 3 model on the PC to process it
  const aiGeneratedProblem = await generateProblemFromAI(randomTopic);

  // 4: Create a new problem object with metadata
  const newProblem = {
    _id: Math.random().toString(36).substring(7),
    slug: (aiGeneratedProblem.title || 'new-problem').toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, ''),
    votes: Math.floor(Math.random() * 500) + '50',
    views: Math.floor(Math.random() * 500) + 100,
    ...aiGeneratedProblem
  };

  // 5: In Static-Native mode, we send it to the UI
  // Note: For Vercel production, we'll swap the local Llama link with a Groq free-tier key!
  return NextResponse.json({
    success: true,
    huntedTopic: randomTopic,
    newProblem,
    source: "Auto-Hunted with Local Llama-3"
  });
}
