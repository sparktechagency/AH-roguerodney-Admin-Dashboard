import { baseApi } from '../../api/baseApi';

const subCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllService: builder.query({
            query: ({ query }) => {
                return {
                    url: `/serviceManagement${query}`,
                    method: 'GET',
                };
            },
            providesTags: ['Services', 'Service'],
        }),

        getSingleService: builder.query({
            query: ({ id }) => {
                return {
                    url: `/serviceManagement/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Service'],
        }),
        createService: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/serviceManagement/create`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Services', 'Service'],
        }),
        updateService: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: `/serviceManagement/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['Services', 'Service'],
        }),
        deleteService: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/serviceManagement/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Services', 'Service'],
        }),
        getStates: builder.query({
            query: () => {
                return {
                    url: `/serviceManagement/states`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useGetAllServiceQuery,
    useGetSingleServiceQuery,
    useGetStatesQuery
} = subCategoryApi;
