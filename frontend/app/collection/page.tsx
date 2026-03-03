import { Navbar } from "@/components/bookshop/navbar"
import { CollectionDashboard } from "@/components/bookshop/collection-dashboard"
import { Footer } from "@/components/bookshop/footer"

export const metadata = {
  title: "My Collection - BookShop",
  description: "Manage your digital library and book metadata with ease.",
}

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="auth" />
      <main>
        <CollectionDashboard />
      </main>
      <Footer />
    </div>
  )
}
