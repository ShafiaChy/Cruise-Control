import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllBikesQuery } from "../redux/features/bikes/bikesApi";
import { TBike } from "../types/bike";
import Spinner from "../components/Spinner";
import SingleBike from "../components/User/SingleBike";

const BikeListing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterBy = queryParams.get("filterBy") || "";
  const searchTerm = queryParams.get("searchTerm") || "";

  const [filters, setFilters] = useState({
    priceRange: "",
    brand: filterBy === "brand" ? searchTerm : "",
    model: filterBy === "model" ? searchTerm : "",
    availability: "",
  });

  const [searchQuery, setSearchQuery] = useState(
    filterBy === "name" ? searchTerm : ""
  );
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading } = useGetAllBikesQuery(undefined);
  const bikes: TBike[] = data?.data || [];

  // Dynamic filter options
  const filterOptions = {
    priceRange: ["All", "100", "200", "500", "800"],
    brand: ["All", ...Array.from(new Set(bikes.map((bike) => bike.brand)))],
    model: ["All", ...Array.from(new Set(bikes.map((bike) => bike.model)))],
    availability: ["All", "Available", "Unavailable"],
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: "",
      brand: "",
      model: "",
      availability: "",
    });
    setSortOrder("");
    setSearchQuery("");
  };

  // Filter and sort bikes
  const filteredBikes = bikes
    .filter((bike: TBike) =>
      bike.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (bike: TBike) =>
        !filters.priceRange ||
        filters.priceRange === "All" ||
        bike.pricePerHour <= Number(filters.priceRange)
    )
    .filter(
      (bike: TBike) =>
        !filters.brand ||
        filters.brand === "All" ||
        bike.brand.toLowerCase() === filters.brand.toLowerCase()
    )
    .filter(
      (bike: TBike) =>
        !filters.model ||
        filters.model === "All" ||
        bike.model.toLowerCase() === filters.model.toLowerCase()
    )
    .filter(
      (bike: TBike) =>
        !filters.availability ||
        filters.availability === "All" ||
        (filters.availability === "Available" && bike.isAvailable) ||
        (filters.availability === "Unavailable" && !bike.isAvailable)
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.pricePerHour - b.pricePerHour
        : b.pricePerHour - a.pricePerHour
    );

  return (
    <div className="mt-20 w-full md:w-11/12 mx-auto py-0 mb-8 border bg-gray-200 text-gray-700">
      <div className="flex py-12 px-4 md:flex-row flex-col">
        <div className="md:w-1/4 w-full pr-4 md:pb-0 pb-12">
          <h2 className="text-3xl font-semibold mb-4 uppercase font-teko text-custom-green">
            Filter By
          </h2>

          <div className="mb-4 my-10">
            <select
              name="brand"
              value={filters.brand}
              onChange={handleInputChange}
              className="focus:outline-none py-1 px-2 w-full bg-gray-300"
            >
              <option value="">Brand</option>
              {filterOptions.brand.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              name="model"
              value={filters.model}
              onChange={handleInputChange}
              className="focus:outline-none py-1 px-2 w-full bg-gray-300"
            >
              <option value="">Model</option>
              {filterOptions.model.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleInputChange}
              className="focus:outline-none py-1 px-2 w-full bg-gray-300"
            >
              <option value="">Price Range</option>
              {filterOptions.priceRange.map((option) => (
                <option key={option} value={option}>
                  {option !== "All" ? `$${option} and below` : option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              name="availability"
              value={filters.availability}
              onChange={handleInputChange}
              className="focus:outline-none py-1 px-2 w-full bg-gray-300"
            >
              <option value="">Availability</option>
              {filterOptions.availability.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="bg-custom-green text-white py-2 px-4 hover:bg-green-600 focus:outline-none transition duration-300 w-full rounded-none mt-8"
          >
            Clear Filters
          </button>
        </div>

        <main className="md:w-3/4 w-full ps-4">
          <div className="flex flex-col justify-evenly">
            <div className="flex flex-row justify-between items-center mb-4 md:gap-0 gap-2">
              <div className="md:w-1/3 w-1/2 flex items-center gap-2">
                <label className="font-semibold">Search: </label>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:outline-none py-1 px-2 w-full bg-gray-300"
                />
              </div>

              <div className="md:w-1/3 w-1/2">
                <select
                  name="sortOrder"
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="focus:outline-none py-1 px-2 w-full bg-gray-300"
                >
                  <option value="">Sort By Price</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="min-h-[60vh]">
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                  {filteredBikes && filteredBikes.length > 0 ? (
                    filteredBikes.map((bike: TBike) => (
                      <SingleBike key={bike._id} bike={bike} />
                    ))
                  ) : (
                    <div className="flex justify-center items-center py-6">
                      <div className="bg-transparent text-gray-800 text-2xl px-4 py-3">
                        <strong className="font-bold">No Data Found</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BikeListing;
