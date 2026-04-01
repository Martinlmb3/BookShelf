export interface LikedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  badge: string | null;
}

const LIKED_STORAGE_KEY = "bookshelf:liked";

export function getLikedBooks(): LikedBook[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(LIKED_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is LikedBook => {
      return (
        typeof item?.id === "string" &&
        typeof item?.title === "string" &&
        typeof item?.author === "string" &&
        typeof item?.genre === "string" &&
        typeof item?.image === "string" &&
        (typeof item?.badge === "string" || item?.badge === null)
      );
    });
  } catch {
    return [];
  }
}

export function saveLikedBooks(books: LikedBook[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(books));
}

export function addBookToLiked(book: LikedBook): LikedBook[] {
  const likedBooks = getLikedBooks();
  const exists = likedBooks.some((item) => item.id === book.id);

  if (exists) {
    return likedBooks;
  }

  const updated = [book, ...likedBooks];
  saveLikedBooks(updated);
  return updated;
}

export function removeBookFromLiked(bookId: string): LikedBook[] {
  const likedBooks = getLikedBooks();
  const updated = likedBooks.filter((item) => item.id !== bookId);
  saveLikedBooks(updated);
  return updated;
}

export function isBookLiked(bookId: string): boolean {
  return getLikedBooks().some((item) => item.id === bookId);
}
