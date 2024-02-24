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
  axiosMultiPartFormDataMem,
  axiousInstanceNew1,
  axiosEventsData1,
  axiosNotifications,
  axiosDonation,
  axiousInstanceNew2,
} from './api';

const endpoints = {
  NEW_SIGN_IN: 'auth/signin',
  NEAR_BY_TEMPLE: 'jtprofile/byTempleClass',
  NEW_SIGN_UP: 'auth/signup',
  FORGOT_PASSWORD: 'auth/forgot/password',
  NEW_OTP: 'auth/jtuserotp/trigger',
  NEW_GET_CURRENT_USER: 'auth/currentCustomer',
  NEW_UPDATE_PASSWORD: 'customer/password',
  NEW_ADMIN_VERIFY: 'jtprofile/admin/verify',
  NEW_POPULAR_TEMPLES: 'jtprofile/popular',
  NEW_PROFIL_PICTURE: '/picture/profile?profileId',
  NEW_FOLLOW_UMFOLLOW: 'jtfollower/create',
  NEW_SAVE_FEED: '/jtfeedtocustomer/save',
  NEW_FOLLOW_UNFOLLOW_BY_ID: '/jtfollower/profile',
  NEW_LIKE_UNLIKE_HOME_FEED: '/jtfeedreview/like',
  NEW_LIKES_COUNT: '/jtfeedreview/likes?feedId',
  NEW_FOLLOW_COUNT: '/jtfollower/count',
  NEW_FAVORITES: '/jtfollower/profile',
  TEMPLE_DETAILS: 'jtprofile',
  NEW_GET_TEMPLESDETAILS_WITH_TEMPID: 'jtprofile',
  NEW_GET_MY_TEMPELS_LIST: 'jtfollower/customer?customerId',
  NEW_TEMPLE_ROLE_WITH_ID: 'jtprofile/customer-roles?profileId',
  CEATE_FEED: 'jtfeed/create',
  CREATE_EVENT: 'jtevent/save',
  EVENT_SAVE: 'jtEventInformation/save',
  EVENT_UPDATE: 'jtEventInformation/update',
  EVENTS_HIGHLIGHTS: 'jtEventHighlights/list/byEvent',
  INTRESTED_EVENTS: 'jtInterestedEvents/save',
  DONATIONS: '/jtDonation/save',
  DONATION_TYPE: 'jtDonationType/byType',
  UPDATE_PROFILE: 'customer/userDetails',
  TOP_DONATION: 'jtDonation/donars',
  DONATION_LIST: 'jtDonation/list',
  DELETE_DONATIONS: 'jtDonation/delete?donationId',
  DONATION_TYPES: 'donationtype/list',
  MEMBER_SHIP_COUNT: 'jtProfileMembership/count?profileId',
  MEMBER_SHIP_DETAILS: '/jtProfileMembership/members/list',
  MEMBER_SHIP_LIST: '/jtProfileMembership/list',
  MEMBER_SHIP_INVITE: '/jtProfileMembership/invite',
  MEMBER_SHIP_CREATE: 'jtProfileMembership/create',
  MEMBERS_LIST: '/jtProfileMembership/profile/members?membershipId',
  TEMPLE_CREW: 'jtprofile/find/users',
  FEED: '/jtfeed/',
  EVENTS_LIST: 'jtevent/list',
  EVENTS_SCREE_LIST: 'jtevent/upcoming/events',
  EVENT_SEARCH: 'jtevent/byName',
  EVENT_DETAILS: 'jtevent/details',
  PROFILE_EVENTS: 'jtevent/upcoming',
  EVENT_INTERESTED: 'jtInterestedEvents/save',
  EVENT_INTERESTED_COUNT: 'jtInterestedEvents/list',
  DELETE_SAVE_FEED: 'jtfeedtocustomer/delete?feedId',
  DELETE_FEED: 'jtfeed/delete/feed?feedId',
  NOTIFICATIONS: 'jtprofile/follower/notification',
  CUSTOMER_PROFILE_PICTURE: '/picture/customer?email',
  UPDATE_PROFILE_PICTURE: '/picture/customer',
  TEMPLE_FOLLOWERS_LIST: '/jtfollower/profile?profileId',
  ADMIN_TEMPLES: 'jtprofile/admin/profiles',
  GET_POSTS: '/jtfeed/feedsOfProfile',
  GET_SEARCHED_POPULAR_TEMPELS: 'jtprofile/list',
  GET_TEMPLE_LIST: 'v1/agent/item/list',
  GET_HOME_FEED_LIST: '/jtfeed/list',
  CREATE_TEMPLE: 'v1/agent/item/create',
  CREATE_FEED: 'v1/feed/post',
  UPLOAD_TEMPLE_PICTURE: 'v1/jtitem/picture',
  ADD_TEMPLE_ADMIN: 'v1/agent/role/update',
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
  GET_SAVED_POSTS_LIST: '/jtfeedtocustomer/list',
  GENERATE_TOKEN:
    'v1/oauth/token?grant_type=client_credentials&client_id=skillrat-client&client_secret=skillrat@2021',
  SAVE_FEED: 'v1/jtfeedtocustomer/save',
  MY_MEMBERSHIPS: '/jtProfileMembership/list',
  MY_DONATIONS: 'jtDonation/user/donations',
  PROFILE_DONATIONS: 'jtDonation/user/donations/list',
  PROFILE_MEMBERSHIPS: 'jtProfileMembership/user/memberships',
  TEMPLE_COMMUNITY: 'jtprofile/',
  EVENT_HIGHLIGHTS: 'jtEventHighlights/save',
  EVENT_EDIT_HIGHLIGHTS: 'jtEventHighlights/update',
  EVENTS_INFO: 'jtEventInformation/list/byEvent',
  TEMPLE_ADDRESS: 'jtAddress/default',
  CREATE_COMMUNITY_TEMPLE: 'jtprofile/seasonal/create',
  NEAR_BY_TEMPLES: 'jtAddress/nearByTemples',
  UPLOAD_TEMPLE_PROFILE_PIC: 'picture/profile',
  PROFILE_NEAR_BY_TEMPLES: 'jtProfileToProfile/list/byProfile',
  GET_TEMPLE_CLASS: 'jtProfileToProfile/list',
  ABOUT_TEMPLE: 'jtProfileHistory/find/byProfile',
  EDIT_ABOUT_TEMPLE: 'jtProfileHistory/update',
  SAVE_ABOUT_TEMPLE: 'jtProfileHistory/save',
  PROFILE_TODO_LIST: 'jttask/save',
  GET_PROFILE_TODO_LIST: 'jttask/customer/tasks',
  ARTIST_DONAR: 'jtprofile/profileAndDonor',
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
  console.log('login api develop', data, endpoints?.NEW_SIGN_IN);
  try {
    let result = await authAxiousInstance1.post(
      `${endpoints.NEW_SIGN_IN}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in login===>>', error);
    return error;
  }
};

export const forgotPassword = async data => {
  try {
    let result = await authAxiousInstance1.put(
      `${endpoints.FORGOT_PASSWORD}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in login', error);
    return error;
  }
};

export const DonationsPost = async data => {
  try {
    let result = await axiosDonation.post(`${endpoints.DONATIONS}`, data);
    return result;
  } catch (error) {
    console.log('error in login', error);
    return error;
  }
};
export const DonationsType = async type => {
  try {
    let result = await axiosDonation.get(`${endpoints.DONATION_TYPE}/${type}`);
    return result;
  } catch (error) {
    console.log('error in login', error);
    return error;
  }
};
export const AddressUpdate = async data => {
  try {
    let result = await axiosAddressData1.post(
      `${endpoints.ADDRESS_UPDATE}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in login', error);
    return error;
  }
};
export const PopularTemples = async (pgNo, pgsize) => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.NEW_POPULAR_TEMPLES}?pageNo=${pgNo}&pageSize=${pgsize}`,
      {
        // retry: 5,
        // retryDelay: 3000,
      },
    );
    return result;
  } catch (error) {
    console.log('error in popular temples', error);
  }
};

export const TempleCommunity = async templeId => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.TEMPLE_COMMUNITY}/${templeId}`,
      {},
    );
    return result;
  } catch (error) {
    console.log('error in popular community temples', error);
  }
};

export const TempleAddress = async templeId => {
  try {
    let result = await axiousInstanceNew2.get(
      `${endpoints.TEMPLE_ADDRESS}/${templeId}`,
      {},
    );
    return result;
  } catch (error) {
    console.log('error in temples Address', error);
  }
};

export const NearByTempleClass = async (classType, pgno, pgsize) => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.NEAR_BY_TEMPLE}?templeClass=${classType}&pageNo=${pgno}&pageSize=${pgsize}`,
      {
        // retry: 5,
        // retryDelay: 3000,
      },
    );
    return result;
  } catch (error) {
    console.log('error in popular temples', error);
  }
};
export const NewTempleCrew = async (id, pgNo, pgSz) => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.TEMPLE_CREW}?profileId=${id}&pageNo=${pgNo}&pageSize=${pgSz}`,
      {
        // retry: 5,
        // retryDelay: 3000,
      },
    );
    return result;
  } catch (error) {
    console.log('error in temple crew', error);
  }
};
// export const NearByTemple = async (id) => {
//   try {
//     let result = await axiosNewData.get(`${endpoints.NearByTemple}?profileId=${id}`, {
//       // retry: 5,
//       // retryDelay: 3000,
//     });
//     return result;
//   } catch (error) {
//     console.log('error in popular temples', error);
//   }
// };

export const SearchPopularTemples = async txt => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.NEW_POPULAR_TEMPLES}?query=${txt}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    console.log('error in searched popular temples', error);
  }
};

export const SearchTempleRoleWithId = async profId => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.NEW_TEMPLE_ROLE_WITH_ID}=${profId}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {}
};
export const AdminTemples = async () => {
  try {
    let result = await axiosNewData.get(`${endpoints.ADMIN_TEMPLES}`);
    return result;
  } catch (error) {
    console.log('error in temple admins', error);
  }
};

export const CreateCommunityTemple = async data => {
  try {
    let result = await axiosNewData.post(
      `${endpoints.CREATE_COMMUNITY_TEMPLE}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in community Temple', error);
  }
};

export const GetProfilePic = async mailId => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.CUSTOMER_PROFILE_PICTURE}=${mailId}`,
    );
    return result;
  } catch (error) {
    // console.log('error in profilepic get', error);
  }
};

export const PostProfilePic = async data => {
  try {
    let result = await axiosMultiPartFormData1.post(
      `${endpoints.UPDATE_PROFILE_PICTURE}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in post profile pic', error);
  }
};
export const Create_Feed = async data => {
  try {
    let result = await axiosMultiPartFormData1.post(
      `${endpoints.CEATE_FEED}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in post feed', error);
  }
};
export const Update_Profile = async data => {
  try {
    let result = await axiousInstanceNew1.put(
      `${endpoints.UPDATE_PROFILE}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error in popular temples', error);
  }
};
export const TempleFollowersList = async id => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.TEMPLE_FOLLOWERS_LIST}=${id}`,
    );
    return result;
  } catch (error) {
    console.log('error in temple follwers lit', error);
  }
};
export const Feed = async id => {
  try {
    let result = await axiosMultiPartFormData1.get(`${endpoints.FEED}${id}`);
    return result;
  } catch (error) {
    console.log('error in temple follwers lit', error);
  }
};
export const getTempledetailsWithId = async id => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.NEW_GET_TEMPLESDETAILS_WITH_TEMPID}/${id}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const DeleteSavedFeed = async id => {
  try {
    let result = await axiosMultiPartFormData1.delete(
      `${endpoints.DELETE_SAVE_FEED}=${id}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFeedData = async id => {
  try {
    let result = await axiosMultiPartFormData1.delete(
      `${endpoints.DELETE_FEED}=${id}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const GetsearchPopularTemples = async name => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.GET_SEARCHED_POPULAR_TEMPELS}?query=${name}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const profileToDoList = async data => {
  try {
    let result = await axiosNewData.post(
      `${endpoints.PROFILE_TODO_LIST}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const GetProfileToDoList = async (pgno, pgSize) => {
  try {
    let result = await axiosNewData.get(
      `${endpoints.GET_PROFILE_TODO_LIST}?pageNo=${pgno}&pageSize=${pgSize}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const GetMyTemples = async (custId, pgno, pgSize) => {
  try {
    let result = await axiosNewData1.get(
      `${endpoints.NEW_GET_MY_TEMPELS_LIST}=${custId}&page=${pgno}&pageSize=${pgSize}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const getTopDonation = async (custId, pgno, pgSize) => {
  try {
    let result = await axiosDonation.get(
      `${endpoints.TOP_DONATION}?jtProfile=${custId}&pageNo=${pgno}&pageSize=${pgSize}&active=false`,
    );
    return result;
  } catch (error) {
    console.log('error in donation api', error);
  }
};

export const getDonationList = async (custId, pgno, pgSize) => {
  try {
    let result = await axiosDonation.get(
      `${endpoints.DONATION_LIST}?&pageNo=${pgno}&pageSize=${pgSize}&profileId=${custId}`,
    );
    return result;
  } catch (error) {
    console.log('error in get donation list', error);
  }
};
export const deleteDonations = async custId => {
  try {
    let result = await axiosDonation.delete(
      `${endpoints.DELETE_DONATIONS}=${custId}`,
    );
    return result;
  } catch (error) {
    console.log('error in delete donation', error);
  }
};

export const EventList = async (pgno, pgSize) => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.EVENTS_LIST}?&page=${pgno}&pageSize=${pgSize}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const EventScreenList = async (pgno, pgSize) => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.EVENTS_SCREE_LIST}?page=${pgno}&pageSize=${pgSize}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const EventSearch = async txt => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.EVENT_SEARCH}?eventName=${txt}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const getProfileEvents = async (pgno, pgSize, profId) => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.PROFILE_EVENTS}?pageNo=${pgno}&pageSize=${pgSize}&itemId=${profId}`,
    );
    return result;
  } catch (error) {
    console.log('error in profile events', error);
  }
};
export const IntrestedEvents = async data => {
  try {
    let result = await axiosEventsData1.post(
      `${endpoints.EVENT_INTERESTED}`,
      data,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const EventDetail = async id => {
  try {
    let result = await axiosEventsData1.get(`${endpoints.EVENT_DETAILS}/${id}`);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const EventInterested = async payload => {
  try {
    let result = await axiosEventsData1.post(
      `${endpoints.EVENT_INTERESTED}`,
      payload,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const CreateEvent = async payload => {
  try {
    let result = await axiosEventsData1.post(
      `${endpoints.CREATE_EVENT}`,
      payload,
    );
    return result;
  } catch (error) {
    console.log('error in create event', error);
  }
};

export const Save_Event = async payload => {
  try {
    let result = await axiosEventsData1.post(
      `${endpoints.EVENT_SAVE}`,
      payload,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const UpdateInfo = async payload => {
  try {
    let result = await axiosEventsData1.put(
      `${endpoints.EVENT_UPDATE}`,
      payload,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const Event_Highlights = async eveId => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.EVENTS_HIGHLIGHTS}/${eveId}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const Event_Info = async eventId => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.EVENTS_INFO}?eventId=${eventId}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const EventInterestedCount = async id => {
  try {
    let result = await axiosEventsData1.get(
      `${endpoints.EVENT_INTERESTED_COUNT}?eventId=${id}&pageNo=${0}&pageSize=${50}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
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
export const MemberShipCount = async id => {
  try {
    let result = await axiosMultiPartFormDataMem.get(
      `${endpoints.MEMBER_SHIP_COUNT}=${id}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const MembersList = async (membershipId, pgno, pgsz) => {
  try {
    let result = await axiosMultiPartFormDataMem.get(
      `${endpoints.MEMBERS_LIST}=${membershipId}&pageNo=${pgno}&pageSize=${pgsz}`,
      //=3&pageNo=0&pageSize=100
    );
    return result;
  } catch (error) {
    console.log('error in members list', error);
  }
};

export const MyMemberships = async (profileId, pgno, pgsz) => {
  try {
    let result = await axiosMultiPartFormDataMem.get(
      `${endpoints.MY_MEMBERSHIPS}?profileId=${profileId}&pageNo=${pgno}&pageSize=${pgsz}`,
    );
    return result;
  } catch (error) {
    console.log('error in members list', error);
  }
};

export const MyDonations = async profileId => {
  try {
    let result = await axiosDonation.get(
      `${endpoints.MY_DONATIONS}?profileId=${profileId}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const ProfileDonationsData = async () => {
  try {
    let result = await axiosDonation.get(`${endpoints.PROFILE_DONATIONS}`);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const EventHighLights = async () => {
  try {
    let result = await axiosEventsData1.post(`${endpoints.EVENT_HIGHLIGHTS}`);
    return result;
  } catch (error) {
    console.log('error in edit high lights', error);
  }
};

export const EventEditHighLights = async () => {
  try {
    let result = await axiosEventsData1.post(`${endpoints.EVENT_HIGHLIGHTS}`);
    return result;
  } catch (error) {
    console.log('error in edit high lights', error);
  }
};

export const ProfileMembershipsData = async (profileId, pgsz) => {
  try {
    let result = await axiosDonation.get(
      `${endpoints.PROFILE_MEMBERSHIPS}?profileId=${profileId}&pageSize=${pgsz}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const MemberShipDetails = async (pgNo, pgSize) => {
  try {
    let result = await axiosMultiPartFormDataMem.get(
      `${endpoints.MEMBER_SHIP_DETAILS}?pageNo=${pgNo}&pageSize=${pgSize}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const MemberShipList = async (id, pageNo, pageSize) => {
  try {
    let result = await axiosMultiPartFormDataMem.get(
      `${endpoints.MEMBER_SHIP_LIST}?profileId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const MemberShipInvite = async payload => {
  try {
    // Provide the data payload in the axios post call
    let result = await axiosMultiPartFormDataMem.post(
      `${endpoints.MEMBER_SHIP_INVITE}`,
      payload,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const MemberShipCreate = async payload => {
  try {
    // Provide the data payload in the axios post call
    let result = await axiosMultiPartFormDataMem.post(
      `${endpoints.MEMBER_SHIP_CREATE}`,
      payload,
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
export const GetPosts = async (id, pgfrm, pgto) => {
  try {
    let result = await axiosNewData1.get(
      `${endpoints.GET_POSTS}?page=${pgfrm}&pageSize=${pgto}&id=${id}`,
      // {retry: 5, retryDelay: 3000},
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
    console.log('error in followunfollow api', error);
  }
};
export const verifyAdminProfile = async (profileId, custId) => {
  try {
    let result = await axiousInstanceFeed.get(
      `${endpoints.NEW_ADMIN_VERIFY}?profileId=${profileId}&customerId=${custId}`,
      {retry: 5, retryDelay: 3000},
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewFavFollowersList = async (profileId, pgno, pgsze) => {
  try {
    let result = await axiosNewData1.get(
      `${endpoints.NEW_FAVORITES}?page=${pgno}&pageSize=${pgsze}&profileId=${profileId}`,
      {retry: 5, retryDelay: 3000},
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
export const uploadTempleProfilePic = async (data, profileId) => {
  try {
    let result = await axiosNewDataSave.post(
      `${endpoints.UPLOAD_TEMPLE_PROFILE_PIC}?profileId=${profileId}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewLikeOrUnlikeFeed = async data => {
  try {
    let result = await axiosNewDataSave.post(
      `${endpoints.NEW_LIKE_UNLIKE_HOME_FEED}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewLikesCount = async id => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.NEW_LIKES_COUNT}=${id}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const NewFollowCount = async id => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.NEW_FOLLOW_COUNT}/${id}`,
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
export const NewUpdateUserPassword = async data => {
  try {
    let result = await axiousInstanceNew1.put(
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

export const getHomeFeedList = async (pageNo, pageSize) => {
  try {
    var d = new Date();
    var n = d.getTime();
    let result = await axiosNewData1.get(
      `${endpoints.GET_HOME_FEED_LIST}?pageNo=${pageNo}&pageSize=${pageSize}`,
      {retry: 5, retryDelay: 3000},
    );
    var a = new Date();
    var ns = a.getTime();
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
export const getUserInfoNew = async () => {
  try {
    let result = await axiousInstanceNew1.get(
      `${endpoints.NEW_GET_CURRENT_USER}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getSavedPostsList = async () => {
  try {
    let result = await axiosMultiPartFormData1.get(
      `${endpoints.GET_SAVED_POSTS_LIST}`,
      {
        // retry: 5,
        // retryDelay: 3000,
      },
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getNotifications = async () => {
  try {
    let result = await axiosNotifications.get(`${endpoints.NOTIFICATIONS}`);
    return result;
  } catch (error) {
    return error;
  }
};

export const getDonationTypes = async (pgNo, pgSz) => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.DONATION_TYPES}?pageNo=${pgNo}&pageSize=${pgSz}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getTempleProfileDetails = async id => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.TEMPLE_DETAILS}/${id}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getNearByTemples = async (code, pgNo, pgSz) => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.NEAR_BY_TEMPLES}?isoCode=${code}&pageNo=${pgNo}&pageSize=${pgSz}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getProfileNearByTemples = async (pgNo, pgSz, profId) => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.PROFILE_NEAR_BY_TEMPLES}?page=${pgNo}&pageSize=${pgSz}&profileId=${profId}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getTempleClassDetails = async (profileId, templeClass) => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.GET_TEMPLE_CLASS}/byProfile?page=0&pageSize=20&profileId=${profileId}&templeClass=${templeClass}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getAboutTemple = async profId => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.ABOUT_TEMPLE}/${profId}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getEditAboutTemple = async data => {
  try {
    let result = await axiosNotifications.put(
      `${endpoints.EDIT_ABOUT_TEMPLE}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const saveAboutTemple = async data => {
  try {
    let result = await axiosNotifications.post(
      `${endpoints.SAVE_ABOUT_TEMPLE}`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const getArtistDonar = async (profId, pgNo, pgSz) => {
  try {
    let result = await axiosNotifications.get(
      `${endpoints.ARTIST_DONAR}?profileId=${profId}&pageNo=${pgNo}&pageSize=${pgSz}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
