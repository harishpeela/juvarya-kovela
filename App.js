import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {LogBox} from 'react-native';
import {allTexts} from './src/common';
import {
  Splash,
  SignUp,
  Signin,
  BottomTabBase,
  OTPScreen,
  HomeCardDetails,
  UpdatePassword,
  MyTamples,
  Service,
  Seemore,
  CreatePost,
  Poojari,
  Events,
  Favorite,
  Occasions,
  Manage,
  Calender,
  AddEvents,
  NearByProducts,
  NearByServices,
  UserFeedScreen,
  TempleProfile,
  ViewProfile,
  Menu,
  AddTempleNew,
  Splash_Screen,
  CreateFeed,
  Profile,
  Feed,
  Posts,
} from './src/screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  getAuthTokenDetails,
  saveUserDetails,
} from './src/utils/preferences/localStorage';
import ApplicationContext from './src/utils/context-api/Context';
import AddTample from './src/screens/add-temple';
import {getFavoritesList, getUserInfo} from './src/utils/api';
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
      createPost,
      poojari,
      events,
      favlist,
      occasions,
      manage,
      calender,
      addevents,
      nearByProducts,
      nearByServices,
      templeProfile,
      viewProfile,
      menu,
      addtemplenew,
      splashscreen,
      createfeed,
      userFeedScreen,
      feed,
      profile,
      mySavedPosts,
      posts,
    },
  } = allTexts;

  useEffect(() => {
    getLoginDetails();
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={splashscreen}
          component={Splash_Screen}
          options={{
            headerShown: false,
          }}
        />
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
      <Stack.Navigator>
        <Stack.Screen
          name={bottomTab}
          component={BottomTabBase}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name={profile}
          component={Profile}
          options={{
            headerShown: false,
          }}
        /> */}
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
          name={createPost}
          component={CreatePost}
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
        <Stack.Screen
          name={calender}
          component={Calender}
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
          name={templeProfile}
          component={TempleProfile}
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
          name={feed}
          component={Feed}
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
      </Stack.Navigator>
    );
  };

  const Stack = createStackNavigator();
  const [loginDetails, setLoginDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);
  const [id, setId] = useState();
  const getLoginDetails = async () => {
    let authDetails = await getAuthTokenDetails();
    setLoginDetails(authDetails);
  };

  const getAndSaveUserInfo = async () => {
    try {
      let response = await getUserInfo();
      // console.log('userInfoo', response);
      if (response && response.status === 200) {
        const {
          data: {
            firstName,
            lastName,
            emailAddress,
            roles: {customerRoles},
          },
        } = response;
        let userRole = customerRoles[0];
        const {
          role: {roleName},
        } = userRole;
        saveUserDetails({
          username: `${firstName} ${lastName}`,
          email: emailAddress,
          role: roleName,
        });
        setUserDetails({
          username: `${firstName} ${lastName}`,
          email: emailAddress,
          role: roleName,
        });
      }
    } catch (error) {
      console.log('Error 786' + error.message);
    }
  };

  const getFollowedTempleList = async () => {
    try {
      let response = await getFavoritesList(0, 100);
      if (response && response.status === 200) {
        const {
          data: {followingObjects},
        } = response;
        setFavoriteList(followingObjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginDetails != null && loginDetails != '') {
      getAndSaveUserInfo();
      getFollowedTempleList();
    }
    console.log('user', userDetails);
  }, [loginDetails]);
  console.log('userDe', userDetails);

  return (
    <ApplicationContext.Provider
      value={{
        loginDetails,
        setLoginDetails,
        userDetails,
        setUserDetails,
        favoriteList,
        setFavoriteList,
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
