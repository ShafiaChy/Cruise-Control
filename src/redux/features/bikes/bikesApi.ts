import baseApi from "../../api/baseApi";

export const bikesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: () => "/bikes",
      providesTags: ["Bikes"],
    }),

    geTCarById: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
    }),

    createBike: builder.mutation({
      query: (bike) => (
        console.log(bike),
        {
        
        url: "/bikes",
        method: "POST",
        body: bike,
      }),
      invalidatesTags: ["Bikes"],
    }),
    

    updateBike: builder.mutation({
      query: ({ id, ...bike }) => ({
        url: `/bikes/${id}`,
        method: "PUT",
        body: bike,
      }),
      invalidatesTags: ["Bikes"],
    }),

    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bikes"],
    }),
  }),
});

export const {
  useGetAllBikesQuery,
  useGeTCarByIdQuery,
  useCreateBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} = bikesApi;
