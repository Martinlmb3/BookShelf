"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Flame, Heart, Sparkles, TimerReset } from "lucide-react";

import { type LikedBook, getLikedBooks } from "@/lib/liked";

function getMostCommonGenre(books: LikedBook[]): string {
  if (books.length === 0) {
    return "N/A";
  }

  const counts = books.reduce<Map<string, number>>((acc, book) => {
    const genre = book.genre.toUpperCase();
    acc.set(genre, (acc.get(genre) ?? 0) + 1);
    return acc;
  }, new Map());

  let topGenre = "N/A";
  let topCount = 0;

  counts.forEach((count, genre) => {
    if (count > topCount) {
      topGenre = genre;
      topCount = count;
    }
  });

  return topGenre;
}

export function LikedContent() {
  const [likedBooks, setLikedBooks] = useState<LikedBook[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setLikedBooks(getLikedBooks());
    setIsReady(true);
  }, []);

  const totalLiked = useMemo(() => likedBooks.length, [likedBooks]);
  const mostCommonGenre = useMemo(
    () => getMostCommonGenre(likedBooks),
    [likedBooks],
  );
  const recentlyLiked = likedBooks[0]?.title ?? "No liked books yet";

  if (!isReady) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <p className="text-sm text-muted-foreground">Loading liked books...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(29,78,216,0.14),transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <span>Dashboard</span>
          <span className="text-muted-foreground/50">{">"}</span>
          <span className="text-primary">Liked</span>
        </div>

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Liked Books
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Your curated selection of personal favorites and literary
              discoveries, saved for quick access and exploration.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
            Recently Liked
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card/90 p-5 shadow-[0_12px_32px_rgba(2,6,23,0.25)]">
            <div className="mb-3 flex items-center justify-between">
              <Heart className="h-5 w-5 text-primary" />
              <span className="rounded-full bg-primary/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                + this month
              </span>
            </div>
            <p className="text-4xl font-black text-foreground">{totalLiked}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Total liked
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card/90 p-5 shadow-[0_12px_32px_rgba(2,6,23,0.25)]">
            <div className="mb-3 flex items-center justify-between">
              <TimerReset className="h-5 w-5 text-primary" />
              <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Updated now
              </span>
            </div>
            <p className="truncate text-2xl font-extrabold text-foreground">
              {recentlyLiked}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Recently liked
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card/90 p-5 shadow-[0_12px_32px_rgba(2,6,23,0.25)]">
            <div className="mb-3 flex items-center justify-between">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Top affinity
              </span>
            </div>
            <p className="text-4xl font-black text-foreground">
              {mostCommonGenre}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Most common genre
            </p>
          </article>
        </div>

        {likedBooks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <Flame className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 text-lg font-semibold text-foreground">
              No liked books yet
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Go to the library and tap Like on the books you love.
            </p>
            <Link
              href="/browse"
              className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {likedBooks.map((book) => (
              <article key={book.id} className="group">
                <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_14px_30px_rgba(2,6,23,0.35)]">
                  <Image
                    src={book.image}
                    alt={`${book.title} cover`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/85 text-primary">
                    <Heart className="h-4 w-4 fill-current" />
                  </span>
                </div>
                <h3 className="line-clamp-1 text-sm font-bold text-foreground">
                  {book.title}
                </h3>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {book.author}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
