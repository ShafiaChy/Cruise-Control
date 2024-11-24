import { ChangeEvent, useState } from "react";
import {
  useGetAllRentalsQuery,
  useReturnBikeMutation,
} from "../../redux/features/rentals/rentalApi";
import { toast } from "sonner";
import Spinner from "../Spinner";
import LoadingError from "../LoadingError";
import { TAdminRental } from "../../types/myRental";

const RentalManagement = () => {
  const {
    data: rentalsResponse,
    error,
    isLoading,
    refetch,
  } = useGetAllRentalsQuery(undefined);
  const [returnBike] = useReturnBikeMutation();

  const rentals = rentalsResponse?.data || [];
  const [search, setSearch] = useState("");
  console.log(rentals);

  const handleReturnBike = async (rentalId: string) => {
    // const returnTime = new Date();
    const toastId = toast.loading("Processing return...");
    try {
      // await returnBike({ rentalId, returnTime }).unwrap();
      await returnBike(rentalId).unwrap();
      toast.success("Bike returned successfully!", {
        id: toastId,
        duration: 2000,
        className: "text-custom-green",
      });
      refetch();
    } catch (error) {
      console.error("Failed to return bike:", error);
      toast.error("Failed to return bike", {
        id: toastId,
        duration: 2000,
        className: "text-red-700",
      });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredRentals = rentals.filter(
    (rental: TAdminRental) =>
      rental.bikeId?.name.toLowerCase().includes(search.toLowerCase()) ||
      rental._id.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-screen-lg bg-transparent">
      <div className="md:flex md:items-center md:justify-between flex-col md:flex-row">
        <p className="flex-1 text-base font-semibold text-gray-300">
          Number of Rentals: {filteredRentals.length}
        </p>
        <div className="my-4   md:mt-0 text-white w-full md:w-4/12">
          <div className="flex md:flex-row flex-col justify-center items-center">
            <label className="mb-2 sm:mb-0 sm:mr-2 text-base font-medium text-white">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search by Rental ID or Bike Name"
              value={search}
              onChange={handleSearchChange}
              className="block w-full rounded-none border-transparent bg-gray-100 text-gray-800 p-1 pr-10 text-base outline-none focus:shadow sm:text-sm hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <LoadingError />
      ) : filteredRentals.length === 0 ? (
        <div className="flex justify-center items-center py-6 mt-12">
          <div className="bg-transparent text-white text-2xl px-4 py-3">
            <strong className="font-bold">No Data Found</strong>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-none shadow bg-gray-300">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200">
            <table className="min-w-full border-collapse border border-black/80 whitespace-nowrap">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2 text-sm font-medium text-gray-200 px-2 md:px-4 border-b border-gray-500">
                    #
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Rental ID
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Bike Name
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Start Time
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Return Time
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Amount
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Status
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 border-b border-gray-500 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300 ">
                {filteredRentals.map((rental: TAdminRental, index: number) => (
                  <tr key={rental._id} className="hover:bg-gray-100">
                    <td className="py-4 text-sm font-bold text-gray-800 px-2 md:px-4 text-center">
                      {index + 1}
                    </td>
                    <td className="text-xs text-blue-700 font-medium px-4 md:px-6">
                      {rental?._id.toString()}{" "}
                    </td>
                    <td className="text-xs tracking-tight text-gray-900 px-4 md:px-6">
                      {rental.bikeId?.name}
                    </td>
                    <td className="text-xs tracking-tight text-gray-900 px-4 md:px-6">
                      {new Date(rental.startTime).toLocaleString()}
                    </td>
                    <td className="text-xs tracking-tight text-center text-gray-900 px-4 md:px-6">
                      {rental.returnTime ? (
                        new Date(rental.returnTime).toLocaleString()
                      ) : (
                        <span className="text-red-600">Not Returned</span>
                      )}
                    </td>

                    <td className="text-xs tracking-tight text-center text-gray-900 px-4 md:px-6">
                      {rental.totalCost ? `$${rental.totalCost}` : "N/A"}
                    </td>
                    <td className="text-xs tracking-tight text-center text-gray-900 px-4 md:px-6">
                      <span
                        className={`py-1 px-3 rounded-full text-white text-xs ${
                          rental.paymentStatus === "paid"
                            ? "bg-green-600"
                            : rental.paymentStatus === "advanced"
                            ? "bg-blue-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {rental.paymentStatus
                          ? rental.paymentStatus.charAt(0).toUpperCase() +
                            rental.paymentStatus.slice(1)
                          : "Unknown"}
                      </span>
                    </td>

                    <td className="text-sm text-center mx-2 text-gray-500 w-20 px-2 md:px-2 py-2">
                      {!rental.isReturned && (
                        <button
                          onClick={() => handleReturnBike(rental._id)}
                          className="text-custom-green bg-transparent border-none hover:text-green-600 focus:outline-none"
                        >
                          Calculate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalManagement;
