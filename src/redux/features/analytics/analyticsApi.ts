import { baseApi } from '../../api/baseApi';

const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSummury: builder.query({
            query: () => {
                return {
                    url: `/analytics/summury`,
                    method: 'GET',
                };
            },
            providesTags: ['Analytics'],
        }),
        getMonthlyEarnings: builder.query({
            query: () => {
                return {
                    url: `/analytics/monthly-earnings`,
                    method: 'GET',
                };
            },
            providesTags: ['Analytics'],
        }),
        getYearlyEarnings: builder.query({
            query: ({ query }) => {
                return {
                    url: `/analytics/yearly-earnings${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Analytics'],
        }),
    }),
});

export const { useGetSummuryQuery, useGetMonthlyEarningsQuery, useGetYearlyEarningsQuery } = analyticsApi;
