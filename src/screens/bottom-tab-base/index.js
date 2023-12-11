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
import {BackgroundImage, Loader} from '../../components';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
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
  const getEventsScreen = () => {
    setIndex(1);
    return <EventsScreen navigation={navigation} />;
  };
  const {homeFeedListData} = useContext(ApplicationContext);
  const [feedLength, setFeedLength] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setFeedLength(homeFeedListData?.length);
  }, [homeFeedListData, navigation]);

  return (
    <SafeAreaView
      style={{flex: 1, borderWidth: 4}}
      showsVerticalScrollIndicator={false}>
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
              tabBarStyle: {
                height: 200,
              },
              tabBarIcon: ({color, size}) => (
                <View style={styles.container}>
                  <FoundationIcon name="home" color={color} size={30} />
                  <Text style={{color: color}}>Home</Text>
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
                  <FeatherIcon name="search" color={color} size={30} />
                  <Text style={{color: color}}>search</Text>
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
            name={allTexts.screenNames.eventsScreen}
            component={getEventsScreen}
            // name={"sas"}
            options={{
              tabBarIcon: ({color, size}) => (
                <View
                  style={{
                    ...styles.imageContainer,
                    borderColor: index == 1 ? colors.orangeColor : 'gray',
                    borderWidth: index == 1 ? 2 : 0.5,
                  }}>
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
                  <FontistoIcon name="heart-alt" color={color} size={25} />
                  <Text style={{color: color}}>saved</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.profile}
            component={GetProfileScreen}
            // name={"sas"}
            options={{
              tabBarIcon: ({color, size}) => (
                <View style={styles.container}>
                  <FeatherIcon name="user" color={color} size={30} />
                  <Text style={{color: color}}>profile</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};
