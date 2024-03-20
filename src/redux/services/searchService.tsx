import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {POPULARURL,BASEURL} from '../../api/api';
import { RootState } from '../store';
import { endpoints } from '../../api';



const createBaseQuery = (baseUrl) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  });
};

export const searchService = createApi({
  reducerPath: 'searchService',
  baseQuery: createBaseQuery(POPULARURL),
  endpoints: (builder) => ({
    getPopularTempleData: builder.query<any, { pageNo: number; pageSize: number }>({
      query: ({ pageNo, pageSize }) => `${endpoints.NEW_POPULAR_TEMPLES}?pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    getNearByTempleData: builder.query<any, { code: string; pageNo: number; pageSize: number }>({
      query: ({ code, pageNo, pageSize }) => `${endpoints.NEAR_BY_TEMPLES}?isoCode=${code}&pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    searchPopularTempleData: builder.query<any, { txt: string }>({
      query: ({ txt }) => `${endpoints.NEW_POPULAR_TEMPLES}?query=${txt}`,
    }),
  
  }),
});


export const searchService2 = createApi({
  reducerPath: 'searchService2',
  baseQuery: createBaseQuery(BASEURL), 
  endpoints: (builder) => ({
    getEventsByCommunity: builder.query<any, { customerId:number; pageNo: number; pageSize: number }>({
      query: ({ customerId, pageNo, pageSize }) => `${endpoints.ARTIST}?pageNo=${pageNo}&pageSize=${pageSize}&isoCodes=531001,531002&userId=${customerId}&type=ARTIST`,
    }),
  }),
});

export const {
  useLazyGetPopularTempleDataQuery,
  useLazyGetNearByTempleDataQuery,
  useLazySearchPopularTempleDataQuery,
} = searchService;
export const {
  useLazyGetEventsByCommunityQuery,
} = searchService2


