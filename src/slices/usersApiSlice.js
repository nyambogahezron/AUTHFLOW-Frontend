import { apiSlice } from './apiSlice';
const USERS_URL = '/api/v1/users';
const AUTH_URL = '/api/v1/auth';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: 'DELETE',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    forgotpassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),
    resetpassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: 'POST',
        body: data,
      }),
    }),
     verify: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useVerifyMutation,
  useUpdateUserMutation,
} = userApiSlice;
