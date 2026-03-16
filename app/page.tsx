import Hero from "@/components/Hero";
import WhyThisMatters from "@/components/WhyThisMatters";
import ExampleReport from "@/components/ExampleReport";
import WhyIBuiltThis from "@/components/WhyIBuiltThis";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyThisMatters />
      <ExampleReport />
      <WhyIBuiltThis />
      <Footer />
    </main>
  );
}
