/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getNotifications} from '../../utils/api';
import {Loader} from '../../components';
import {
  BackHeaderNew,
  BackgroundImage,
  NotificationCard,
} from '../../components';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../common';
import { setDefaultNamespace } from 'i18next';
const Notifications = ({navigation}) => {
  const [notificationdata, setNotificationData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [name, setName] = useState();

  const GetNotifications = async () => {
    try {
      let result = await getNotifications();
      let Data = result?.data?.customerRoles;
      let mapping = Data?.filter(item => item)?.map(({notifications}) => ({notifications}));
      let FilteredData = mapping[0]?.notifications;
      console.log('filterd', FilteredData);
      setNotificationData(FilteredData)
      setLoader(false);
    } catch (error) {
      console.log('error in notifications', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    GetNotifications();
  }, []);
  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <BackgroundImage />
      <View style={{marginTop: '10%', margin: 15}}>
        <BackHeaderNew
          txt={'Notifications'}
          onPress={() => navigation.goBack()}
        />
        <View style={{marginTop: '5%'}}>
          {loader ? (
            <Loader size={'small'} color={colors.orangeColor} />
          ) : notificationdata?.length ? (
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={notificationdata}
                showsVerticalScrollIndicator={false}
                keyExtractor={({item, index}) => index}
                renderItem={({item, index}) => (
                  <NotificationCard data={item} />
                )}
              />
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
