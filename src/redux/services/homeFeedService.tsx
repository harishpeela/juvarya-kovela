import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const homeFeedService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    prepareHeaders: (headers, {getState, endpoint}) => {
      const token = (getState() as RootState).auth.token;
      console.log('token---->', token)
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getHomeFeedData: builder.query<any, { pageNo: number; pageSize: number }>({
      query: ({ pageNo, pageSize }) => `${endpoints.GET_HOME_FEED_LIST}?pageNo=${pageNo}&pageSize=${pageSize}`
    })
  })

});

export const {
  useLazyGetHomeFeedDataQuery,
} = homeFeedService;