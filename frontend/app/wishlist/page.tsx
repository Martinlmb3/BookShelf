import { Navbar } from "@/components/bookshop/navbar";
import { Footer } from "@/components/bookshop/footer";
import { WishlistContent } from "@/components/bookshop/wishlist-content";

export const metadata = {
  title: "Wishlist - BookShelf",
  description: "See all books you saved to your wishlist.",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="auth" />
      <main>
        <WishlistContent />
      </main>
      <Footer />
    </div>
  );
}
