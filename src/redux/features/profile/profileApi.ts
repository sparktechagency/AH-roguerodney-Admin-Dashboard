import { baseApi } from '../../api/baseApi';

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => {
                return {
                    url: `/user/profile`,
                    method: 'GET',
                };
            },
            providesTags: ['Profile', 'Users'],
        }),
        updateProfile: builder.mutation({
            query: (payload) => {
                return {
                    url: `/user`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Profile', 'Users'],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
