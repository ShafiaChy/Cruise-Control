/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";

import { TCar } from "../../types/car";
import {
  FaCheckCircle,
  FaEdit,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";

import Spinner from "../Spinner";
import LoadingError from "../LoadingError";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "sonner";
import { useCreateCarMutation, useDeleteCarMutation, useGetAllCarsQuery, useUpdateCarMutation } from "../../redux/features/cars/carsApi";
import CarModal from "./CarModal";

const CarManagement = () => {
  const {
    data: CarsResponse,
    error,
    isLoading,
    refetch,
  } = useGetAllCarsQuery(undefined);
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [CarToDelete, seTCarToDelete] = useState<string | null>(null);

  const [filter, setFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const Cars = CarsResponse?.data || [];

  const filterOptions = {
    brand: [
      "All",
      ...new Set(Cars.map((Car: TCar) => Car.brand)),
    ] as string[],
    model: [
      "All",
      ...new Set(Cars.map((Car: TCar) => Car.model)),
    ] as string[],
    availability: ["All", "Available", "Unavailable"] as string[],
  };

  const handleEdiTCar = (Car: TCar) => {
    setSelectedCar(Car);
    setIsModalOpen(true);
  };

  const handleCreateCar = () => {
    setSelectedCar(null);
    setIsModalOpen(true);
  };

  const handleDeleteCar = async (carId: string) => {
    seTCarToDelete(carId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteCar = async () => {
    if (CarToDelete) {
      try {
        await deleteCar(CarToDelete).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete Car", error);
      } finally {
        setIsConfirmModalOpen(false);
        seTCarToDelete(null);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (CarData: Omit<TCar, "_id">) => {
    const toastId = toast.loading("Processing...");

    // try {
    //   if (selectedCar) {
    //     const id = selectedCar?._id;
    //     await updateCar({ id, ...CarData }).unwrap();
    //   } else {
    //     await createCar(CarData).unwrap();
    //   }
    //   refetch();
    // } catch (error) {
    //   console.error("Failed to save Car", error);
    // }
    // setIsModalOpen(false);
    try {
      if (selectedCar) {
        const id = selectedCar?._id;
        await updateCar({ id, ...CarData }).unwrap();
        toast.success("Car updated successfully!", {
          id: toastId,
          duration: 2000,
          className: "text-orange-600",
        });
      } else {
        await createCar(CarData).unwrap();
        toast.success("Car created successfully!", {
          id: toastId,
          duration: 2000,
          className: "text-orange-600",
        });
      }
      refetch();
    } catch (error: any) {
      toast.error(`Failed: ${error?.data?.message}`, {
        id: toastId,
        duration: 2000,
        className: "text-red-600",
      });
      console.error("Failed to save Car", error);
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

  const filteredCars = Cars.filter((Car: TCar) => {
    const matchesBrand =
      selectedBrand === "All" || Car.brand === selectedBrand;
    const matchesModel =
      selectedModel === "All" || Car.model === selectedModel;
    const matchesAvailability =
      selectedAvailability === "All" ||
      (selectedAvailability === "Available" && Car.isAvailable) ||
      (selectedAvailability === "Unavailable" && !Car.isAvailable);
    const matchesName = Car.name.toLowerCase().includes(filter.toLowerCase());

    return matchesBrand && matchesModel && matchesAvailability && matchesName;
  });

  return (
    <div className="mx-auto max-w-screen-lg  ">
      <div className="md:flex md:items-center md:justify-between flex-col md:flex-row">
        <p className="flex-1 text-base font-semibold text-gray-300">
          Number of available Cars: {filteredCars.length}
        </p>

        <div className="mt-4 md:mt-0 text-white w-full md:w-9/12">
          <div className="flex flex-col gap-4 md:flex-row items-stretch md:items-center md:justify-end md:mb-0 mb-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex md:flex-col flex-row items-center space-x-2 w-full md:w-auto">
                <label className="w-1/3 md:w-auto text-sm font-medium text-orange-600">
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
                <label className="w-1/3 md:w-auto text-sm font-medium text-orange-600">
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
                <label className="w-1/3 md:w-auto text-sm font-medium text-orange-600">
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
                <label className="mb-2 sm:mb-0 sm:mr-2 text-sm font-medium text-orange-600">
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
                  onClick={handleCreateCar}
                  className="group flex justify-center py-0 px-2 rounded-none drop-shadow-xl bg-orange-600 from-gray-800 to-black text-white text-xl focus:outline-none hover:translate-y-2 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                >
                  +
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-100 group-hover:text-sm w-20 group-hover:-translate-y-7 duration-500">
                    Create Car
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
      ) : !filteredCars.length ? (
        <div className="flex justify-center items-center py-6  mt-12">
          <div className="bg-transparent text-white text-2xl px-4 py-3">
            <strong className="font-bold">No Data Found</strong>
          </div>
        </div>
      ) : (
        <div className="mt-3 overflow-hidden rounded-none shadow bg-gray-300">
          <div className="md:overflow-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200">
            <table className="min-w-full border-collapse border border-black/80 whitespace-nowrap">
              <thead className="bg-orange-600 text-white">
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
                {filteredCars.map((Car: TCar, index: number) => (
                  <tr key={Car._id} className="hover:bg-gray-100">
                    <td className="py-4 text-sm font-bold text-gray-800 px-2 md:px-4 text-center w-8">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 px-0 md:px-0 w-20">
                      <img
                        src={Car.image}
                        alt={Car.name}
                        className="w-full h-16 object-cover"
                      />
                    </td>
                    <td className="text-sm font-semibold text-gray-900 px-4 md:px-6">
                      {Car.name}
                    </td>
                    <td className="text-sm text-gray-900 px-4 md:px-6">
                      {Car.brand}
                    </td>
                    <td className="text-sm text-gray-900 px-4 md:px-6">
                      {Car.model}
                    </td>
                    <td className="text-sm text-gray-500 px-4 md:px-6 whitespace-normal break-words max-w-[200px]">
                      {Car.description}
                    </td>
                    <td className="text-sm text-gray-500 px-4 md:px-6">
                      ${Car.pricePerHour}
                    </td>
                    <td className="text-sm text-center text-gray-500 w-12">
                      {Car.isAvailable ? (
                        <FaCheckCircle
                          className="text-orange-600 w-4 h-4 mx-auto"
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
                        onClick={() => handleEdiTCar(Car)}
                        className="text-orange-600 bg-transparent border-none hover:text-orange-800 focus:outline-none"
                      >
                        <FaEdit className="w-4 h-4" aria-label="Edit Car" />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(Car._id)}
                        className="text-red-600 bg-transparent border-none hover:text-red-800 focus:outline-none"
                      >
                        <FaTrashAlt
                          className="w-4 h-4"
                          aria-label="Delete Car"
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
        <CarModal
          Car={selectedCar ?? undefined}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDeleteCar}
          onCancel={() => setIsConfirmModalOpen(false)}
          message="Are you sure you want to delete this Car?"
        />
      )}
    </div>
  );
};

export default CarManagement;
