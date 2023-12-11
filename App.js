/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import { allTexts } from './src/common';


import {
  Splash,
  SignUp,
  Signin,
  BottomTabBase,
  OTPScreen,
  HomeCardDetails,
  UserFeedScreen,
  UpdatePassword,
  MyTamples,
  Service,
  Seemore,
  Poojari,
  Events,
  Favorite,
  Occasions,
  Manage,
  AddEvents,
  NearByProducts,
  NearByServices,
  ViewProfile,
  Menu,
  AddTempleNew,
  CreateFeed,
  Profile,
  Posts,
  FollowersMembership,
  ProfileMembership,
  AddMemebershipDetails,
  SeeAll,
  Feeds,
  Notifications,
  ViewTempleProfile,
  Donations,
  MemberShip,
  EventsScreen,
  DonationsList,
  EventDetails,
  CreateEvent,
  ProfileMemberShips,
} from './src/screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  getAuthTokenDetails,
  saveUserDetails,
} from './src/utils/preferences/localStorage';
import ApplicationContext from './src/utils/context-api/Context';
import AddTample from './src/screens/add-temple';
import { getHomeFeedList, getUserInfoNew } from './src/utils/api';
import MySavedPosts from './src/screens/my-saved-posts';
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);


const App = () => {
  const {
    screenNames: {
      signin,
      otpScreen,
      signup,
      splash,
      bottomTab,
      homeDetails,
      updatePassword,
      myTamples,
      addTample,
      service,
      seemore,
      poojari,
      events,
      favlist,
      occasions,
      manage,
      addevents,
      nearByProducts,
      nearByServices,
      viewProfile,
      menu,
      addtemplenew,
      createfeed,
      userFeedScreen,
      feed,
      profile,
      mySavedPosts,
      posts,
      followersmembership,
      profilemembership,
      addMembershipDetails,
      seeall,
      feeds,
      notification,
      viewtempleprofile,
      donations,
      memberShip,
      eventsScreen,
      donationslist,
      eventsDetails,
      createEvent,
      profilememberships
    },
  } = allTexts;
  useEffect(() => {
    getLoginDetails();
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
  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={splash}
          component={Splash}
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
          name={signin}
          component={Signin}
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
      </Stack.Navigator>
    );
  };
  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="BottomTab">
        <Stack.Screen
          name={splash}
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={bottomTab}
          component={BottomTabBase}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={profile}
          component={Profile}
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
          name={myTamples}
          component={MyTamples}
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
          name={seemore}
          component={Seemore}
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
          name={userFeedScreen}
          component={UserFeedScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name={home}
          component={UserFeedScreen}
          options={{
            headerShown: false,
          }}
        /> */}
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
          name={occasions}
          component={Occasions}
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
        {/* <Stack.Screen
          name={calender}
          component={Calender}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name={addevents}
          component={AddEvents}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={nearByProducts}
          component={NearByProducts}
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
          name={viewProfile}
          component={ViewProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={menu}
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addtemplenew}
          component={AddTempleNew}
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
          name={feed}
          component={Feeds}
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
          name={eventsScreen}
          component={eventsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={memberShip}
          component={MemberShip}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={eventsDetails}
          component={EventDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={createEvent}
          component={CreateEvent}
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
      </Stack.Navigator>
    );
  };

  const Stack = createStackNavigator();
  const [loginDetails, setLoginDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);
  const [homeFeedListData, getHomeFeedListData] = useState();
  const [id, setId] = useState();
  const getLoginDetails = async () => {
    let authDetails = await getAuthTokenDetails();
    setLoginDetails(authDetails);
  };

  const ApiData = async () => {
    let result = await getUserInfoNew();
    try {
      if (result) {
        saveUserDetails({
          username: result?.data?.firstName + result?.data?.lastName,
          email: result.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
        setUserDetails({
          username: result?.data?.firstName + result?.data?.lastName,
          email: result.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
      }
    } catch (error) {
      console.log('error in get current customer details api', error);
    }
  };
  const getFollowedTempleList = async () => {
    try {
      let response = await getHomeFeedList(0, 20);
      if (response && response?.status === 200) {
        const {
          data: { jtFeeds },
        } = response;
        getHomeFeedListData(jtFeeds);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loginDetails != null && loginDetails != '') {
      ApiData();
      getFollowedTempleList();
    }
  }, [loginDetails]);

  return (
    <ApplicationContext.Provider
      value={{
        loginDetails,
        setLoginDetails,
        userDetails,
        setUserDetails,
        favoriteList,
        setFavoriteList,
        homeFeedListData,
        getHomeFeedListData,
        id,
        setId,
      }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <NavigationContainer>
          {loginDetails === null || loginDetails === '' ? (
            <AuthStack />
          ) : (
            <HomeStack />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </ApplicationContext.Provider>
  );
};

export default App;
