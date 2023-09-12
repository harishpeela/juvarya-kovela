/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, allTexts} from './../../common/index';
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
const Tab = createBottomTabNavigator();
export default BottomTabBase = ({navigation}) => {
  const GetHomeScreen = () => <UserFeedScreen navigation={navigation} />;
  const GetSearchScreen = () => <Search navigation={navigation} />;
  const GetFavScreen = () => <Favorite navigation={navigation} />;
  const GetProfileScreen = () => <Profile navigation={navigation} />;
  const GetTicketConfirmScreen = () => (
    <TicketConfirmation navigation={navigation} />
  );
  const GetFavList = () => {
    const {favoriteList} = useContext(ApplicationContext);
    return favoriteList?.length > 0 ? true : false;
  };
  const {favoriteList} = useContext(ApplicationContext);
  return (
    <SafeAreaView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <Tab.Navigator
        initialRouteName={
          // GetFavList() ? allTexts.tabNames.home : allTexts.tabNames.search
          !favoriteList?.length
            ? allTexts.tabNames.search
            : allTexts.tabNames.home
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
          component={GetSearchScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <>
                <FeatherIcon name="search" color={color} size={30} />
              </>
            ),
          }}
        />
        <Tab.Screen
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
        />
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
    </SafeAreaView>
  );
};
