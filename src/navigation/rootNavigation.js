
/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import { allTexts } from '../common';
import {
  SignUp,
  Signin,
  BottomTabBase,
  OTPScreen,
  HomeCardDetails,
  UpdatePassword,
  MyTamples,
  Service,
  Poojari,
  Events,
  Favorite,
  Manage,
  AddEvents,
  NearByServices,
  CreateFeed,
  Posts,
  FollowersMembership,
  ProfileMembership,
  AddMemebershipDetails,
  SeeAll,
  NearByTemplesSeeAll,
  Feeds,
  Notifications,
  ViewTempleProfile,
  Donations,
  DonationsList,
  EventDetails,
  ForgetPassword,
  UpdateProfile,
  ProfileMemberShips,
  InvitationScreen,
  MemberShipDetails,
  TempleCrew,
  EditHighlights,
  EditContribute,
  EditInfo,
  ProfileDonations,
  ProfileMyMemberships,
  Info,
  Profile_Events,
  Save_Highlight,
  CommunityTemple,
  ToDoList,
  Profile_Near_By_Temples,
  AboutTemple,
  TempleProfileToDoList,
  MemberList,
  Artist_Donar_details_list,
  NewUserProfile,
  ArtistDonorScreen,
  ReelUpload,
  Community_Events_Seeall,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationContext from '../utils/context-api/Context';
import AddTample from '../screens/add-temple';
import MySavedPosts from '../screens/my-saved-posts';
import CreateFeedDescription from '../screens/createFeedDiscription/CreateFeedDescription';
import TempleClass from '../screens/templeCclass/TempleClass';
import { GetReels } from '../utils/api';
import {useAppSelector, useAppDispatch} from '../redux/reduxHooks';
import { useLazyGetHomeFeedDataQuery } from '../redux/services/homeFeedService';
import { homeFeedAction } from '../redux/slices/homeFeedSlice';
import RNFS from 'react-native-fs';
import { addVideoToFeed } from '../redux/slices/reelsFeedSlice';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

const rootNavigation = () => {
  const {
    screenNames: {
      signin,
      otpScreen,
      signup,
      bottomTab,
      homeDetails,
      updatePassword,
      myTamples,
      addTample,
      service,
      poojari,
      events,
      favlist,
      manage,
      addevents,
      nearByServices,
      createfeed,
      mySavedPosts,
      posts,
      followersmembership,
      profilemembership,
      addMembershipDetails,
      seeall,
      nearByTempleSeeAll,
      feeds,
      notification,
      viewtempleprofile,
      donations,
      donationslist,
      forgetPassword,
      updateProfile,
      eventDetails,
      profilememberships,
      invitationScreen,
      membershipdetails,
      templecrew,
      createFeedDescription,
      editHightlights,
      editContribute,
      editInfo,
      profileDonations,
      profileMyMemberships,
      info,
      profileEvents,
      savehighlight,
      communityTemple,
      todoList,
      profilenearbytemples,
      templeClass,
      abouttemple,
      templeProfileToDoList,
      memberlist,
      artistdonardetailslist,
      newuserprofile,
      artistDonorScreen,
      reelupload,
      communityeventsseeall,
    },
  } = allTexts;

  const [getHomeFeed] = useLazyGetHomeFeedDataQuery()
  const dispatch = useAppDispatch();

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={signin}
          component={Signin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={signup}
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={otpScreen}
          component={OTPScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={forgetPassword}
          component={ForgetPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName={bottomTab}>
        <Stack.Screen
          name={bottomTab}
          component={BottomTabBase}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={communityTemple}
          component={CommunityTemple}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={todoList}
          component={ToDoList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profileEvents}
          component={Profile_Events}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={artistDonorScreen}
          component={ArtistDonorScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={savehighlight}
          component={Save_Highlight}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={newuserprofile}
          component={NewUserProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={templecrew}
          component={TempleCrew}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={mySavedPosts}
          component={MySavedPosts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={templeClass}
          component={TempleClass}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={homeDetails}
          component={HomeCardDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={donationslist}
          component={DonationsList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={templeProfileToDoList}
          component={TempleProfileToDoList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={notification}
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={updatePassword}
          component={UpdatePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={updateProfile}
          component={UpdateProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={myTamples}
          component={MyTamples}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={membershipdetails}
          component={MemberShipDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addTample}
          component={AddTample}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={service}
          component={Service}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={poojari}
          component={Poojari}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={abouttemple}
          component={AboutTemple}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={events}
          component={Events}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={favlist}
          component={Favorite}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={manage}
          component={Manage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addevents}
          component={AddEvents}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={editHightlights}
          component={EditHighlights}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={editContribute}
          component={EditContribute}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={memberlist}
          component={MemberList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={editInfo}
          component={EditInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={nearByServices}
          component={NearByServices}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={info}
          component={Info}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={createfeed}
          component={CreateFeed}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={feeds}
          component={Feeds}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={posts}
          component={Posts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={followersmembership}
          component={FollowersMembership}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profilemembership}
          component={ProfileMembership}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addMembershipDetails}
          component={AddMemebershipDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={seeall}
          component={SeeAll}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={nearByTempleSeeAll}
          component={NearByTemplesSeeAll}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profileDonations}
          component={ProfileDonations}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profileMyMemberships}
          component={ProfileMyMemberships}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={viewtempleprofile}
          component={ViewTempleProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={donations}
          component={Donations}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={eventDetails}
          component={EventDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profilememberships}
          component={ProfileMemberShips}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={invitationScreen}
          component={InvitationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={createFeedDescription}
          component={CreateFeedDescription}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profilenearbytemples}
          component={Profile_Near_By_Temples}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={artistdonardetailslist}
          component={Artist_Donar_details_list}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={reelupload}
          component={ReelUpload}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={communityeventsseeall}
          component={Community_Events_Seeall}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  const getFollowedTempleList = () => {

    try {
      let data = {
        pageNo: 0,
        pageSize: 20,
      };
      getHomeFeed(data)
        .unwrap()
        .then(response => {
          if (response) {
            dispatch(homeFeedAction(response.jtFeeds));
          } else {
            console.log('Error: Response is undefined');
          }
        })
        .catch(error => {
          console.log('error--->', error);
        });
    } catch (error) {
      console.log('error1--->', error);
    }
  };
  useEffect(() => {
    getFollowedTempleList();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  const Stack = createStackNavigator();
  const [loginDetails, setLoginDetails] = useState(null);
  
  //Redux hooks
  const authState = useAppSelector(state => state.auth);

  const getLoginDetails = () => {
    setLoginDetails(authState.token || null);
  };

    const addLocalVideoStoragePath = async (video) => {
    try {
      const timestamp = new Date().getTime();
      const cachedVideoPath = `${RNFS.CachesDirectoryPath}/${video.id}_${timestamp}.mp4`;
      const options = {
        fromUrl: video.mediaList?.[0]?.url || '',
        toFile: cachedVideoPath,
        background: true,
        progressDivider: 1,
      };
      const downloadTask = RNFS.downloadFile(options);
      const res = await downloadTask.promise;
      if (res.statusCode === 200) {
        video.localVideoStoragePath = cachedVideoPath;
        dispatch(addVideoToFeed(video))
      } else {
        console.error('Error downloading video:', video.id);
      }
    } catch (error) {
      console.error('Error prefetching next video:', error.message);
    }
  };

  const reelsData = async (pgNo, pgSz) => {
    let result = await GetReels(pgNo, pgSz);
    if (result?.status === 200) {
      const videos = result.data.data;
      await Promise.all(videos.map(addLocalVideoStoragePath))
    } 
  };

  useEffect(() => {
    getLoginDetails();
    reelsData(0,30)
  }, []);
  
  return (
        <ApplicationContext.Provider
          value={{
            loginDetails,
            setLoginDetails
          }}>
              {loginDetails === null || loginDetails === '' ? (
                <AuthStack />
              ) : (
                <HomeStack />
              )}
        </ApplicationContext.Provider>
  );
};

export default rootNavigation;