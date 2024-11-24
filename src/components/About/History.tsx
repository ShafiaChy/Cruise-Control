const History = () => {
  return (
    <div className="my-36 lg:w-10/12 w-full  bg-transparent mx-auto h-full">
      <h2 className="text-center text-5xl font-medium font-teko text-custom-green pb-12">
        Company History
      </h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2 absolute border-opacity-20 border-gray-700 h-full   left-1/2"></div>

        {/* <!-- Milestone 1 --> */}
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-custom-green shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
          </div>
          <div className="order-1 bg-gray-300 rounded-none shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-medium font-teko text-custom-green text-2xl">
              Founding Year - 2015
            </h3>
            <p className="text-sm leading-snug tracking-wide text-gray-800 text-opacity-100">
              Our bike rental service began in 2015 with just a handful of bikes
              and a mission to make city commuting eco-friendly and enjoyable.
              The early days were challenging, but our passion kept us moving
              forward.
            </p>
          </div>
        </div>

        {/* <!-- Milestone 2 --> */}
        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-custom-green shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
          </div>
          <div className="order-1 bg-gray-300 rounded-none shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-medium font-teko text-custom-green text-2xl">
              Expansion - 2017
            </h3>
            <p className="text-sm font-medium leading-snug tracking-wide text-gray-800 text-opacity-100">
              By 2017, we expanded our fleet and opened additional rental
              locations across the city. This growth was fueled by our
              customers' love for exploring new areas on two wheels.
            </p>
          </div>
        </div>

        {/* <!-- Milestone 3 --> */}
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-custom-green shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
          </div>
          <div className="order-1 bg-gray-300 rounded-none shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-medium font-teko text-custom-green text-2xl">
              Innovation - 2019
            </h3>
            <p className="text-sm leading-snug tracking-wide text-gray-800 text-opacity-100">
              In 2019, we introduced electric bikes to our lineup, offering a
              more sustainable and accessible option for all types of riders.
              This innovation marked a significant step in our journey.
            </p>
          </div>
        </div>

        {/* <!-- Milestone 4 --> */}
        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-custom-green shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
          </div>
          <div className="order-1 bg-gray-300 rounded-none shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-medium font-teko text-custom-green text-2xl">
              Today - 2024
            </h3>
            <p className="text-sm font-medium leading-snug tracking-wide text-gray-800 text-opacity-100">
              Today, we are proud to be one of the leading bike rental services,
              known for our quality, service, and commitment to sustainability.
              Our journey continues as we explore new ways to enhance the biking
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default History;
