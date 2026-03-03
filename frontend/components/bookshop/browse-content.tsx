"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const categories = [
  { name: "Fiction", checked: true },
  { name: "Non-Fiction", checked: false },
  { name: "Sci-Fi & Fantasy", checked: false },
  { name: "Mystery", checked: false },
  { name: "Biography", checked: false },
]

const books = [
  {
    title: "The Echoes of Time",
    author: "A. J. Sterling",
    genre: "SCI-FI",
    image: "/images/book-scifi.jpg",
    badge: null,
    wishlist: true,
  },
  {
    title: "Shadows in Paris",
    author: "Elara Vance",
    genre: "MYSTERY",
    image: "/images/book-mystery.jpg",
    badge: "BESTSELLER",
    wishlist: false,
  },
  {
    title: "Thinking Patterns",
    author: "Prof. Marcus Thorne",
    genre: "PHILOSOPHY",
    image: "/images/book-philosophy.jpg",
    badge: null,
    wishlist: false,
  },
  {
    title: "A Silent Symphony",
    author: "Julianne Brooks",
    genre: "FICTION",
    image: "/images/book-fiction.jpg",
    badge: null,
    wishlist: false,
  },
  {
    title: "Midnight Crossing",
    author: "Robert K. Hunt",
    genre: "THRILLER",
    image: "/images/book-thriller.jpg",
    badge: null,
    wishlist: false,
  },
  {
    title: "Empires of Old",
    author: "Sarah Jenkins",
    genre: "HISTORY",
    image: "/images/book-history.jpg",
    badge: null,
    wishlist: false,
  },
  {
    title: "Summer of Leaves",
    author: "Oliver Greene",
    genre: "FICTION",
    image: "/images/book-summer.jpg",
    badge: null,
    wishlist: false,
  },
  {
    title: "Antique Whispers",
    author: "Various Authors",
    genre: "CLASSICS",
    image: "/images/book-classics.jpg",
    badge: null,
    wishlist: false,
  },
]


export function BrowseContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Top search bar */}
      <div className="mb-8 flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="mb-8">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">
              Categories
            </h3>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <label key={cat.name} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={cat.checked}
                    className="h-4 w-4 rounded border-border bg-secondary accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full rounded-lg border border-primary bg-transparent py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Browse Library</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing 1-12 of 156 results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
                <option>Newest Arrivals</option>
                <option>Best Rating</option>
                <option>Title: A-Z</option>
                <option>Title: Z-A</option>
              </select>
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <div
                key={book.title}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={book.image}
                    alt={`${book.title} cover`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                  <h3 className="mt-1 text-sm font-bold text-foreground">{book.title}</h3>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-muted-foreground">...</span>
            <button
              onClick={() => setCurrentPage(12)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              12
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
