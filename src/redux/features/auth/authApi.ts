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
        forgotPassword: builder.mutation({
            query: (payload) => {
                return {
                    url: `/auth/forgot-password`,
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        otpVerify: builder.mutation({
            query: (payload) => {
                return {
                    url: `/auth/verify-email`,
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        resendOtp: builder.mutation({
            query: (payload) => {
                return {
                    url: `/auth/resend-otp`,
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: ({ payload, token }) => {
                return {
                    url: `/auth/reset-password`,
                    method: 'POST',
                    body: payload,
                    headers: {
                        Authorization: `${token}`,
                    },
                };
            },
        }),
        changePassword: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/auth/change-password`,
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        deleteAccount: builder.mutation({
            query: ({ payload }) => {
                return {
                    url: `/user/delete-account`,
                    method: 'DELETE',
                    body: payload,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useForgotPasswordMutation,
    useOtpVerifyMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation,
} = authApi;
