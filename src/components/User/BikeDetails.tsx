import { useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/features/bikes/bikesApi";
import { useState } from "react";
import Spinner from "../Spinner";
import LoadingError from "../LoadingError";
import { TBike } from "../../types/bike";
import PaymentModal from "../Payment/PaymentModal";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const BikeDetails = () => {
  const { bikeId } = useParams();
  const { data, error, isLoading } = useGetBikeByIdQuery(bikeId);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const isUser = useAppSelector(useCurrentUser);

  const defaultImageUrl =
    "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW90b3JiaWtlfGVufDB8fDB8fHww";

  if (isLoading) return <Spinner />;
  if (error || !data) {
    return <LoadingError />;
  }

  const bike: TBike = data.data;

  return (
    // <section className="w-11/12 mx-auto my-28">
    <section className={`w-11/12 mx-auto ${isUser ? "mt-28 h-screen" : ""}`}>
      <div className="m-4 mx-auto max-w-screen-lg text-white shadow-2xl">
        <div className="relative flex h-full flex-col-reverse md:flex-row">
          <div className="relative p-8 md:w-4/6">
            <div className="flex flex-col md:flex-row">
              <h2 className="mb-2 text-4xl font-teko">{bike.name}</h2>
              <span className="ml-4 text-sm uppercase text-custom-green">
                {bike.brand}
              </span>
            </div>
            <p className="mt-3 text-base tracking-normal">{bike.description}</p>
            <div className="flex flex-col md:flex-row md:items-end">
              <p className="mt-6 text-4xl font-black">
                ${bike.pricePerHour}
                <sup className="align-super text-sm">/hr</sup>
              </p>
              <span className="ml-4 text-sm uppercase">
                CC: {bike.cc} | Year: {bike.year}
              </span>
            </div>
            <div className="mt-6">
              <p
                className={`text-lg font-normal ${
                  bike.isAvailable ? "text-custom-green" : "text-red-700"
                }`}
              >
                {bike.isAvailable ? "Available" : "Unavailable"}
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row">
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={!bike.isAvailable}
                className={`relative px-24 py-1 text-base rounded-none isolation-auto z-10 border overflow-hidden ${
                  bike.isAvailable
                    ? "bg-white/90 text-gray-800 border-gray-900 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-custom-green before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-500 focus:outline-none"
                    : "bg-gray-300 text-gray-500 border-gray-500 cursor-not-allowed"
                }`}
              >
                {bike.isAvailable ? "Book Now" : "Not Available"}
              </button>
            </div>
          </div>
          <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
            <img
              className="block h-72 max-w-full rounded-none shadow-2xl"
              src={bike.image || defaultImageUrl}
              alt={bike.name}
            />
          </div>
        </div>
      </div>
      {bikeId && (
        <PaymentModal
          isOpen={showPaymentModal}
          setIsOpen={setShowPaymentModal}
          bikeId={bikeId}
        />
      )}
    </section>
  );
};

export default BikeDetails;
