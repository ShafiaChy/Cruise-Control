// import { Navbar } from "../components/Navbar";

import ContactSection from "../components/Homepage/ContactSection";
import Featured from "../components/Homepage/Featured";
import HeroSection from "../components/Homepage/HeroSection";
import Testimonial from "../components/Homepage/Testimonial";
import WhyChooseUs from "../components/Homepage/WhyChooseUs";

export const Home = () => {
  return (
    <div className=" w-full mx-auto">
      <HeroSection />
      <div className="lg:w-11/12 w-full mx-auto">
        <Featured />
        <WhyChooseUs />
        <Testimonial />
        <ContactSection />
      </div>
    </div>
  );
};
