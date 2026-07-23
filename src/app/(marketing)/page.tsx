import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base-void">
      <Navbar />
      <Hero />
      {/* Features, Pricing, Testimonials, FAQ sections continue the same
          token system — build these next as the same rise-in + glass-card
          pattern established above. */}
    </main>
  );
}
