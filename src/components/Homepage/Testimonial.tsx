
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  feedback: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Leslie Alexander",
    role: "Project Manager",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
    rating: 5,
    feedback:
      "Renting a car from Nova Ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
  },
  {
    name: "Alis White",
    role: "Project Manager",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
    rating: 4,
    feedback:
      "Renting a car from Nova Ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
  },
  {
    name: "Floyd Miles",
    role: "Project Manager",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
    rating: 5,
    feedback:
      "Renting a car from Nova Ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
  },
  {
    name: "Floyd Miles",
    role: "Project Manager",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
    rating: 5,
    feedback:
      "Renting a car from Nova Ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
  },
];

const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-orange-600 ${i < rating ? "" : "opacity-50"}`}>
        ★
      </span>
    ));
  };

  return (
    <div className=" text-black py-16 px-8">
      <div className="text-center mb-12">
        <p className="text-orange-600 font-bold">★ Testimonials</p>
        <h2 className="text-4xl font-bold mt-2">
          What our customers are saying about us
        </h2>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className=" p-6 rounded-lg shadow-lg">
              <div className="mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-black mb-6">{testimonial.feedback}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
                <div className="ml-4">
                  <p className="font-bold text-orange-600">{testimonial.name}</p>
                  <p className="text-black">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSection;
