import { Navbar } from "@/components/bookshop/navbar"
import { AskMyBook } from "@/components/bookshop/ask-my-book"

export const metadata = {
  title: "Ask My Book - BookShelf",
  description: "Chat with AI about any book in your collection.",
}

export default function AskMyBookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="auth" />
      <main>
        <AskMyBook />
      </main>
    </div>
  )
}
