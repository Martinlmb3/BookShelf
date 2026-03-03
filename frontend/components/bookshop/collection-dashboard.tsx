"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  BookOpen,
  Sparkles,
  Trophy,
  TrendingUp,
  FileText,
  Calendar,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const stats = [
  {
    label: "Total Books Owned",
    value: "124",
    tag: "INVENTORY",
    icon: BookOpen,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
  },
  {
    label: "Currently Reading",
    value: "3",
    tag: "ACTIVE",
    icon: Sparkles,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    label: "Read this year",
    value: "18",
    tag: "ACHIEVED",
    icon: Trophy,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Total Pages Logged",
    value: "34.5k",
    tag: "METRICS",
    icon: TrendingUp,
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
]

const books = [
  {
    id: "001",
    isbn: "978-0143127550",
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    date: "Aug 2008",
    description:
      "A handbook of agile software craftsmanship that teaches how to write code that is clean and readable.",
  },
  {
    id: "002",
    isbn: "978-1491950357",
    title: "Designing Data-Intensive Apps",
    author: "Martin Kleppmann",
    pages: 611,
    date: "Mar 2017",
    description:
      "The big ideas behind reliable, scalable, and maintainable systems for modern applications.",
  },
  {
    id: "003",
    isbn: "978-0132350884",
    title: "Refactoring",
    author: "Martin Fowler",
    pages: 448,
    date: "July 1999",
    description:
      "Improving the design of existing code through structured and safe code transformations.",
  },
]

export function CollectionDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span>Dashboard</span>
        <span className="text-muted-foreground/50">{">"}</span>
        <span className="text-primary">Collection</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Collection</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your digital library and book metadata with ease.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ISBN, title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80">
            <Plus className="h-4 w-4" />
            New Book
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.tag}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {stat.tag}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-border px-6 py-4">
          <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            ISBN / ID
          </div>
          <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Book Title & Author
          </div>
          <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Specifications
          </div>
          <div className="col-span-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Description
          </div>
          <div className="col-span-1 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Actions
          </div>
        </div>

        {/* Table Rows */}
        {books.map((book) => (
          <div
            key={book.id}
            className="grid grid-cols-12 items-center gap-4 border-b border-border px-6 py-5 transition-colors last:border-0 hover:bg-secondary/30"
          >
            <div className="col-span-2">
              <span className="font-mono text-[10px] font-bold text-primary">
                BOOK_ID: {book.id}
              </span>
              <p className="mt-1 font-mono text-sm text-muted-foreground">{book.isbn}</p>
            </div>
            <div className="col-span-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <FileText className="h-3.5 w-3.5" />
                {book.pages} Pages
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {book.date}
              </div>
            </div>
            <div className="col-span-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {book.description}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Table Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Showing <span className="font-bold text-foreground">1</span> to{" "}
            <span className="font-bold text-foreground">3</span> of{" "}
            <span className="font-bold text-foreground">124</span> books
          </span>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
