import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ query }) => {
                return {
                    url: `/user${query}`,
                    method: 'GET',
                };
            },

            providesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: ({ payload, id }) => {
                console.log(payload, id);
                return {
                    url: `/user/user/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Profile', 'Users', 'User'],
        }),
    }),
});

export const { useGetAllUsersQuery } = userApi;
