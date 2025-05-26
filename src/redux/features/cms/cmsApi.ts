import { baseApi } from '../../api/baseApi';

const cmsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCms: builder.query({
            query: ({ query }) => {
                return {
                    url: `/disclaimer${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['CMS'],
        }),
        updateCms: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/disclaimer`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['CMS'],
        }),
    }),
});

export const { useUpdateCmsMutation, useGetCmsQuery } = cmsApi;
