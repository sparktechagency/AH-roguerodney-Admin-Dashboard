import { baseApi } from '../../api/baseApi';

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => {
                return {
                    url: `/category`,
                    method: 'GET',
                };
            },
            providesTags: ['Categories', 'Category'],
        }),
        getSingleCategory: builder.query({
            query: ({ id }) => {
                return {
                    url: `/category/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/category/create`,
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Categories', 'Category'],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/category/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Categories', 'Category'],
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
    useGetSingleCategoryQuery,
} = categoryApi;
