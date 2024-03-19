import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {POPULARURL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const searchService = createApi({
  reducerPath: 'searchService',
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
    // getHomeFeedData: builder.query<any, { pageNo: number; pageSize: number }>({
    //   query: ({ pageNo, pageSize }) => `${endpoints.GET_HOME_FEED_LIST}?pageNo=${pageNo}&pageSize=${pageSize}`
    // })
    getPopularTempleData: builder.query<any, { pageNo: number; pageSize: number }>({
      query: ({ pageNo, pageSize }) =>`${endpoints.NEW_POPULAR_TEMPLES}?pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    getNearByTempleData: builder.query<any, { code: string; pageNo: number; pageSize: number }>({
      query: ({code, pageNo, pageSize }) =>`${endpoints.NEAR_BY_TEMPLES}?isoCode=${code}&pageNo=${pageNo}&pageSize=${pageSize}`,
    })
  }),

});

export const {
  useLazyGetPopularTempleDataQuery,
  useLazyGetNearByTempleDataQuery,
} = searchService;