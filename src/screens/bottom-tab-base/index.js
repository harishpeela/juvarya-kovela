/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, allTexts} from './../../common/index';
import {Loader} from '../../components';
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
  const GetSearchScreen = () => <Search navigation={navigation} />;
  const GetFavoriteScreen = () => <Favorite navigation={navigation} />;
  const GetTicketConfirmScreen = () => (
    <TicketConfirmation navigation={navigation} />
  );
  // const GetFavList = () => {
  //   const {homeFeedListData} = useContext(ApplicationContext);
  //   useEffect(() => {}, [ApplicationContext]);
  //   // console.log('listkjsx', homeFeedListData?.length);
  //   return homeFeedListData?.length > 0 ? true : false;
  // };
  const {homeFeedListData} = useContext(ApplicationContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (homeFeedListData?.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [homeFeedListData]);
  return (
    <SafeAreaView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {loading ? (
        <View>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <Tab.Navigator
          initialRouteName={
            // allTexts.screenNames.userFeedScreen
            // !GetFavList() ? allTexts.tabNames.search : allTexts.tabNames.home
            !homeFeedListData?.length
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
            component={GetFavoriteScreen}

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
            component={Profile}
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
