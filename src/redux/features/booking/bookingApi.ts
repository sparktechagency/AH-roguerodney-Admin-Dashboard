import { baseApi } from '../../api/baseApi';

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBookings: builder.query({
            query: () => {
                return {
                    url: `/service`,
                    method: 'GET',
                };
            },
            providesTags: ['Bookings', 'Booking'],
        }),
        getSingleBooking: builder.query({
            query: ({ id }) => {
                return {
                    url: `/service/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Booking'],
        }),
    }),
});

export const { useGetAllBookingsQuery, useGetSingleBookingQuery } = bookingApi;
