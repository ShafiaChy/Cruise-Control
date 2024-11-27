// import { Navbar } from "../components/Navbar";

import ContactSection from "../components/Homepage/ContactSection";
import Featured from "../components/Homepage/Featured";
import HeroSection from "../components/Homepage/HeroSection";
import Testimonial from "../components/Homepage/Testimonial";
import WhyChooseUs from "../components/Homepage/WhyChooseUs";
import WorkingSteps from "../components/Homepage/WorkingSteps";

export const Home = () => {
  return (
    <div className=" w-full mx-auto">
      <HeroSection />
      <div className="lg:w-11/12 w-full mx-auto">
        <WorkingSteps></WorkingSteps>
        <Featured />
        <WhyChooseUs />
        <Testimonial />
        <ContactSection />
      </div>
    </div>
  );
};
