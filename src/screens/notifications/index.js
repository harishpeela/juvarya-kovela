/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getNotifications} from '../../utils/api';
import {Loader} from '../../components';
import {
  BackHeaderNew,
  BackgroundImage,
  NotificationCard,
} from '../../components';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../common';
const Notifications = ({navigation}) => {
  const [notificationdata, setNotificationData] = useState([]);
  const [loader, setLoader] = useState();
  const [name, setname] = useState();
  // const GetNotifications = async () => {
  //   setLoader(true);
  //   try {
  //     let result = await getNotifications();
  //     console.log('res of notifications', result?.data[0]?.notifications[0]);
  //     let Data = result?.data[0]?.notifications;
  //     if (Data) {
  //       setNotificationData(Data);
  //       setLoader(false);
  //     } else {
  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     console.log('error in notifications', error);
  //     setLoader(false);
  //   }
  // };

  const GetNotifications = async () => {
    setLoader(true);
    try {
      let result = await getNotifications();
      console.log('res of notifications', result?.data[0]?.notifications[0]);
      let Data = result?.data[0]?.notifications;
      let mapping = result?.data[0]?.jtProfileDTO;
      let tempName = mapping?.name;

      // let MapData = mapping
      //   .filter(array => array)
      //   .map(({jtProfileDTO, notifications}) => ({
      //     jtProfileDTO,
      //     notifications,
      //   }));
      console.log('MapData', mapping);
      if (Data) {
        setNotificationData(Data);
        setname(tempName);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in notifications', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    GetNotifications();
  }, []);
  console.log('motifications', notificationdata);
  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <BackgroundImage />
      <View style={{marginTop: '20%', margin: 15}}>
        <BackHeaderNew
          txt={'Notifications'}
          onPress={() => navigation.goBack()}
        />
        <View>
          {loader ? (
            <Loader size={'small'} color={colors.orangeColor} />
          ) : notificationdata?.length ? (
            <ScrollView>
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={notificationdata}
                showsVerticalScrollIndicator={false}
                keyExtractor={({item, index}) => index}
                renderItem={({item, index}) => (
                  <NotificationCard data={item} name={name} />
                )}
              />
            </ScrollView>
          ) : (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: '40%',
              }}>
              <Text>No notifications for this user</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Notifications;
