import {Alert} from 'react-native';
import {
  authAxiousInstance,
  axiousInstance,
  axiosMultiPartFormData,
  authAxiousInstance1,
  axiousInstanceNew,
  axiousInstanceNewSignIn,
  axiousInstanceFeed,
  axiosMultiPartFormData1,
  axiosNewData,
  axiosNewData1,
  axiosNewDataSave,
} from './api';

const endpoints = {
  NEW_SIGN_IN: 'auth/signin',
  NEW_SIGN_UP: 'auth/signup',
  NEW_OTP: 'auth/jtuserotp/trigger',
  NEW_GET_CURRENT_USER: 'auth/currentCustomer',
  NEW_UPDATE_PASSWORD: 'customer/password',
  NEW_ADMIN_VERIFY: 'jtprofile/admin/verify',
  NEW_FEED_INFO: '/jtfeed/feedsOfProfile',
  NEW_POPULAR_TEMPLES: 'jtprofile/popular',
  NEW_PROFIL_PICTURE: '/picture/profile?profileId',
  NEW_FOLLOW_UMFOLLOW: '/jtfollwer/create',
  NEW_SAVE_FEED: '/jtfeedtocustomer/save',
  NEW_FOLLOW_UNFOLLOW_BY_ID: '/jtfollwer/profile',
  SIGN_UP: 'v1/jtcustomer/create',
  CHECK_OTP: 'v1/jtUserOTP/trigger',
  UPDATE_PASSWORD: 'v1/jtcustomer/resetPassword',
  GET_TEMPLE_LIST: 'v1/agent/item/list',
  GET_HOME_FEED_LIST: 'v1/feed/list',
  CREATE_TEMPLE: 'v1/agent/item/create',
  CREATE_FEED: 'v1/feed/post',
  UPLOAD_TEMPLE_PICTURE: 'v1/jtitem/picture',
  ADD_TEMPLE_ADMIN: 'v1/agent/role/update',
  GET_CURRENT_USER: 'v1/jtcustomer',
  GET_TEMPLE_DETAILS: 'v1/jtitem/details/',
  GET_POPULAR_TEMPLES: 'v1/jtitem/popular/list',
  ADD_TEMP_ID: 'v1/jtcustomer/search/',
  GET_FEED_LIST_IN_DETAILS: 'v1/feed/item',
  SERVICE_CATEGORY_ITEMS: 'api/v1/jtitemservicecategorytoitem/save',
  MORE_TO_EXPLORE: 'v1/jtitem/list',
  FOLLOW_UNFOLLOW: 'v1/follow',
  CREATE_POST_FEED: 'v1/feed/post',
  GET_FOLLOW_LIST: 'v1/follow/list',
  LIKE_UNLIKE_HOME_FEED: 'v1/review/like',
  GET_UPCOMING_OCCASIONS: 'v1/occasion/upcoming',
  GET_ITEM_COMMUNITIES: 'v1/itemcommunity/list',
  GET_SAVED_POSTS_LIST: 'v1/jtfeedtocustomer/list',
  GENERATE_TOKEN:
    'v1/oauth/token?grant_type=client_credentials&client_id=skillrat-client&client_secret=skillrat@2021',
  LOGIN:
    'v1/oauth/token?grant_type=password&client_id=skillrat-client&client_secret=skillrat@2021',
  SAVE_FEED: 'v1/jtfeedtocustomer/save',
};
export const getHomeResponse = async () => {
  try {
    let result = await axiousInstance.get(`${endpoints.HOME_RESPONSE}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export const getInitialToken = async () => {
  try {
    let result = await authAxiousInstance.post(`${endpoints.GENERATE_TOKEN}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export const loginUser1 = async data => {
  try {
    let result = await authAxiousInstance1.post(
      `${endpoints.NEW_SIGN_IN}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in login', error);
    Alert.alert('Error', 'Invalid credentials!');
    return error;
  }
};
export const PopularTemples = async (pgfrm, pgto) => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.NEW_POPULAR_TEMPLES}?page=${pgfrm}&pageSize=${pgto}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const GetProfilePicture = async id => {
  try {
    let result = await axiosNewData1.get(
      `${endpoints.NEW_PROFIL_PICTURE}=${id}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const FollowUnFollow = async data => {
  try {
    let result = await axiosNewData1.post(
      `${endpoints.NEW_FOLLOW_UMFOLLOW}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in followunfollow', error);
  }
};
export const verifyAdminProfile = async (profileId, custId) => {
  try {
    let result = await axiousInstanceFeed.get(
      `${endpoints.NEW_ADMIN_VERIFY}?profileId=${profileId}&customerId=${custId}`,
      {retry: 5, retryDelay: 3000},
    );
    console.log('result of verify admin profile', result);
    return result;
  } catch (error) {
    return error;
  }
};
export const NewFeedHome = async (id, pgfrm, pgto) => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.NEW_FEED_INFO}?id=${id}&pageNo=${pgfrm}&pageSize=${pgto}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewGetFollowUmFollowById = async feedId => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.NEW_FOLLOW_UNFOLLOW_BY_ID}/${feedId}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewSaveFeed = async data => {
  try {
    let result = await axiosNewDataSave.post(
      `${endpoints.NEW_SAVE_FEED}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getAddTempId = async email => {
  try {
    let result = await axiousInstance.get(`${endpoints.ADD_TEMP_ID}/${email}`);
    return result;
  } catch (error) {
    return error;
  }
};
export const getTempleDetails = async id => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_TEMPLE_DETAILS}${id}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const RegistesrUser = async data => {
  try {
    let result = await axiousInstance.post(`${endpoints.SIGN_UP}`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const NewRegistesrUser = async data => {
  try {
    let result = await axiousInstanceNewSignIn.post(
      `${endpoints.NEW_SIGN_UP}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const SaveFeed = async data => {
  try {
    let result = await axiousInstance.post(`${endpoints.SAVE_FEED}`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const createFeedPost = async data => {
  try {
    let result = await axiousInstance.post(
      `${endpoints.CREATE_POST_FEED}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const likeOrUnlikeFeed = async data => {
  try {
    let result = await axiousInstance.post(
      `${endpoints.LIKE_UNLIKE_HOME_FEED}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const UploadTemplePicture = async data => {
  try {
    let result = await axiosMultiPartFormData.post(
      `${endpoints.UPLOAD_TEMPLE_PICTURE}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const AddTempleAdmin = async data => {
  try {
    let result = await axiousInstance.post(
      `${endpoints.ADD_TEMPLE_ADMIN}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const VerifyOTP = async data => {
  try {
    let result = await axiousInstance.post(`${endpoints.CHECK_OTP}`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const NewVerifyOTP = async data => {
  try {
    let result = await axiousInstanceNew.post(`${endpoints.NEW_OTP}`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const UpdateUserPassword = async data => {
  try {
    let result = await axiousInstance.post(
      `${endpoints.UPDATE_PASSWORD}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewUpdateUserPassword = async data => {
  try {
    let result = await axiousInstanceNew.post(
      `${endpoints.NEW_UPDATE_PASSWORD}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const createTemple = async data => {
  try {
    let result = await axiousInstance.post(`${endpoints.CREATE_TEMPLE}`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const createFeed = async data => {
  try {
    let result = await axiousInstance.post(`${endpoints.CREATE_FEED}`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const getTempleList = async (pageNo, pageSize) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_TEMPLE_LIST}?pageNumber=${pageNo}&pageSize=${pageSize}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getFeedList = async (pageNo, pageSize, id) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_FEED_LIST_IN_DETAILS}?page=${pageNo}&pageSize=${pageSize}&itemId=${id}&popular=true`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getHomeFeedList = async (pageNo, pageSize, id) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_HOME_FEED_LIST}?page=${pageNo}&pageSize=${pageSize}&itemId=${id}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getMoreExploreAPI = async (pageNo, pageSize) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.MORE_TO_EXPLORE}?page=${pageNo}&pageSize=${pageSize}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getFavoritesList = async (pageNo, pageSize) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_FOLLOW_LIST}?page=${pageNo}&pageSize=${pageSize}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getFollowSearchList = async query => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_FOLLOW_LIST}?page=0&pageSize=100&query=${query}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getSearchedTemple = async query => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.MORE_TO_EXPLORE}?page=0&pageSize=20&query=${query}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const followUnfollowTemple = async data => {
  try {
    let result = await axiousInstance.post(
      `${endpoints.FOLLOW_UNFOLLOW}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getUserInfo = async () => {
  try {
    let result = await axiousInstance.get(`${endpoints.GET_CURRENT_USER}`);
    return result;
  } catch (error) {
    return error;
  }
};
export const getUserInfoNew = async () => {
  try {
    let result = await axiousInstanceNew.get(
      `${endpoints.NEW_GET_CURRENT_USER}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const createNewInvoice = async data => {
  try {
    let result = await axiousInstance.post(endpoints.Create_Invoice, data);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const upcomingOccasions = async (pageNo, pageSize) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_UPCOMING_OCCASIONS}?pageNo=${pageNo}&pageSize=${pageSize}&date=2023-02-01`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getItemCommunities = async (id, pageNo, pageSize) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_ITEM_COMMUNITIES}?itemId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getSavedPostsList = async (pageNo, pageSize) => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_SAVED_POSTS_LIST}?pageNo=${pageNo}&pageSize=${pageSize}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
