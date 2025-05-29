import { baseApi } from '../../api/baseApi';

const referralApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReferrals: builder.query({
            query: ({ query }) => {
                return {
                    url: `/referral/all-referral${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Referral'],
        }),
    }),
});

export const { useGetAllReferralsQuery } = referralApi;
