import { Footer } from "@/components/bookshop/footer";
import { LikedContent } from "@/components/bookshop/liked-content";
import { Navbar } from "@/components/bookshop/navbar";

export const metadata = {
  title: "Liked Books - BookShelf",
  description: "Your personal liked books dashboard.",
};

export default function LikedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="auth" />
      <main>
        <LikedContent />
      </main>
      <Footer />
    </div>
  );
}
