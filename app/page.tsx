import Hero from "@/components/Hero";
import WhyThisMatters from "@/components/WhyThisMatters";
import ExampleReport from "@/components/ExampleReport";
import Pricing from "@/components/Pricing";
import WhyIBuiltThis from "@/components/WhyIBuiltThis";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyThisMatters />
      <ExampleReport />
      <Pricing />
      <WhyIBuiltThis />
      <Footer />
    </main>
  );
}
