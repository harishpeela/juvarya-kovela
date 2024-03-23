import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE } from '../../utils/api/api';
import { RootState } from '../store';

export const reelsFeedService = createApi({
  reducerPath: 'reelsFeedService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = '';
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getReelsFeedData: builder.query<any, { pageNo: number; pageSize: number }>({
      query: ({ pageNo, pageSize }) => `$(tobeUpdate)}?pageNo=${pageNo}&pageSize=${pageSize}`
    })
  })

});

export const {
  useLazyGetReelsFeedDataQuery,
} = reelsFeedService;