import Hero from "@/components/landing/Hero";
import WhoAreWe from "@/components/landing/WhoAreWe";
import Packs from "@/components/landing/Packs";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhoAreWe />
      <Packs />
      <Newsletter />
      <Footer />
    </main>
  );
}