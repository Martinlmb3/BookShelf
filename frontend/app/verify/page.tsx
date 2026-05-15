import { Suspense } from "react";
import { Navbar } from "@/components/bookshop/navbar";
import { VerifyForm } from "@/components/bookshop/verify-form";
import { Footer } from "@/components/bookshop/footer";

export const metadata = {
  title: "Verify Email — BookShelf",
  description: "Verify your email address to complete registration",
};

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar variant="public" />
      <Suspense>
        <VerifyForm />
      </Suspense>
      <Footer />
    </div>
  );
}
