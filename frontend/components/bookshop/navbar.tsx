"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, LogOut } from "lucide-react"

export function Navbar({ variant = "public" }: { variant?: "public" | "auth" }) {
  const pathname = usePathname()

  if (variant === "auth") {
    return (
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/BookShop - logo.svg"
              alt="BookShop Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-lg font-bold text-foreground">BookShop</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/collection"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/collection" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              My Collection
            </Link>
            <Link
              href="/browse"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/browse" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Browse Store
            </Link>
            <Link
              href="/add-book"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/add-book" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Add Book
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent/80"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/BookShop - logo.svg"
            alt="BookShop Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-bold text-foreground">BookShop</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/browse"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse
          </Link>
          <Link
            href="/collection"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            My Collection
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
        </nav>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground md:hidden">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
