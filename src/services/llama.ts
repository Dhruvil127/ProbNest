import { PROBLEMS, Problem } from '@/lib/data';

/**
 * Llama-3 Problem Generator Service
 * Connects to local Ollama/LMStudio instance
 */
export async function generateProblemFromAI(rawTopic: string): Promise<Partial<Problem>> {
  const prompt = `
    Analyze this real-world complaint: "${rawTopic}".
    Extract a structured startup opportunity.
    Respond ONLY in high-fidelity JSON with this format:
    {
      "title": "A short 'Why is X...' style question",
      "problemDescription": "1-2 sentences of the core friction",
      "whyItHappens": ["reason 1", "reason 2"],
      "solutions": ["solution 1", "solution 2"],
      "opportunity": "A specific startup idea to solve this",
      "category": "One of [Finance, Tech, Career, Life]",
      "tags": ["Tag1", "Tag2"]
    }
  `;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false,
        format: 'json'
      })
    });

    const result = await response.json();
    return JSON.parse(result.response);
  } catch (error) {
    console.error("Llama 3 Local Connection Failed:", error);
    // Fallback if local model is offline
    return {
      title: "Local Llama Offline",
      problemDescription: "Could not connect to the local Llama-3 instance on port 11434.",
      opportunity: "Start Ollama/LMStudio to enable auto-generation."
    };
  }
}
