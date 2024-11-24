import about from "/about.jpg";
const Mission = () => {
  return (
    <div>
      <div className="pt-44 bg-transparent">
        <div className="container m-auto px-6 text-white md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
              <img
                src={about}
                alt="RideOn Rental Service"
                loading="lazy"
                className="w-full h-84"
              />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-custom-green font-medium font-teko md:text-4xl">
                RideOn Rental Service
              </h2>
              <p className="mt-6 text-gray-300">
                At RideOn, we believe in making every journey an adventure.
                Founded with a passion for riding and a commitment to quality,
                we offer a diverse range of bikes to suit every rider's needs.
                From city cruisers to mountain conquerors, our fleet is
                meticulously maintained to ensure a smooth and safe ride every
                time.
              </p>
              <p className="mt-4 text-gray-300">
                Our goal is simple: to provide a seamless and enjoyable rental
                experience. Whether you're a seasoned rider or a first-time
                explorer, RideOn is here to help you discover the joy of biking.
                We’re not just a rental service—we’re a community of enthusiasts
                dedicated to supporting your passion for exploration. Join us
                and RideOn towards new horizons!
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-40 bg-transparent py-10 text-white/80">
        <div className="container mx-auto w-full max-w-screen-xl">
          <div className="w-full">
            <h2 className="text-center text-5xl font-medium font-teko text-custom-green">
              Our Mission
            </h2>
            <p className="mx-auto mb-4 max-w-xl py-2 text-center text-gray-400 sm:text-lg">
              At the core of everything we do, our values guide us to deliver
              exceptional service, innovate continuously, and foster a community
              of responsible riders.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/3 bg-custom-green border-custom-green" />
              <h3 className="font-teko text-4xl font-light leading-10">
                INNOVATE.
              </h3>
              <p className="my-5 text-gray-300">
                We are committed to pushing the boundaries of what's possible.
                Whether through the introduction of electric bikes or the latest
                in safety technology, we strive to bring cutting-edge solutions
                to enhance your riding experience.
              </p>
            </div>
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/3 bg-custom-green border-custom-green" />
              <h3 className="font-teko text-4xl font-light leading-10">
                GROW.
              </h3>
              <p className="my-5 text-gray-300">
                Growth is about more than just expanding our fleet. It’s about
                learning from our customers, improving our services, and
                contributing positively to the communities we serve.
              </p>
            </div>
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/3 bg-custom-green border-custom-green" />
              <h3 className="font-teko text-4xl font-light leading-10">
                SERVE.
              </h3>
              <p className="my-5 text-gray-300">
                We believe in serving our customers with integrity and
                dedication. From the moment you rent a bike to the time you
                return it, we’re here to ensure a smooth and enjoyable
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
