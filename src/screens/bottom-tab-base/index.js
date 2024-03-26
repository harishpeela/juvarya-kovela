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
  KovelaReels,
  Details_Screen,
} from '..';
import {Loader} from '../../components';
import FontAwesome6 from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import {getUserInfoNew, Update_Profile} from '../../utils/api';
import Entypo from 'react-native-vector-icons/Entypo';
const Tab = createBottomTabNavigator();
export default BottomTabBase = ({navigation}) => {
  const [newSignUp, setNewSignUp] = useState();
  const [loader, setLoader] = useState(false);
  const userInfo = async () => {
    setLoader(true);
    let responce = await getUserInfoNew();
    console.log('responce ==>><<>>', responce?.data);
    if (responce?.status === 200 && responce?.data) {
      setNewSignUp(responce?.data);
      setLoader(false);
    } else {
      setNewSignUp('');
      setLoader(false);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const onSubmit = async () => {
    if (fullName === '') {
      alert('please fill first name');
    } else if (email === '') {
      alert('please fill email address');
    } else if (!email.includes('@gmail.com')) {
      alert('please enter valid email id');
    } else if (fullName && email) {
      console.log('navihation', navigation);
      let payload = {
        primaryContact: newSignUp?.primaryContact,
        dob: '',
        gender: '',
        zodiacSign: '',
        // "postalCode": 531031,
        fullName: fullName,
        email: email,
      };
      console.log('palyload', payload);
      let result = await Update_Profile(payload);
      console.log('res od upate profile', result?.data);
      if (result?.status === 200) {
        setNewSignUp('');
      } else {
        alert('somethig went wrong');
      }
    }
  };
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
      {loader ? (
        <View>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : newSignUp?.newUser ? (
        <Details_Screen
          navigation={navigation}
          onChangeemail={e => setEmail(e)}
          onChangename={e => setFullName(e)}
          onPress={() => onSubmit()}
        />
      ) : homeFeedListData === undefined ? (
        <View style={{flex: 1, marginTop: '3%'}}>
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
              flexDirection: 'row',
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
                  style={
                    !focused
                      ? styles.container
                      : styles.UserFeedFocusedContainer
                  }>
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
