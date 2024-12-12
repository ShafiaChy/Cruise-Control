import { useState } from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TMyRental } from "../../types/myRental";
import { useGetRentalsQuery } from "../../redux/features/rentals/rentalApi";

const MyRentalsPage = () => {
  const [activeTab, setActiveTab] = useState<"Paid" | "Unpaid">("Unpaid");
  const { data: rentalsResponse = { data: [] }, error } =
    useGetRentalsQuery(undefined);

  const rentals = rentalsResponse.data;

  const handleTabClick = (tab: "Paid" | "Unpaid") => {
    setActiveTab(tab);
  };

  // Filter the rentals based on the selected tab
  const filteredRentals = rentals.filter((rental: TMyRental) => {
    if (activeTab === "Paid") {
      return rental.paymentStatus === "paid";
    } else {
      return rental.paymentStatus === "advanced";
    }
  });
  console.log(filteredRentals, error);
  return (
    <div>
      <div className="flex justify-center mb-4 pb-0 border-b border-gray-700/60">
        <button
          className={`inline-flex items-center h-10 w-36 justify-center py-2 text-center  whitespace-nowrap sm:px-4 bg-transparent border-none  rounded-none focus:outline-none hover:shadow-xl hover:shadow-black/20 ${
            activeTab === "Unpaid" ? "text-orange-600" : "text-gray-400"
          }`}
          onClick={() => handleTabClick("Unpaid")}
        >
          <FaExclamationCircle className="mx-1 sm:mx-2" />
          <span className="mx-1 text-sm sm:text-base">Unpaid</span>
        </button>

        <button
          className={`inline-flex items-center h-10 w-36 justify-center py-2 text-center  whitespace-nowrap sm:px-4 bg-transparent border-none  rounded-none focus:outline-none hover:shadow-xl hover:shadow-black/20 ${
            activeTab === "Paid" ? "text-orange-600" : "text-gray-400"
          }`}
          onClick={() => handleTabClick("Paid")}
        >
          <FaCheckCircle className="mx-1 sm:mx-2" />
          <span className="mx-1 text-sm sm:text-base">Paid</span>
        </button>
      </div>

      <div className="tab-content mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRentals.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No rentals found.
          </p>
        )}

        {filteredRentals.map((rental: TMyRental) => (
          <div
            key={rental._id}
            className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
          >
            <div
              className="w-full bg-gray-300 bg-center bg-cover rounded-none shadow-md h-48"
              style={{
                backgroundImage: `url(${rental?.carId?.image})`,
              }}
            ></div>

            <div className="w-10/12 -mt-11 overflow-hidden bg-orange-600 rounded-sm shadow-lg">
              <h3 className="py-2 font-bold text-center text-gray-700 uppercase text-xl">
                {rental.carId.name}
              </h3>

              <div className="flex flex-col justify-between px-3 py-2 bg-gray-100 text-gray-800 rounded-none">
                <div className="mb-2">
                  <p className="text-sm text-gray-600">
                    Start Time: {new Date(rental.startTime).toLocaleString()}
                  </p>
                  {rental.returnTime ? (
                    <p className="text-sm text-gray-600">
                      Return Time:{" "}
                      {new Date(rental.returnTime).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500">Not returned yet</p>
                  )}
                </div>
                {/* <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-gray-800">
                    Cost: $
                    {rental.returnTime ? rental.totalCost : "100 (Advanced)"}
                  </span>
                  {rental.isReturned && rental.paymentStatus === "advanced" && (
                    <Link
                      to="../payment"
                      state={{
                        amount: rental.totalCost - 100,
                        carId: rental.carId._id,
                        rentalId: rental._id,
                        isRemainderPayment: true,
                      }}
                      className="px-2 py-1 text-sm rounded-none text-white uppercase transition-colors duration-300 transform bg-orange-600 hover:bg-green-700 focus:outline-none"
                    >
                      Pay Now
                    </Link>
                  )}
                </div> */}

                {/* <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-gray-800">
                    Cost: $
                    {rental.returnTime ? rental.totalCost : "100 (Advanced)"}
                  </span>
                  {rental.returnTime && (
                    <>
                      {rental.totalCost < 100 ? (
                        <span className="text-sm font-semibold text-blue-600">
                          Change Due: ${100 - rental.totalCost}
                        </span>
                      ) : (
                        <Link
                          to="../payment"
                          state={{
                            amount: rental.totalCost - 100,
                            carId: rental.carId._id,
                            rentalId: rental._id,
                            isRemainderPayment: true,
                          }}
                          className="px-2 py-1 text-sm rounded-none text-white uppercase transition-colors duration-300 transform bg-orange-600 hover:bg-green-700 focus:outline-none"
                        >
                          Pay Now
                        </Link>
                      )}
                    </>
                  )}
                </div> */}

                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-gray-800">
                    Cost: $
                    {rental.returnTime ? rental.totalCost : "100 (Advanced)"}
                  </span>

                  {rental.returnTime && (
                    <>
                      {rental.paymentStatus === "paid" ? (
                        rental.totalCost < 100 ? (
                          <span className="text-sm font-semibold text-blue-600">
                            Change: ${100 - rental.totalCost}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-green-600">
                            Fully Paid
                          </span>
                        )
                      ) : rental.paymentStatus === "advanced" ? (
                        rental.totalCost > 100 && (
                          <Link
                            to="../payment"
                            state={{
                              amount: rental.totalCost - 100,
                              carId: rental.carId._id,
                              rentalId: rental._id,
                              isRemainderPayment: true,
                            }}
                            className="px-2 py-1 text-sm rounded-none text-white uppercase transition-colors duration-300 transform bg-orange-600 hover:bg-green-700 focus:outline-none"
                          >
                            Pay Now
                          </Link>
                        )
                      ) : (
                        <span className="text-sm font-semibold text-gray-600">
                          Payment Pending
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRentalsPage;
