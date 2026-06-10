import { Anthropic } from '@anthropic-ai/sdk';
import { RoundResult } from '@/lib/scoring';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { results } = await request.json();

    if (!results || !Array.isArray(results)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Build context for Claude
    const roundSummary = results
      .map(
        (r: RoundResult) =>
          `Round ${r.roundNumber}: True prob ${r.trueProb}%, user bid/ask ${r.userBid}/${r.userAsk} → ${r.verdict} ("${r.feedback}")`
      )
      .join('\n');

    const prompt = `You are a brutal quant interviewer analyzing a candidate's betting performance. They just completed 5 rounds of a betting game where they had to quote bid/ask spreads on bags of colored balls.

Round Results:
${roundSummary}

Write a 2-3 sentence brutal, direct critique analyzing their patterns. Focus on:
- Whether they freeze under time pressure
- Whether they calibrate confidence correctly (spread too wide = paralyzed, too tight = overconfident)
- Whether they made Bayesian update mistakes when conditions changed mid-round
- What specific error they repeated most

Be harsh. Be specific. This is their feedback before the real loop.`;

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const summary = message.content[0].type === 'text' ? message.content[0].text : '';

    return Response.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);

    // Graceful degradation on API failure
    return Response.json(
      {
        summary: 'Your score is locked in. The harsh truth: you need more reps before the real loop.',
      },
      { status: 200 }
    );
  }
}
