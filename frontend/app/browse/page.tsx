import { Navbar } from "@/components/bookshop/navbar"
import { BrowseContent } from "@/components/bookshop/browse-content"
import { Footer } from "@/components/bookshop/footer"

export const metadata = {
  title: "Browse Library - BookShop",
  description: "Browse and discover books in the BookShop library catalog.",
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
