import { baseApi } from '../../api/baseApi';

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGeneralReview: builder.query({
            query: () => {
                return {
                    url: `/pre-review/general`,
                    method: 'GET',
                };
            },
            providesTags: ['GeneralReviews'],
        }),
        updateGeneralReview: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/pre-review/general`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['GeneralReviews'],
        }),

        getReview: builder.query({
            query: ({ id }) => {
                return {
                    url: `/pre-review?id=${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Review'],
        }),
        updateReview: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/pre-review`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Review'],
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/pre-review/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewQuery,
    useUpdateGeneralReviewMutation,
    useGetGeneralReviewQuery,
} = reviewApi;
