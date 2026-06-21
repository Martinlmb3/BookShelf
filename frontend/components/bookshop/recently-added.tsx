import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

const books = [
  {
    title: "Spring in Action",
    author: "Craig Walls",
    rating: 5,
    image: "/images/book-spring.jpg",
    badge: null,
    isbn:9781617294945,
  },
  {
    title: "Microservices Pattern",
    author: "Chris Richardson",
    rating: 5,
    image: "/images/book-microservices.jpg",
    badge: null,
    isbn:9781617294549,
  },
  {
    title: "Grokking Algorithms",
    author: "Aditya Bhargava",
    rating: 4,
    image: "/images/book-algorithms.jpg",
    badge: null,
    isbn:9781617292231,
  },
  {
    title: "l'art de la guerre",
    author: "Sun Tzu",
    rating: 5,
    image: "/images/l'art de la guerre.jpg",
    badge: null,
    isbn:9982470191,
  },
  {
    title: "Unit Testing",
    author: "Vladimir Khorikov",
    rating: 4,
    image: "/images/book-testing.jpg",
    badge: null,
    isbn:978-1617296277,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function RecentlyAdded() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-balance text-2xl font-bold text-foreground lg:text-3xl">
              Recently Added
            </h2>
            <p className="mt-2 text-muted-foreground">
              {"Discover what's trending in our community collection."}
            </p>
          </div>
          <Link
            href="/browse"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex"
          >
            View all collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {books.map((book) => (
            <Link href="/browse" key={book.title} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={book.image}
                  alt={`${book.title} book cover`}
                  width={200}
                  height={280}
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {book.badge && (
                  <span className="absolute right-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                    {book.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary">
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground">{book.author}</p>
              <div className="mt-1">
                <StarRating rating={book.rating} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
