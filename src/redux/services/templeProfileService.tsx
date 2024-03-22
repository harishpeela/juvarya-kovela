import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE, DONATION_URL, EVENTS_URL, POPULARURL } from '../../api/api';
import { RootState } from '../store';
import { endpoints } from '../../api';



const createBaseQuery = (baseUrl) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      console.log('token====>', token)
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  });
};

export const templeProfileService = createApi({
  reducerPath: 'templeProfileService',
  baseQuery: createBaseQuery(POPULARURL),
  endpoints: (builder) => ({
    SearchTempleRoleWithId: builder.query<any, any>({
      query: (profileId) => `${endpoints.NEW_TEMPLE_ROLE_WITH_ID}=${profileId}`,
    }),
    getTempleDetails: builder.query<any, any>({
      query: (profileId) => `${endpoints.TEMPLE_DETAILS}/${profileId}`,
    }),
    getTempleAddress: builder.query<any, any>({
      query: (profileId) => `${endpoints.TEMPLE_ADDRESS}/${profileId}`,
    }),
    getTempleCommunity: builder.query<any, any>({
      query: (profileId) => `${endpoints.TEMPLE_COMMUNITY}/${profileId}`,
    }),
    getTempleClass: builder.query<any, { pageNo: number; pageSize: number; templeclass: number }>({
      query: ({ pageNo, pageSize, templeclass }) => `${endpoints.GET_TEMPLE_CLASS}/byTempleClass?pageNo=${pageNo}&pageSize=${pageSize}&templeClass=${templeclass}`,
    }),
  }),
});

export const templeProfileService2 = createApi({
  reducerPath: 'templeProfileService2',
  baseQuery: createBaseQuery(BASE),
  endpoints: (builder) => ({
    getTemplePosts: builder.query<any, { pageNo: number; pageSize: number; profileId: number }>({
      query: ({ pageNo, pageSize, profileId }) => `${endpoints.GET_POSTS}?page=${pageNo}&pageSize=${pageSize}&id=${profileId}`,
    }),
    getNewFollowUnFollowById: builder.query<any, any>({
      query: (profileId) => `${endpoints.NEW_FOLLOW_UNFOLLOW_BY_ID}/${profileId}`,
    }),
    getNewFollowCount: builder.query<any, any>({
      query: (profileId) => `${endpoints.NEW_FOLLOW_COUNT}/${profileId}`,
    }),
    getTempleFollowersList: builder.query<any, { pageNo: number; pageSize: number; profileId: number }>({
      query: ({ pageNo, pageSize, profileId }) => `${endpoints.TEMPLE_FOLLOWERS_LIST}?pageNo=${pageNo}&pageSize=${pageSize}&profileId=${profileId}`
    }),
  }),
});

export const templeProfileService3 = createApi({
  reducerPath: 'templeProfileService3',
  baseQuery: createBaseQuery(DONATION_URL),
  endpoints: (builder) => ({
    getTempleDonation: builder.query<any, { pageNo: number; pageSize: number; profileId: number }>({
      query: ({ pageNo, pageSize, profileId }) => `${endpoints.TOP_DONATION}?jtProfile=${profileId}&pageNo=${pageNo}&pageSize=${pageSize}&active=false`,
    }),
  }),
});

export const templeProfileService4 = createApi({
  reducerPath: 'templeProfileService4',
  baseQuery: createBaseQuery(EVENTS_URL),
  endpoints: (builder) => ({
    getProfileEvents: builder.query<any, { pageNo: number; pageSize: number; profileId: number }>({
      query: ({ pageNo, pageSize, profileId }) => `${endpoints.PROFILE_EVENTS}?pageNo=${pageNo}&pageSize=${pageSize}&itemId=${profileId}`,
    }),
    getEventList:builder.query<any, { pageNo: number; pageSize: number }>({
      query: ({ pageNo, pageSize }) =>  `${endpoints.EVENTS_LIST}?&page=${pageNo}&pageSize=${pageSize}`
    }),
  }),
});

export const {
  useLazySearchTempleRoleWithIdQuery,
  useLazyGetTempleDetailsQuery,
  useLazyGetTempleAddressQuery,
  useLazyGetTempleCommunityQuery,
  useLazyGetTempleClassQuery,
} = templeProfileService

export const { useLazyGetTemplePostsQuery,
  useLazyGetNewFollowUnFollowByIdQuery,
  useLazyGetNewFollowCountQuery,
  useLazyGetTempleFollowersListQuery
} = templeProfileService2

export const { useLazyGetTempleDonationQuery } = templeProfileService3
export const { useLazyGetProfileEventsQuery, useLazyGetEventListQuery } = templeProfileService4
