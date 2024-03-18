import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASEURL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, {getState, endpoint}) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    triggerOtp: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.NEW_OTP,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    signIn: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.NEW_SIGN_IN,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    signUp: builder.mutation<any, {}>({
      query: payload => ({
        url: '/AUTH/user',
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    socialRegister: builder.mutation<any, {}>({
      query: payload => ({
        url: '/AUTH/user/social/login',
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    forgotPassword: builder.mutation<any, any>({
      query: payload => ({
        url: '/AUTH/user/forget/password',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<any, {token: string; payload: any}>({
      query: ({token, payload}) => ({
        url: '/AUTH/user/reset/password',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    updatePassword: builder.mutation<any,{current_password: string; password: string; confirm_password: string}>({
      query: ({current_password, password, confirm_password}) => ({
        url: 'AUTH/user/change/password',
        method: 'POST',
        body: {current_password, password, confirm_password},
      }),
    }),
    getCustomerData: builder.query<any, any>({
      query: () => endpoints.NEW_GET_CURRENT_USER,
    }),
  }),

});

export const {
  useTriggerOtpMutation,
  useSignInMutation,
  useSignUpMutation,
  useSocialRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useLazyGetCustomerDataQuery,
} = authService;