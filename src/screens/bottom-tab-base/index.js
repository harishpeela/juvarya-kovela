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
} from '..';
import {Loader } from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import {style} from '../newprofile/styles';
import {getSearchedTemple} from '../../utils/api';
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
  const GetEventScreen = () => <EventsScreen navigation={navigation} />;
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
      style={{flex: 1, borderWidth: 4}}
      showsVerticalScrollIndicator={false}>
      {homeFeedListData === undefined ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <Tab.Navigator
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
              height: '10%',
              width: '95%',
              // flexDirection: 'row',
              // marginBottom: '2%',
              borderRadius: 15,
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
              tabBarIcon: ({color, size}) => (
                <View style={styles.container}>
                  <MaterialIcons name="event" color={color} size={23} />
                  <Text style={{color: color}}>Events</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.search}
            component={Search}
            options={{
              tabBarIcon: ({color, size}) => (
                <View style={styles.container}>
                  <FeatherIcon name="search" color={color} size={23} />
                  <Text style={{color: color}}>Search</Text>
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
              tabBarIcon: ({color, size}) => (
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../utils/assets/images/Kovela-logo.png')}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.favorites}
            component={GetFavScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <View style={styles.container}>
                  <FontistoIcon name="heart-alt" color={color} size={20} />
                  <Text style={{color: color}}>Favorites</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.profile}
            component={Profile}
            options={{
              tabBarIcon: ({color, size}) => (
                <View style={styles.container}>
                  <FeatherIcon name="user" color={color} size={23} />
                  <Text style={{color: color}}>Profile</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};
