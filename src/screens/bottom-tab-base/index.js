/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, allTexts} from './../../common/index';
import {
  Favorite,
  Profile,
  Search,
  TicketConfirmation,
  UserFeedScreen,
} from '..';
import {BackgroundImage, Loader} from '../../components';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import ApplicationContext from '../../utils/context-api/Context';
const Tab = createBottomTabNavigator();
export default BottomTabBase = ({navigation}) => {
  // const GetHomeScreen = () => <UserFeedScreen navigation={navigation} />;
  // const GetHomeScreen = () => {
  //   return(
  //     <Tab.Navigator
  //     initialRouteName={allTexts.screenNames.userFeedScreen}
  //     screenOptions={{headerShown: false}}
  //     component
  //   )
  // }
  const GetSearchScreen = () => <Search navigation={navigation} />;
  const GetFavScreen = () => <Favorite navigation={navigation} />;
  const GetProfileScreen = () => <Profile navigation={navigation} />;
  const GetFavoriteScreen = () => <Favorite navigation={navigation} />;
  const GetTicketConfirmScreen = () => (
    <TicketConfirmation navigation={navigation} />
  );
  const {homeFeedListData} = useContext(ApplicationContext);
  const [feedLength, setFeedLength] = useState(0);
  useEffect(() => {
    setFeedLength(homeFeedListData?.length);
  }, [homeFeedListData, navigation]);

  return (
    <SafeAreaView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {homeFeedListData === undefined ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <BackgroundImage />
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {innerHeight: 200},
          }}
          initialRouteName={
            homeFeedListData?.length
              ? allTexts.tabNames.home
              : allTexts.tabNames.search
          }
          tabBarOptions={{
            activeTintColor: colors.orangeColor,
            keyboardHidesTabBar: true,
            showLabel: false,
          }}>
          <Tab.Screen
            name={allTexts.tabNames.home}
            component={UserFeedScreen}
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
      )}
    </SafeAreaView>
  );
};
