import { baseApi } from '../../api/baseApi';

const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubcriptionOverview: builder.query({
            query: ({ query }) => {
                return {
                    url: `/subscription/overview${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Subscription', 'Subscribers'],
        }),
        getAllSubscribers: builder.query({
            query: ({ query }) => {
                return {
                    url: `/subscription${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Subscription', 'Subscribers'],
        }),
        updateSubscription: builder.mutation({
            query: ({ payload, id }) => {
                return {
                    url: `/subscription/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Subscription', 'User'],
        }),
    }),
});

export const { useGetSubcriptionOverviewQuery, useGetAllSubscribersQuery, useUpdateSubscriptionMutation } =
    subscriptionApi;
