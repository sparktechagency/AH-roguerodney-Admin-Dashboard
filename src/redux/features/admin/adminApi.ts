import { baseApi } from '../../api/baseApi';

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmins: builder.query({
            query: ({query}) => {
                return {
                    url: `/admin${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Admins'],
        }),
        createAdmin: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/admin`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Admins'],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: `/admin/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Admins'],
        }),
        deleteAdmin: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/admin/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Admins'],
        }),
    }),
});

export const { useCreateAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation, useGetAllAdminsQuery } =
    adminApi;
