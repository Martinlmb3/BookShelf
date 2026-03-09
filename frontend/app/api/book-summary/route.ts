import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, author, genre, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Book title is required" },
        { status: 400 }
      );
    }

    const prompt = `Generate a concise and engaging summary for the following book:

Title: ${title}
${author ? `Author: ${author}` : ""}
${genre ? `Genre: ${genre}` : ""}
${description ? `Description: ${description}` : ""}

Please provide:
1. A brief overview (2-3 sentences)
2. Main themes or key points
3. Who would enjoy this book

Keep the summary under 200 words.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful book expert who provides insightful and engaging book summaries.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content;

    if (!summary) {
      throw new Error("Failed to generate summary");
    }

    return NextResponse.json({
      summary,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error("Error generating book summary:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate summary" },
      { status: 500 }
    );
  }
}
