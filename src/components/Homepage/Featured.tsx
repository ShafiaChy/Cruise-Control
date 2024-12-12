import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/Cars/CarsApi";
import { TCar } from "../../types/car";
import Spinner from "../Spinner";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const CarGrid = () => {
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
    <div className="bg-transparent mt-24 mx-auto">
      <div className="mx-auto px-0 py-8">
        <h1 className="text-7xl text-orange-600 font-medium font-teko text-center my-12">
          Our Featured Cars
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {availableCars.map((Car: TCar) => (
            <div
              key={Car._id}
              className="relative overflow-hidden rounded-none shadow-lg group"
            >
              <img
                src={Car.image}
                alt={Car.name}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-10 left-0 right-0 p-4">
                  <h3 className="text-2xl font-bold text-white">{Car.name}</h3>
                  <p className="text-white">{Car.brand}</p>

                  <Link
                    to={isUser ? `/Car-details/${Car._id}` : "/login"}
                    className="relative inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition-all duration-500 border border-custom-green rounded-none group-hover:bg-orange-600 group-hover:text-white focus:outline-none"
                  >
                    View Detail
                    <span className="absolute inset-0 transition-all duration-500 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 origin-left z-[-1]"></span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarGrid;
