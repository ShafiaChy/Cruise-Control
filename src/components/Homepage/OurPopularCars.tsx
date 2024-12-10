
import { Swiper, SwiperSlide } from "swiper/react"; // Core components
import { Pagination } from "swiper/modules"; // Required module
import "swiper/css"; // Swiper core styles
import "swiper/css/pagination"; // Pagination styles

const cars = [
  {
    name: "Subaru Liberty",
    price: "$665.00",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Pajero Range",
    price: "$340.00",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mirage Range",
    price: "$650.00",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mitsubishi Lancer",
    price: "$440.00",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Honda Accord",
    price: "$700.00",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Toyota Corolla",
    price: "$600.00",
    image: "https://via.placeholder.com/150",
  },
];

const OurPopularCars = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Swiper
        spaceBetween={30} // Space between cards
        slidesPerView={4} // Number of cards per slide
        pagination={{ clickable: true }} // Enable pagination
        modules={[Pagination]} // Include Pagination module
        className="mySwiper"
      >
        {cars.map((car, index) => (
          <SwiperSlide className="mb-10" key={index}>
            <div className="p-4 border rounded-lg shadow-lg">
              <img
                src={car.image}
                alt={car.name}
                className="h-40 mx-auto mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{car.name}</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✔ Budget Car</li>
                <li>✔ Automatic</li>
                <li>✔ Unlimited Mileage</li>
                <li>✔ Bluetooth</li>
                <li>✔ Chilled AC</li>
              </ul>
              <div className="flex justify-between items-center mt-4">
                <span className="text-orange-600 text-lg font-semibold">{car.price}</span>
                <button className="px-4 py-2 bg-transparent text-black border-1 border-black hover:bg-orange-600 hover:text-white hover:border-orange-500">
                  Rent It
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurPopularCars;
