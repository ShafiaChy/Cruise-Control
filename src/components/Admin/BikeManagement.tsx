/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import {
  useGetAllBikesQuery,
  useCreateBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} from "../../redux/features/bikes/bikesApi";
import { TBike } from "../../types/bike";
import {
  FaCheckCircle,
  FaEdit,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import BikeModal from "./BikeModal";
import Spinner from "../Spinner";
import LoadingError from "../LoadingError";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "sonner";

const BikeManagement = () => {
  const {
    data: bikesResponse,
    error,
    isLoading,
    refetch,
  } = useGetAllBikesQuery(undefined);
  const [createBike] = useCreateBikeMutation();
  const [updateBike] = useUpdateBikeMutation();
  const [deleteBike] = useDeleteBikeMutation();
  const [selectedBike, setSelectedBike] = useState<TBike | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bikeToDelete, setBikeToDelete] = useState<string | null>(null);

  const [filter, setFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const bikes = bikesResponse?.data || [];

  const filterOptions = {
    brand: [
      "All",
      ...new Set(bikes.map((bike: TBike) => bike.brand)),
    ] as string[],
    model: [
      "All",
      ...new Set(bikes.map((bike: TBike) => bike.model)),
    ] as string[],
    availability: ["All", "Available", "Unavailable"] as string[],
  };

  const handleEditBike = (bike: TBike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
  };

  const handleCreateBike = () => {
    setSelectedBike(null);
    setIsModalOpen(true);
  };

  const handleDeleteBike = async (bikeId: string) => {
    setBikeToDelete(bikeId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteBike = async () => {
    if (bikeToDelete) {
      try {
        await deleteBike(bikeToDelete).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete bike", error);
      } finally {
        setIsConfirmModalOpen(false);
        setBikeToDelete(null);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (bikeData: Omit<TBike, "_id">) => {
    const toastId = toast.loading("Processing...");

    // try {
    //   if (selectedBike) {
    //     const id = selectedBike?._id;
    //     await updateBike({ id, ...bikeData }).unwrap();
    //   } else {
    //     await createBike(bikeData).unwrap();
    //   }
    //   refetch();
    // } catch (error) {
    //   console.error("Failed to save bike", error);
    // }
    // setIsModalOpen(false);
    try {
      if (selectedBike) {
        const id = selectedBike?._id;
        await updateBike({ id, ...bikeData }).unwrap();
        toast.success("Bike updated successfully!", {
          id: toastId,
          duration: 2000,
          className: "text-green-600",
        });
      } else {
        await createBike(bikeData).unwrap();
        toast.success("Bike created successfully!", {
          id: toastId,
          duration: 2000,
          className: "text-green-600",
        });
      }
      refetch();
    } catch (error: any) {
      toast.error(`Failed: ${error?.data?.message}`, {
        id: toastId,
        duration: 2000,
        className: "text-red-600",
      });
      console.error("Failed to save bike", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  const handleAvailabilityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvailability(event.target.value);
  };

  const filteredBikes = bikes.filter((bike: TBike) => {
    const matchesBrand =
      selectedBrand === "All" || bike.brand === selectedBrand;
    const matchesModel =
      selectedModel === "All" || bike.model === selectedModel;
    const matchesAvailability =
      selectedAvailability === "All" ||
      (selectedAvailability === "Available" && bike.isAvailable) ||
      (selectedAvailability === "Unavailable" && !bike.isAvailable);
    const matchesName = bike.name.toLowerCase().includes(filter.toLowerCase());

    return matchesBrand && matchesModel && matchesAvailability && matchesName;
  });

  return (
    <div className="mx-auto max-w-screen-lg bg-transparent">
      <div className="md:flex md:items-center md:justify-between flex-col md:flex-row">
        <p className="flex-1 text-base font-semibold text-gray-300">
          Number of available bikes: {filteredBikes.length}
        </p>

        <div className="mt-4 md:mt-0 text-white w-full md:w-9/12">
          <div className="flex flex-col gap-4 md:flex-row items-stretch md:items-center md:justify-end md:mb-0 mb-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex md:flex-col flex-row items-center space-x-2 w-full md:w-auto">
                <label className="w-1/3 md:w-auto text-sm font-medium text-custom-green">
                  Filter By Brand:
                </label>
                <select
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  className="block w-full md:w-auto flex-grow rounded-none border-transparent bg-gray-100 text-gray-800 p-1 pr-10 text-base outline-none focus:shadow sm:text-sm hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-200"
                >
                  {filterOptions.brand.map((brand) => (
                    <option
                      key={brand}
                      value={brand}
                      className="text-gray-800 hover:bg-gray-300"
                    >
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex md:flex-col flex-row items-center space-x-2 w-full md:w-auto">
                <label className="w-1/3 md:w-auto text-sm font-medium text-custom-green">
                  Filter By Model:
                </label>
                <select
                  value={selectedModel}
                  onChange={handleModelChange}
                  className="block w-full md:w-auto flex-grow rounded-none border-transparent bg-gray-100 text-gray-800 p-1 pr-10 text-base outline-none focus:shadow sm:text-sm hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-200"
                >
                  {filterOptions.model.map((model) => (
                    <option
                      key={model}
                      value={model}
                      className="text-gray-800 hover:bg-gray-300"
                    >
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex md:flex-col flex-row items-center space-x-2 w-full md:w-auto">
                <label className="w-1/3 md:w-auto text-sm font-medium text-custom-green">
                  Filter By Availability:
                </label>
                <select
                  value={selectedAvailability}
                  onChange={handleAvailabilityChange}
                  className="block w-full md:w-auto flex-grow rounded-none border-transparent bg-gray-100 text-gray-800 p-1 pr-10 text-base outline-none focus:shadow sm:text-sm hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-200"
                >
                  {filterOptions.availability.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="text-gray-800 hover:bg-gray-300"
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-0 items-center">
              <div className="flex flex-col items-start">
                <label className="mb-2 sm:mb-0 sm:mr-2 text-sm font-medium text-custom-green">
                  Search:
                </label>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={filter}
                  onChange={handleFilterChange}
                  className="block w-full sm:w-auto rounded-none border-transparent bg-gray-100 text-gray-800 p-1 pr-10 text-base outline-none focus:shadow sm:text-sm hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-200"
                />
              </div>

              <section className="flex justify-center items-center mt-5 ps-6 ms-8">
                <button
                  onClick={() => {
                    setSelectedBrand("All");
                    setSelectedModel("All");
                    setSelectedAvailability("All");
                    setFilter("");
                  }}
                  className="group flex justify-center py-0 px-2 rounded-none drop-shadow-xl bg-red-700 from-gray-800 to-black text-white text-xl focus:outline-none hover:border-none hover:translate-y-2 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                >
                  X
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-100 group-hover:text-sm w-20 group-hover:-translate-y-7 duration-500">
                    Clear Filters
                  </span>
                </button>
              </section>

              <section className="flex justify-center items-center mt-5 ps-6">
                <button
                  onClick={handleCreateBike}
                  className="group flex justify-center py-0 px-2 rounded-none drop-shadow-xl bg-custom-green from-gray-800 to-black text-white text-xl focus:outline-none hover:translate-y-2 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                >
                  +
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-100 group-hover:text-sm w-20 group-hover:-translate-y-7 duration-500">
                    Create Bike
                  </span>
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <LoadingError />
      ) : !filteredBikes.length ? (
        <div className="flex justify-center items-center py-6  mt-12">
          <div className="bg-transparent text-white text-2xl px-4 py-3">
            <strong className="font-bold">No Data Found</strong>
          </div>
        </div>
      ) : (
        <div className="mt-3 overflow-hidden rounded-none shadow bg-gray-300">
          <div className="md:overflow-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200">
            <table className="min-w-full border-collapse border border-black/80 whitespace-nowrap">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2 text-sm font-medium text-gray-200 px-2 md:px-4 border-b border-gray-500 w-8  ">
                    #
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-0 md:px-0 border-b border-gray-500 w-20">
                    Image
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Name
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Brand
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Model
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Description
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Price/Hour
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 border-b border-gray-500 w-12 text-center">
                    Availability
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 border-b border-gray-500 w-20 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300">
                {filteredBikes.map((bike: TBike, index: number) => (
                  <tr key={bike._id} className="hover:bg-gray-100">
                    <td className="py-4 text-sm font-bold text-gray-800 px-2 md:px-4 text-center w-8">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 px-0 md:px-0 w-20">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-16 object-cover"
                      />
                    </td>
                    <td className="text-sm font-semibold text-gray-900 px-4 md:px-6">
                      {bike.name}
                    </td>
                    <td className="text-sm text-gray-900 px-4 md:px-6">
                      {bike.brand}
                    </td>
                    <td className="text-sm text-gray-900 px-4 md:px-6">
                      {bike.model}
                    </td>
                    <td className="text-sm text-gray-500 px-4 md:px-6 whitespace-normal break-words max-w-[200px]">
                      {bike.description}
                    </td>
                    <td className="text-sm text-gray-500 px-4 md:px-6">
                      ${bike.pricePerHour}
                    </td>
                    <td className="text-sm text-center text-gray-500 w-12">
                      {bike.isAvailable ? (
                        <FaCheckCircle
                          className="text-green-600 w-4 h-4 mx-auto"
                          aria-label="Available"
                        />
                      ) : (
                        <FaTimesCircle
                          className="text-red-600 w-4 h-4 mx-auto"
                          aria-label="Unavailable"
                        />
                      )}
                    </td>
                    <td className="text-sm text-center flex items-center justify-center gap-1 mx-4 text-gray-500 w-20 px-4 md:px-8 py-4">
                      <button
                        onClick={() => handleEditBike(bike)}
                        className="text-green-600 bg-transparent border-none hover:text-green-800 focus:outline-none"
                      >
                        <FaEdit className="w-4 h-4" aria-label="Edit Bike" />
                      </button>
                      <button
                        onClick={() => handleDeleteBike(bike._id)}
                        className="text-red-600 bg-transparent border-none hover:text-red-800 focus:outline-none"
                      >
                        <FaTrashAlt
                          className="w-4 h-4"
                          aria-label="Delete Bike"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <BikeModal
          bike={selectedBike ?? undefined}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDeleteBike}
          onCancel={() => setIsConfirmModalOpen(false)}
          message="Are you sure you want to delete this bike?"
        />
      )}
    </div>
  );
};

export default BikeManagement;
