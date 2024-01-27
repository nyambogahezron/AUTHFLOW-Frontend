import { apiSlice } from "./apiSlice";
const USER_URL = "/api/v1/users";
const AUTH_URL = "/api/v1/auth";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "DELETE",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    forgotpassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetpassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateUser`,
        method: "PATCH",
        body: data,
      }),
    }),
    currentUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateUserPassword`,
        method: "PATCH",
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
  useCurrentUserMutation,
  useUpdatePasswordMutation,
} = userApiSlice;
