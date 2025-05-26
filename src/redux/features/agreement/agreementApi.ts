import { baseApi } from '../../api/baseApi';

const agreementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgreement: builder.query({
            query: ({ query }) => {
                return {
                    url: `/clientAgreement${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Agreement'],
        }),
        updateAgreement: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/clientAgreement`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Agreement'],
        }),
    }),
});

export const { useUpdateAgreementMutation, useGetAgreementQuery } = agreementApi;
