import baseApi from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    createReview: builder.mutation({
        query: (reviews) => (
          console.log(reviews),
          {
          
          url: "/reviews",
          method: "POST",
          body: reviews,
        }),
        invalidatesTags: ["Reviews"],
      }),

      
  }),
});

export const {

  useCreateReviewMutation,
  useGetAllReviewsQuery
 
} = reviewApi;
