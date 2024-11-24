import { FaBicycle, FaClock, FaHeadset, FaArrowRight } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="text-white/80 mt-28 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-2 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-lime-500 text-white">
            Why Choose Us
          </p>
        </div>
        <h2 className="max-w-lg mb-6 text-custom-green font-teko text-5xl font-medium leading-none text-custom-gray sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-slate-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="fdca20a0-aeb4-4caf-ba1b-4351eee42363"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7"></circle>
                </pattern>
              </defs>
              <rect
                fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)"
                width="52"
                height="24"
              ></rect>
            </svg>
            <span className="relative">Experience</span>
          </span>{" "}
          the joy of riding with us
        </h2>
        <p className="text-base text-gray-400 md:text-lg">
          Discover why our bike rental service is the best choice for your next
          adventure. From top-quality bikes to exceptional customer service, we
          have everything you need to explore the city or countryside with ease
          and comfort.
        </p>
      </div>

      <div className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3 font-sans">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-transparent">
              <FaBicycle className="w-12 h-12 text-custom-green" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Top-Quality Bikes</h6>
            <p className="mb-3 text-sm text-white/80">
              Our bike rental service offers a wide range of top-quality bikes,
              regularly maintained to ensure your ride is smooth and enjoyable.
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                Mountain Bikes
              </li>
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                City Bikes
              </li>
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                Electric Bikes
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-transparent">
              <FaClock className="w-12 h-12 text-custom-green" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Flexible Rentals</h6>
            <p className="mb-3 text-sm text-white/80">
              Whether you need a bike for a few hours or a full day, our
              flexible rental options make it easy to enjoy your ride at your
              own pace.
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                Hourly Rentals
              </li>
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                Daily Rentals
              </li>
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                Weekly Rentals
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-transparent">
              <FaHeadset className="w-12 h-12 text-custom-green" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Unmatched Support</h6>
            <p className="mb-3 text-sm text-white/80">
              Our dedicated support team is always here to help, ensuring you
              have the best possible experience from start to finish.
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                24/7 Support
              </li>
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                On-Road Assistance
              </li>
              <li className="flex items-center">
                <span className="mr-1">
                  <FaArrowRight className="w-3 h-3 mt-px text-green-400" />
                </span>
                Maintenance Support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
