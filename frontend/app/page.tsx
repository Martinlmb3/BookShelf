import { Navbar } from "@/components/bookshop/navbar"
import { HeroSection } from "@/components/bookshop/hero-section"
import { RecentlyAdded } from "@/components/bookshop/recently-added"
import { CTASection } from "@/components/bookshop/cta-section"
import { Footer } from "@/components/bookshop/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="public" />
      <main>
        <HeroSection />
        <RecentlyAdded />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
