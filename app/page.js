import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Discover from "@/components/Discover";
import Plans from "@/components/Plans";
import Coach from "@/components/Coach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Discover />
        <Plans />
        <Coach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}