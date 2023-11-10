/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, allTexts, screenNames, fontSize} from './../../common/index';
import {
  Favorite,
  Profile,
  Search,
  TicketConfirmation,
  UserFeedScreen,
} from '..';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApplicationContext from '../../utils/context-api/Context';
import {getHomeFeedList} from '../../utils/api';
import {Loader} from '../../components';
import SplashScreen from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native';
import LoadingDots from 'react-native-loading-dots';
import {styles} from './style';
import { timer } from '../../common/theme';


// import {ActivityIndicator} from '@react-native-material/core';
const Tab = createBottomTabNavigator();
export default BottomTabBase = ({navigation}) => {
  const GetHomeScreen = () => <UserFeedScreen navigation={navigation} />;
  const GetSearchScreen = () => <Search navigation={navigation} />;
  const GetFavScreen = () => <Favorite navigation={navigation} />;
  const GetProfileScreen = () => <Profile navigation={navigation} />;
  const GetFavoriteScreen = () => <Favorite navigation={navigation} />;
  const GetTicketConfirmScreen = () => (
    <TicketConfirmation navigation={navigation} />
  );
  const {favoriteList} = useContext(ApplicationContext);
  const navigation2 = useNavigation();
  const [showTabs, setShowTabs] = useState(false);
  const [feedLength, setFeedLength] = useState(0);

  useEffect(() => {
    setFeedLength(favoriteList.length);
  }, [favoriteList, navigation]);

  // const getFollowedTempleList = async () => {
  //   try {
  //     let response = await getHomeFeedList(0, 100);
  //     if (response && response.status === 200) {
  //       const {
  //         data: {jtFeeds},
  //       } = response;
  //       getHomeFeedListData(jtFeeds);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const GetFavList = () => {

  //   return favoriteList?.length > 0 ? true : false;
  // };
  // useEffect(() => {
  //   setFeedLength(favoriteList.length);
  // }, [favoriteList]);
  // const [navigationScreen, setNavigationScreen] = useState();

  // // console.log('checking the feedLength => ' + feedLength);

  // useEffect(() => {
  //   const calling = async () => {
  //     console.log('...................................................');
  //     console.log('feedLength =>>>>>>>> ' + feedLength);
  //     if (feedLength === 0) {
  //       console.log('It is going inside of if Statement');
  //       setTimeout(() => {
  //         console.log('it is working now');
  //         setFeedLength(favoriteList.length);
  //         setNavigationScreen(true);
  //         SplashScreen.hide();
  //         // navigation2.navigate(allTexts.screenNames.addTample);
  //         navigation2.navigate(allTexts.screenNames.home);
  //       }, 5000);
  //     } else {
  //       console.log('It is printing in else ');
  //       setFeedLength(favoriteList.length);
  //       setNavigationScreen(true);
  //       SplashScreen.hide();
  //       navigation2.navigate(allTexts.screenNames.home);
  //     }
  //   };
  //   calling();
  //   // return () => {
  //   //   clearTimeout(setValue);
  //   // };
  // }, []);

  // useEffect(() => {
  //   if (navigationScreen) {
  //     SplashScreen.hide();
  //   } else {
  //     SplashScreen.show();
  //   }
  // }, [navigationScreen]);
  // useEffect(() => {
  //   const calling = async () => {
  //     console.log('...................................................');
  //     console.log('feedLength =>>>>>>>> ' + feedLength);
  //     if (feedLength === 0) {
  //       console.log('It is going inside of if Statement');
  //       setTimeout(() => {
  //         console.log('it is working now');
  //         setFeedLength(favoriteList.length);
  //         setNavigationScreen(true);
  //       }, 5000);
  //     } else {
  //       console.log('It is printing in else ');
  //       setFeedLength(favoriteList.length);
  //       setNavigationScreen(true);
  //     }
  //   };
  //   calling();
  // }, []);

  // useEffect(() => {
  //   if (navigationScreen) {
  //     SplashScreen.hide();
  //     // Delay the navigation after SplashScreen.hide() to ensure the component has fully mounted
  //     const delayNavigation = setTimeout(() => {
  //       navigation2.navigate(allTexts.screenNames.home);
  //     }, 100);
  //     return () => clearTimeout(delayNavigation);
  //   } else {
  //     SplashScreen.show();
  //   }
  // }, [navigationScreen]);

  // useEffect(() => {
  //   setNavigationScreen(favoriteList.length === 0);
  // }, [favoriteList]);

  // useEffect(() => {
  //   if (navigationScreen) {
  //     SplashScreen.hide();
  //     navigation.navigate(allTexts.screenNames.home);
  //   } else {
  //     SplashScreen.show();
  //   }
  // }, [navigationScreen, navigation]);

  // useEffect(()=>{
  //   if(true){
  //     SplashScreen.hide();
  //     setNavigationScreen(true);
  //   }
  //   // }else{
  //   //   setNavigationScreen(false)
  //   // }

  // },[])

  // console.log('navigationScreen =>>>>' + navigationScreen);

  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const loadTabs = async () => {
      setChecking(true); // Start checking, show SplashScreen
      try {
        // Your async tasks or conditions to determine when to show/hide tabs
        // Example: Wait for some data to load
        // const response = await fetchData();
        // if (response.success) {
        //   setShowTabs(true);
        //   SplashScreen.hide();
        // } else {
        //   setShowTabs(false);
        // }
        // For now, let's simulate a delay of 5 seconds
        await new Promise(resolve => setTimeout(resolve, timer.loaderTime));
        // After 5 seconds, hide SplashScreen and show tabs
        setShowTabs(true);+89 
        // SplashScreen.hide();
      } catch (error) {
        console.error('Error loading tabs:', error);
        // Handle errors here, if necessary
      } finally {
        setChecking(false); // Stop checking
      }
    };
    loadTabs();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {showTabs ? (
        <Tab.Navigator
          initialRouteName={
            feedLength ? allTexts.tabNames.home : allTexts.tabNames.search
          }
          tabBarOptions={{
            activeTintColor: colors.orangeColor,
            keyboardHidesTabBar: true,
            showLabel: false,
          }}>
          <Tab.Screen
            name={allTexts.tabNames.home}
            component={GetHomeScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <>
                  <FoundationIcon name="home" color={color} size={30} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.search}
            component={Search}
            options={{
              tabBarIcon: ({color, size}) => (
                <>
                  <FeatherIcon name="search" color={color} size={30} />
                </>
              ),
            }}
          />
          {/* <Tab.Screen
          name={allTexts.tabNames.ticket}
          component={TicketConfirmation}
          options={{
            tabBarIcon: ({color, size}) => (
              <>
                <MaterialIcon
                  name="ticket-confirmation-outline"
                  color={color}
                  size={30}
                />
              </>
            ),
          }}
        /> */}
          <Tab.Screen
            name={allTexts.tabNames.favorites}
            component={GetFavScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <>
                  <FontistoIcon name="heart-alt" color={color} size={25} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.profile}
            component={GetProfileScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <>
                  <FeatherIcon name="user" color={color} size={30} />
                </>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
            {/* <Text>Loading</Text> */}
            <LoadingDots
              size={15}
              bounceHeight={17}
              dots={4}
              colors={[colors.orangeColor, colors.orangeColor, colors.orangeColor, colors.orangeColor]}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
