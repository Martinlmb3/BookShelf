"use client"

import { useState, useRef, useEffect } from "react"
import { BookOpen, Plus, Send, Sparkles, User, ChevronRight } from "lucide-react"

const mockBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Modernist Fiction", published: "April 10, 1925", setting: "Long Island, NY (1922)", themes: ["The American Dream", "Social Class", "Love & Obsession"] },
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian Fiction", published: "June 8, 1949", setting: "Airstrip One, Oceania", themes: ["Totalitarianism", "Surveillance", "Freedom"] },
  { id: 3, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", published: "October 16, 2018", setting: "N/A", themes: ["Habit Formation", "Behaviour Change", "Productivity"] },
  { id: 4, title: "Project Hail Mary", author: "Andy Weir", genre: "Science Fiction", published: "May 4, 2021", setting: "Deep Space", themes: ["Survival", "Science", "Friendship"] },
]

const suggestedQuestions = [
  "Summarize this book",
  "Who are the main characters?",
  "What are the key themes?",
  "Give me a chapter overview",
]

type Message = {
  role: "ai" | "user"
  content: string
}

const initialMessage = (title: string): Message => ({
  role: "ai",
  content: `I've loaded '${title}'. I'm ready to help you explore the themes, characters, and plot. What would you like to dive into first?`,
})

export function AskMyBook() {
  const [selectedBook, setSelectedBook] = useState(mockBooks[0])
  const [messages, setMessages] = useState<Message[]>([initialMessage(mockBooks[0].title)])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function selectBook(book: typeof mockBooks[0]) {
    setSelectedBook(book)
    setMessages([initialMessage(book.title)])
  }

  function sendMessage(text: string) {
    if (!text.trim() || isLoading) return
    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    // Simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `That's a great question about "${selectedBook.title}". This is a simulated response — once the AI backend is connected, you'll get a real answer here.`,
        },
      ])
      setIsLoading(false)
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage(input)
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-65px)] max-w-7xl gap-0 overflow-hidden px-4 py-6 lg:px-8">
      {/* Left sidebar — Library */}
      <aside className="flex w-64 shrink-0 flex-col rounded-xl border border-border bg-card mr-4">
        <div className="border-b border-border px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Your Library
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">Select a book to chat with AI</p>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {mockBooks.map((book) => (
            <button
              key={book.id}
              onClick={() => selectBook(book)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50 ${
                selectedBook.id === book.id ? "bg-secondary/80" : ""
              }`}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                selectedBook.id === book.id ? "bg-accent/20" : "bg-secondary"
              }`}>
                <BookOpen className={`h-4 w-4 ${selectedBook.id === book.id ? "text-accent" : "text-muted-foreground"}`} />
              </div>
              <div className="min-w-0">
                <p className={`truncate text-sm font-semibold ${selectedBook.id === book.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {book.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">{book.author}</p>
              </div>
              {selectedBook.id === book.id && (
                <ChevronRight className="ml-auto h-3 w-3 shrink-0 text-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80">
            <Plus className="h-4 w-4" />
            Add New Book
          </button>
        </div>
      </aside>

      {/* Center — Chat */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card mr-4">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground">BookAI Assistant</p>
            <p className="text-xs text-muted-foreground">
              Currently analysing{" "}
              <span className="font-medium text-accent">{selectedBook.title}</span>
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === "ai" ? "bg-accent/20" : "bg-secondary"
              }`}>
                {msg.role === "ai"
                  ? <Sparkles className="h-4 w-4 text-accent" />
                  : <User className="h-4 w-4 text-muted-foreground" />
                }
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "ai"
                  ? "bg-secondary text-foreground"
                  : "bg-accent text-accent-foreground"
              }`}>
                {msg.role === "ai" && (
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-accent">BookAI</p>
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        <div className="border-t border-border px-6 py-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Suggested Questions
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask anything about '${selectedBook.title}'...`}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-accent/80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right sidebar — Book Metadata */}
      <aside className="hidden w-56 shrink-0 flex-col rounded-xl border border-border bg-card xl:flex">
        <div className="border-b border-border px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Book Metadata
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Cover placeholder */}
          <div className="flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-secondary">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Published</p>
            <p className="mt-1 text-sm text-foreground">{selectedBook.published}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Genre</p>
            <p className="mt-1 text-sm text-foreground">{selectedBook.genre}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Setting</p>
            <p className="mt-1 text-sm text-foreground">{selectedBook.setting}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Key Themes Found</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedBook.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
