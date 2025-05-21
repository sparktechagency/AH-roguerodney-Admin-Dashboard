import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => {
                return {
                    url: `/auth/login`,
                    method: 'POST',
                    body: payload,
                };
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
