import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers) => {
            // get the token from cookies
            const token = Cookies.get('accessToken');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: [
        'Users',
        'User',
        'Profile',
        'Subscription',
        'Subscribers',
        'Plan',
        'Categories',
        'Category',
        'SubCategories',
        'SubCategory',
        'Services',
        'Service',
    ],
});

export const IMAGE_URL = import.meta.env.VITE_SERVER_URL;