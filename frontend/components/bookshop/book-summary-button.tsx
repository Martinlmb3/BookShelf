"use client";

import { useState } from "react";
import { useGenerateBookSummary } from "@/hooks/isbn";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface BookSummaryButtonProps {
  title: string;
  author?: string;
  genre?: string;
  description?: string;
}

export function BookSummaryButton({
  title,
  author,
  genre,
  description,
}: BookSummaryButtonProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const generateSummary = useGenerateBookSummary();

  const handleGenerateSummary = async () => {
    generateSummary.mutate(
      { title, author, genre, description },
      {
        onSuccess: (data) => {
          setSummary(data.summary);
        },
        onError: (error: any) => {
          console.error("Failed to generate summary:", error);
          alert("Failed to generate summary. Please try again.");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGenerateSummary}
        disabled={generateSummary.isPending}
        className="gap-2"
      >
        {generateSummary.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Summary...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate AI Summary
          </>
        )}
      </Button>

      {summary && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            AI-Generated Summary
          </h3>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {summary}
          </p>
        </div>
      )}

      {generateSummary.isError && (
        <div className="rounded-lg border border-red-500 bg-red-50 p-4 dark:bg-red-950">
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to generate summary. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
