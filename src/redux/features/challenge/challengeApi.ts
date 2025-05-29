import { baseApi } from '../../api/baseApi';

const challengeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllChallenges: builder.query({
            query: ({ query }) => {
                return {
                    url: `/bonusAndChallenge${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Challenges'],
        }),
        createChallenge: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/bonusAndChallenge`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Challenges'],
        }),
        updateChallenge: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: `/bonusAndChallenge/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Challenges'],
        }),
        deleteChallenge: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/bonusAndChallenge/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Challenges'],
        }),
    }),
});

export const {
    useCreateChallengeMutation,
    useUpdateChallengeMutation,
    useDeleteChallengeMutation,
    useGetAllChallengesQuery,
} = challengeApi;
