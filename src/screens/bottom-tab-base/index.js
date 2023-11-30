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
import {timer} from '../../common/theme';

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
  const [showTabs, setShowTabs] = useState(true);
  const [feedLength, setFeedLength] = useState(0);
  useEffect(() => {
    setFeedLength(favoriteList.length);
  }, [favoriteList, navigation]);
  const [checking, setChecking] = useState(false);
  const loadTabs = async () => {
    setChecking(true)
    try {
      // Your async tasks or conditions to determine when to show/hide tabs
      // Example: Wait for some data to load
      // For now, let's simulate a delay of 5 seconds
      await new Promise(resolve => setTimeout(resolve, timer.loaderTime));
      // After 5 seconds, hide SplashScreen and show tabs
      setShowTabs(true);
    } catch (error) {
      console.error('Error loading tabs:', error);
      // Handle errors here, if necessary
    } finally {
      setChecking(false); // Stop checking
    }
  };

  useEffect(() => {
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
            <LoadingDots
              size={15}
              bounceHeight={17}
              dots={4}
              colors={[
                colors.orangeColor,
                colors.orangeColor,
                colors.orangeColor,
                colors.orangeColor,
              ]}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
