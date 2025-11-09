import Hero from "../components/Hero";
import KeyFeatures from "../components/KeyFeatures";
import PopularCategories from "../components/PopularCategories";
import SampleComparison from "../components/SampleComparison";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <KeyFeatures />
      <PopularCategories />
      <SampleComparison />
      <Testimonials />
      <Footer />
    </div>
  );
}