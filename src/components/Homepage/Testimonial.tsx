const Testimonial = () => {
  return (
    <div className="my-32">
      <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center lg:gap-24 md:gap-16 gap-8">
          <div className="space-y-6 bg-gray-100/80 rounded-none p-6">
            <div className="flex sm:items-center max-sm:flex-col-reverse">
              <div className="mr-3">
                <h4 className="text-custom-green text-2xl font-teko">
                  John Doe
                </h4>
                <p className="text-sm text-gray-800 mt-2">
                  Renting a bike from this service was an absolute pleasure! The
                  process was seamless, and the bike was in top condition. I
                  rode around the city without a hitch. Highly recommended!
                </p>
              </div>
              <img
                src="https://readymadeui.com/profile_2.webp"
                className="w-16 h-16 rounded-full max-sm:mb-2"
              />
            </div>

            <div className="flex sm:items-center max-sm:flex-col-reverse p-6 relative md:left-12 bg-white shadow-[0_2px_20px_-4px_rgba(93,96,127,0.2)] rounded-lg">
              <div className="mr-3">
                <h4 className="text-custom-green text-2xl font-teko">
                  Mark Adair
                </h4>
                <p className="text-sm text-gray-800 mt-2">
                  I rented a mountain bike for a weekend trip, and it was
                  perfect for the trails. The customer service was excellent,
                  and they even provided me with a map of the best routes. I'll
                  definitely rent from them again!
                </p>
              </div>
              <img
                src="https://readymadeui.com/profile_3.webp"
                className="w-16 h-16 rounded-full max-sm:mb-2"
              />
            </div>

            <div className="flex sm:items-center max-sm:flex-col-reverse">
              <div className="mr-3">
                <h4 className="text-custom-green text-2xl font-teko">
                  Simon Konecki
                </h4>
                <p className="text-sm text-gray-800 mt-2">
                  The electric bike I rented was fantastic! It made my commute
                  around the city so much easier and more enjoyable. The staff
                  was friendly and provided great tips on battery management. A+
                  service!
                </p>
              </div>
              <img
                src="https://readymadeui.com/profile_4.webp"
                className="w-16 h-16 rounded-full max-sm:mb-2"
              />
            </div>
          </div>

          <div className="max-md:-order-1">
            <h6 className="text-3xl font-teko font-medium tracking-wide text-gray-100">
              Testimonials
            </h6>
            <h2 className="text-custom-green font-teko text-6xl font-medium mt-4">
              We are loyal to our customers
            </h2>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Our customers trust us for a reason. We provide high-quality bikes
              and excellent customer service to ensure your experience is
              nothing short of exceptional. Hear from our happy customers who
              have enjoyed exploring with our bikes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
