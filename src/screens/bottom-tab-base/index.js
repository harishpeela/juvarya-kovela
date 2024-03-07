/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, allTexts} from './../../common/index';
import {
  EventsScreen,
  Favorite,
  Profile,
  Search,
  TicketConfirmation,
  UserFeedScreen,
  KovelaReels
} from '..';
import {Loader} from '../../components';
import FontAwesome6 from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import Entypo from 'react-native-vector-icons/Entypo';
const Tab = createBottomTabNavigator();
export default BottomTabBase = ({navigation}) => {
  // const GetHomeScreen = () => <UserFeedScreen navigation={navigation} />;
  const GetSearchScreen = () => <Search navigation={navigation} />;
  const GetFavScreen = () => <Favorite navigation={navigation} />;
  const GetProfileScreen = () => <Profile navigation={navigation} />;
  const GetEventScreen = () => <EventsScreen navigation={navigation} />;
  const GetReelsScreen = () => <KovelaReels navigation={navigation} />;

  const GetTicketConfirmScreen = () => (
    <TicketConfirmation navigation={navigation} />
  );
  const {homeFeedListData} = useContext(ApplicationContext);
  const [feedLength, setFeedLength] = useState(0);
  useEffect(() => {
    setFeedLength(homeFeedListData?.length);
  }, [homeFeedListData, navigation]);
  return (
    <SafeAreaView
      keyboardHidesTabBar={true}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      {homeFeedListData === undefined ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <Tab.Navigator
          backBehavior={'history'}
          screenOptions={{
            tabBarStyle: {innerHeight: '5%'},
          }}
          initialRouteName={
            homeFeedListData?.length
              ? allTexts.tabNames.home
              : allTexts.tabNames.search
          }
          tabBarOptions={{
            style: {
              height: '8%',
              // width: '95%',
              flexDirection: 'row',
              // marginBottom: '2%',
              // borderRadius: 15,
              alignSelf: 'center',
            },
            activeTintColor: colors.orangeColor,
            keyboardHidesTabBar: true,
            showLabel: false,
          }}>
          <Tab.Screen
            name={allTexts.screenNames.eventsScreen}
            component={GetEventScreen}
            options={{
              tabBarIcon: ({color, size, focused}) => (
                <View
                  style={!focused ? styles.container : styles.focusedContainer}>
                  {focused && (
                    <Entypo
                      name="dot-single"
                      size={20}
                      color={colors.orangeColor}
                      style={styles.dot}
                    />
                  )}
                  <MaterialIcons
                    name="event"
                    color={color}
                    size={focused ? 28 : 23}
                  />
                  <Text style={{color: color, fontSize: 14}}>Events</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.search}
            component={Search}
            options={{
              tabBarIcon: ({color, size, focused}) => (
                <View
                  style={!focused ? styles.container : styles.focusedContainer}>
                  {focused && (
                    <Entypo
                      name="dot-single"
                      size={15}
                      color={colors.orangeColor}
                      style={styles.dot}
                    />
                  )}
                  <FeatherIcon
                    name="search"
                    color={color}
                    size={focused ? 28 : 23}
                  />
                  <Text style={{color: color, fontSize: 14}}>Search</Text>
                </View>
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
            name={allTexts.tabNames.home}
            component={UserFeedScreen}
            options={{
              tabBarStyle: {
                height: 200,
              },
              tabBarIcon: ({color, size, focused}) => (
                <View
                  style={!focused ? styles.container : styles.UserFeedFocusedContainer}>
                  {focused && (
                    <Entypo
                      name="dot-single"
                      size={20}
                      color={colors.orangeColor}
                      style={styles.dot}
                    />
                  )}
                  <Image
                    source={require('../../utils/assets/images/Kovela-logo.png')}
                    style={focused ? styles.imageFocused : styles.imageNormal}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.kovelareels}
            component={KovelaReels}
            options={{
              tabBarIcon: ({color, size, focused}) => (
                <View
                  style={!focused ? styles.container : styles.focusedContainer}>
                  {focused && (
                    <Entypo
                      name="dot-single"
                      size={20}
                      color={colors.orangeColor}
                      style={styles.dot}
                    />
                  )}
                  <FontAwesome6
                    name="local-movies"
                    color={color}
                    size={focused ? 22 : 23}
                  />
                  <Text style={{color: color, fontSize: 14}}>Spirituals</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.profile}
            component={GetProfileScreen}
            options={{
              tabBarIcon: ({color, size, focused}) => (
                <View
                  style={!focused ? styles.container : styles.focusedContainer}>
                  {focused && (
                    <Entypo
                      name="dot-single"
                      size={20}
                      color={colors.orangeColor}
                      style={styles.dot}
                    />
                  )}
                  <FeatherIcon
                    name="user"
                    color={color}
                    size={focused ? 28 : 23}
                  />
                  <Text style={{color: color, fontSize: 14}}>Profile</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};
