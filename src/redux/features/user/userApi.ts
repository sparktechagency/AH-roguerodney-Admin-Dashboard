import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: `/user`,
                    method: 'GET',
                };
            },
            providesTags: ['Users'],
        }),
        // updateProfile: builder.mutation({
        //     query: (payload) => {
        //         return {
        //             url: `/user`,
        //             method: 'PATCH',
        //             body: payload,
        //         };
        //     },
        //     invalidatesTags: ['Profile', 'Users'],
        // }),
    }),
});

export const { useGetAllUsersQuery } = userApi;
