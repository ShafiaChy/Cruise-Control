import baseApi from "../../api/baseApi";

export const rentalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRentals: builder.query({
      query: () => ({
        url: "/rentals",
        method: "GET",
      }),
      providesTags: ["Rental"],
    }),

    getAllRentals: builder.query({
      query: () => ({
        url: "/rentals/get",
        method: "GET",
      }),
      providesTags: ["Rental"],
    }),

    createRental: builder.mutation({
      query: (rentalData: {
        carId: string;
        startTime: string;
        transactionId?: string;
        userId: string;
        amount: number;
        email: string;
      }) => ({
        url: "/rentals",
        method: "POST",
        body: rentalData,
      }),
      invalidatesTags: ["Rental"],
    }),

    // Mark a rental as paid
    payForRental: builder.mutation({
      query: (rentalId: string) => ({
        url: `/rentals/${rentalId}/pay`,
        method: "PUT",
      }),
      invalidatesTags: ["Rental"],
    }),

    returnCar: builder.mutation({
      query: (rentalId) => ({
        url: `/rentals/${rentalId}/return`,
        method: "PUT",
        // body: { returnTime },
      }),
      invalidatesTags: ["Rental"],
    }),
  }),
});

export const {
  useGetRentalsQuery,
  useGetAllRentalsQuery,
  useCreateRentalMutation,
  usePayForRentalMutation,
  useReturnCarMutation,
} = rentalApi;
