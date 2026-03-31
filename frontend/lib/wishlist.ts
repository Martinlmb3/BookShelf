export interface WishlistBook {
  id: string
  title: string
  author: string
  genre: string
  image: string
  badge: string | null
}

const WISHLIST_STORAGE_KEY = "bookshelf:wishlist"

export function getWishlistBooks(): WishlistBook[] {
  if (typeof window === "undefined") {
    return []
  }

  const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
  if (!stored) {
    return []
  }

  try {
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item): item is WishlistBook => {
      return (
        typeof item?.id === "string" &&
        typeof item?.title === "string" &&
        typeof item?.author === "string" &&
        typeof item?.genre === "string" &&
        typeof item?.image === "string" &&
        (typeof item?.badge === "string" || item?.badge === null)
      )
    })
  } catch {
    return []
  }
}

export function saveWishlistBooks(books: WishlistBook[]) {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(books))
}

export function addBookToWishlist(book: WishlistBook): WishlistBook[] {
  const wishlist = getWishlistBooks()
  const exists = wishlist.some((item) => item.id === book.id)

  if (exists) {
    return wishlist
  }

  const updated = [book, ...wishlist]
  saveWishlistBooks(updated)
  return updated
}

export function removeBookFromWishlist(bookId: string): WishlistBook[] {
  const wishlist = getWishlistBooks()
  const updated = wishlist.filter((item) => item.id !== bookId)
  saveWishlistBooks(updated)
  return updated
}

export function isBookInWishlist(bookId: string): boolean {
  return getWishlistBooks().some((item) => item.id === bookId)
}
