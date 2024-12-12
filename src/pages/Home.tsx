// import { Navbar } from "../components/Navbar";

import AboutServices from "../components/Homepage/AboutServices";
import ContactSection from "../components/Homepage/ContactSection";
import Demo from "../components/Homepage/Demo";
import FAQSection from "../components/Homepage/FAQSection";
import HeroSection from "../components/Homepage/HeroSection";
import OurPopularCars from "../components/Homepage/OurPopularCars";
import Testimonial from "../components/Homepage/Testimonial";
import WorkingSteps from "../components/Homepage/WorkingSteps";

export const Home = () => {
  return (
    <div className=" w-full mx-auto">
      <HeroSection />
      <div className="lg:w-11/12 w-full mx-auto">
        <WorkingSteps></WorkingSteps>
        <AboutServices></AboutServices>
        <OurPopularCars />
        <Demo></Demo>
        <FAQSection></FAQSection>
        <Testimonial />
        <ContactSection />
      </div>
    </div>
  );
};
