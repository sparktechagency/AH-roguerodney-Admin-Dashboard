import { baseApi } from '../../api/baseApi';

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: ({ query }) => {
                return {
                    url: `/notification${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Notifications'],
        }),
        readAllNotification: builder.mutation({
            query: () => {
                return {
                    url: `/notification`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: ['Notifications'],
        }),
        readSingleNotification: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/notification/${id}`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: ['Notifications'],
        }),
    }),
});

export const { useGetAllNotificationQuery, useReadAllNotificationMutation, useReadSingleNotificationMutation } =
    notificationApi;
