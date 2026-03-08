import { Navbar } from "@/components/bookshop/navbar"
import { Footer } from "@/components/bookshop/footer"
import { BookOpen, Users, Sparkles, LogIn, PlusCircle, Library } from "lucide-react"

const steps = [
  {
    icon: LogIn,
    title: "Create an account & log in",
    description:
      "Sign up with your name, email, and a password. Once registered, log in to access your personal library dashboard.",
  },
  {
    icon: PlusCircle,
    title: "Add books to your collection",
    description:
      "Use the Add Book page to add any book you want — enter the title, author, cover, and a short description. Your books are saved to your personal collection.",
  },
  {
    icon: Library,
    title: "Browse the community library",
    description:
      "The Browse page shows books added by all users. Discover what other readers are collecting and explore new titles you might enjoy.",
  },
  {
    icon: Sparkles,
    title: "Get an AI-generated summary",
    description:
      "On any book page, use the AI Summary feature to instantly generate a concise overview of the book — useful before deciding to read it.",
  },
]

const features = [
  {
    icon: BookOpen,
    title: "Personal collection",
    description: "Your own library of books, always accessible after logging in.",
  },
  {
    icon: Users,
    title: "Community browsing",
    description: "See books shared by every user on the platform in one shared feed.",
  },
  {
    icon: Sparkles,
    title: "AI summaries",
    description: "Claude-powered summaries generated on demand for any book.",
  },
]

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="public" />

      <main className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-foreground">Documentation</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Everything you need to know about BookShelf.
          </p>
        </div>

        {/* What is BookShelf */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold text-foreground">What is BookShelf?</h2>
          <p className="text-muted-foreground leading-relaxed">
            BookShelf is a community-driven digital library platform. You create an account,
            add the books you love or are reading, and they become visible to the whole
            community. Every user can browse books added by others, and anyone can request
            an AI-generated summary for any book — powered by Claude — to get a quick
            overview before diving in.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="mb-8 text-2xl font-bold text-foreground">How it works</h2>
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex gap-5 rounded-xl border border-border bg-card p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        STEP {i + 1}
                      </span>
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Key features */}
        <section className="mb-14">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Key features</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tech stack note */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Tech stack</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Frontend —</span> Next.js with
                Tailwind CSS
              </li>
              <li>
                <span className="font-medium text-foreground">Backend —</span> Spring Boot
                (Java) with Spring Security and JWT authentication
              </li>
              <li>
                <span className="font-medium text-foreground">AI summaries —</span> Claude
                API (Anthropic)
              </li>
              <li>
                <span className="font-medium text-foreground">Authentication —</span> Email
                verification + JWT tokens
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
