import { baseApi } from '../../api/baseApi';

const subCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubCategory: builder.query({
            query: () => {
                return {
                    url: `/subCategory`,
                    method: 'GET',
                };
            },
            providesTags: ['SubCategories', 'SubCategory'],
        }),
        getSingleSubCategory: builder.query({
            query: ({ id }) => {
                return {
                    url: `/subCategory/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['SubCategory'],
        }),
        createSubCategory: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/subCategory/create`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['SubCategories', 'SubCategory'],
        }),
        updateSubCategory: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: `/subCategory/${id}`,
                    method: 'PATCH',
                    body: payload,
                };
            },
            invalidatesTags: ['SubCategories', 'SubCategory'],
        }),
    }),
});

export const {
    useCreateSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useGetAllSubCategoryQuery,
    useGetSingleSubCategoryQuery,
} = subCategoryApi;
