import { baseApi } from '../../api/baseApi';

const planApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPlans: builder.query({
            query: ({ query }) => {
                return {
                    url: `/plan?${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Plan'],
        }),
        createPlan: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/plan`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Plan'],
        }),
        updatePlan: builder.mutation({
            query: ({ payload, id }) => {
                return {
                    url: `/plan/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Plan'],
        }),
    }),
});

export const { useCreatePlanMutation, useUpdatePlanMutation, useGetAllPlansQuery } = planApi;
