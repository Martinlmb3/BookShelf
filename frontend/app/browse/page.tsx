import { Navbar } from "@/components/bookshop/navbar"
import { BrowseContent } from "@/components/bookshop/browse-content"
import { Footer } from "@/components/bookshop/footer"

export const metadata = {
  title: "Browse Library - BookShelf",
  description: "Browse and discover books in the BookShelf library catalog.",
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="auth" />
      <main>
        <BrowseContent />
      </main>
      <Footer />
    </div>
  )
}
