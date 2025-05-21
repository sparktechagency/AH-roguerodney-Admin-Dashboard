import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => {
                return {
                    url: `/user/profile`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetProfileQuery } = userApi;
