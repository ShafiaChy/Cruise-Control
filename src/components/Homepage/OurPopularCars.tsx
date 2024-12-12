
import { Swiper, SwiperSlide } from "swiper/react"; // Core components
import { Pagination } from "swiper/modules"; // Required module
import "swiper/css"; // Swiper core styles
import "swiper/css/pagination"; // Pagination styles
import { useGetAllCarsQuery } from "../../redux/features/Cars/CarsApi";
import { useAppSelector } from "../../redux/hooks";
import Spinner from "../Spinner";
import { TCar } from "../../types/car";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";



const OurPopularCars = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);
  const Cars = data?.data || [];
  console.log(Cars);
  const isUser = useAppSelector(useCurrentUser);

  if (isLoading) {
    return <Spinner />;
  }

  const availableCars = Cars
    .filter((Car: TCar) => Car.isAvailable)
    .slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <Swiper
        spaceBetween={30} // Space between cards
        slidesPerView={4} // Number of cards per slide
        pagination={{ clickable: true }} // Enable pagination
        modules={[Pagination]} // Include Pagination module
        className="mySwiper"
      >
        {availableCars.map((car: TCar, index:number) => (
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
                <span className="text-orange-600 text-lg font-semibold">{car.pricePerHour}/hr</span>
                <Link
                    to={isUser ? `/Car-details/${car._id}` : "/login"}
                    className="relative inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition-all duration-500 border border-custom-green rounded-none group-hover:bg-orange-600 group-hover:text-white focus:outline-none"
                  >
                     <button className="px-4 py-2 bg-transparent text-black border-1 border-black hover:bg-orange-600 hover:text-white hover:border-orange-500">
                  View
                </button>
                   
                  </Link>
               
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurPopularCars;
