import { baseApi } from '../../api/baseApi';

const referralApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReferrals: builder.query({
            query: () => {
                return {
                    url: `/referral/all-referral`,
                    method: 'GET',
                };
            },
            providesTags: ['Referral'],
        }),
    }),
});

export const { useGetAllReferralsQuery } = referralApi;
