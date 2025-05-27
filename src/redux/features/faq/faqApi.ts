import { baseApi } from '../../api/baseApi';

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFaqs: builder.query({
            query: ({ query }) => {
                return {
                    url: `/faq?${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Faq'],
        }),
        createFaq: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/faq`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Faq'],
        }),
        updateFaq: builder.mutation({
            query: ({ payload, id }) => {
                return {
                    url: `/faq/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Faq'],
        }),
        deleteFaq: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/faq/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Faq'],
        }),
    }),
});

export const { useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation, useGetAllFaqsQuery } = faqApi;
