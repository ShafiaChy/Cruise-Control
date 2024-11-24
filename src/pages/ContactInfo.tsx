const ContactInfo = () => {
  return (
    <div>
      <section className="my-40 lg:w-11/12 w-full mx-auto">
        <h2 className="text-center text-5xl font-medium font-teko text-custom-green mb-16">
          Our Contact Information
        </h2>
        <div
          id="map"
          className="relative h-[400px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
            width="100%"
            height="480"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
        <div className="container px-6 md:px-24">
          <div className="block  bg-white/90 px-6 py-12 shadow-lg md:py-16 md:px-12 -mt-[200px] backdrop-blur-md border border-none">
            <div className="flex flex-wrap">
              <div className="mb-12 w-full md:w-5/12 lg:w-5/12 px-3 lg:px-6">
                <form>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      className="peer block w-full border-b border-gray-500 bg-transparent py-2 px-3 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 focus:text-custom-green"
                      id="name"
                    />
                    <label
                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-0 truncate pt-1.5 leading-6 text-gray-600 transition-all duration-200 ease-out peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-custom-green"
                      htmlFor="name"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="email"
                      className="peer block w-full border-b border-gray-500 bg-transparent py-2 px-3 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 focus:text-custom-green"
                      id="email"
                    />
                    <label
                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-0 truncate pt-1.5 leading-6 text-gray-600 transition-all duration-200 ease-out peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-custom-green"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="relative mb-6">
                    <textarea
                      className="peer block w-full border-b border-gray-500 bg-transparent py-2 px-3 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 focus:text-custom-green"
                      id="message"
                      rows={3}
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-0 truncate pt-1.5 leading-6 text-gray-600 transition-all duration-200 ease-out peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-custom-green"
                    >
                      Message
                    </label>
                  </div>

                  <button
                    type="button"
                    className="mb-6 w-full rounded-none  bg-custom-green text-white px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal hover:bg-green-600 transition duration-300 lg:mb-0"
                  >
                    Send
                  </button>
                </form>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="flex flex-wrap">
                  <div className="mb-12 w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 lg:px-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block  -md bg-transparent p-4 text-custom-green">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold">Technical support</p>
                        <p className="text-sm text-gray-600">
                          support@rideon.com
                        </p>
                        <p className="text-sm text-gray-600">1-800-123-4567</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-12 w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 lg:px-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block  -md bg-transparent p-4 text-custom-green">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold">Address</p>
                        <p className="text-sm text-gray-600">
                          123 RideOn St., <br />
                          Cityville, ST 12345
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-12 w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 lg:px-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block  -md bg-transparent p-4 text-custom-green">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold">Land Line</p>
                        <p className="text-gray-600"> (0123) 456-7890</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-full xl:mb-12 xl:w-6/12 px-3 lg:px-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block  -md bg-transparent p-4 text-custom-green">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold">Mobile</p>
                        <p className="text-gray-600"> +1 987-654-3210</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactInfo;
