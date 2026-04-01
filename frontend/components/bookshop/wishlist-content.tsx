"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

import {
  type WishlistBook,
  getWishlistBooks,
  removeBookFromWishlist,
} from "@/lib/wishlist";

export function WishlistContent() {
  const [wishlistBooks, setWishlistBooks] = useState<WishlistBook[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setWishlistBooks(getWishlistBooks());
    setIsReady(true);
  }, []);

  const totalBooks = useMemo(() => wishlistBooks.length, [wishlistBooks]);

  const handleRemove = (bookId: string) => {
    const updatedBooks = removeBookFromWishlist(bookId);
    setWishlistBooks(updatedBooks);
  };

  if (!isReady) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <p className="text-sm text-muted-foreground">
          Loading your wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span>Dashboard</span>
        <span className="text-muted-foreground/50">{">"}</span>
        <span className="text-primary">Wishlist</span>
      </div>

      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
          <p className="mt-1 text-muted-foreground">
            Books you want to add to your collection later.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Heart className="h-4 w-4 text-primary" />
          {totalBooks} saved
        </span>
      </div>

      {wishlistBooks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Your wishlist is empty
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse books and hit the wishlist button to save titles here.
          </p>
          <Link
            href="/browse"
            className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistBooks.map((book) => (
            <article
              key={book.id}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={book.image}
                  alt={`${book.title} cover`}
                  fill
                  className="object-cover"
                />
                {book.badge && (
                  <span className="absolute left-3 top-3 rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                    {book.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {book.genre}
                </span>
                <h3 className="mt-1 text-sm font-bold text-foreground">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <button
                  onClick={() => handleRemove(book.id)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
