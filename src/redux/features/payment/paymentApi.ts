import { baseApi } from '../../api/baseApi';

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPayments: builder.query({
            query: () => {
                return {
                    url: `/service?status=completed`,
                    method: 'GET',
                };
            },
            providesTags: ['Services'],
        }),
        getPaymentOverview: builder.query({
            query: () => {
                return {
                    url: `/service/overview`,
                    method: 'GET',
                };
            },
            providesTags: ['Services'],
        }),
    }),
});

export const { useGetAllPaymentsQuery, useGetPaymentOverviewQuery } = paymentApi;
