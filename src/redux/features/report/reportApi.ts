import { baseApi } from '../../api/baseApi';

const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query({
            query: ({ query }) => {
                return {
                    url: `/report/report-orders${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Reports'],
        }),
        getSingleReport: builder.query({
            query: ({ id }) => {
                return {
                    url: `/report/report/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Report'],
        }),
        updateReport: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: `/report/report/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Report'],
        }),
    }),
});

export const { useGetAllReportsQuery, useGetSingleReportQuery, useUpdateReportMutation } = reportApi;
