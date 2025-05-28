import { baseApi } from '../../api/baseApi';

const supportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSupports: builder.query({
            query: ({ query }) => {
                return {
                    url: `/report/support?${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Supports'],
        }),
        getSingleSupport: builder.query({
            query: ({ id }) => {
                return {
                    url: `/report/support/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Support'],
        }),
        udpateSupport: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: `/report/support/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Supports', 'Support'],
        }),
    }),
});

export const { useGetAllSupportsQuery, useGetSingleSupportQuery, useUdpateSupportMutation } = supportApi;
