import baseApi from "../../api/baseApi";

export const CarsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/cars",
      providesTags: ["Cars"],
    }),

    geTCarById: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
    }),

    createCar: builder.mutation({
      query: (Car) => (
        console.log(Car),
        {
        
        url: "/cars",
        method: "POST",
        body: Car,
      }),
      invalidatesTags: ["Cars"],
    }),
    

    updateCar: builder.mutation({
      query: ({ id, ...Car }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: Car,
      }),
      invalidatesTags: ["Cars"],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGeTCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = CarsApi;
