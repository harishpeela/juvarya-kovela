import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {POPULARURL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';



export const notificationService = createApi({
  reducerPath: 'notificationService',
  baseQuery: fetchBaseQuery({
    baseUrl: POPULARURL,
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
    getNotificationData: builder.query<any,any>({
      query: () => endpoints.NOTIFICATIONS
    })
  })

});

export const {
  useLazyGetNotificationDataQuery,
} = notificationService;