/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {getNotifications} from '../../utils/api';
import {Loader, TopBarcard} from '../../components';
import {
  BackHeaderNew,
  NotificationCard,
  NewBackHeader
} from '../../components';
import { HeaderComponent } from '../../components/header_comp/HeaderComponent';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../common';
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
    <View style={{ flex: 1}}>
      <StatusBar backgroundColor={'#FFAB0F'} animated={true} />
      <View style={{}}>
        <View style={{height: 90}}>
        {/* <TopBarcard txt={'Notifications'} cancel={true} onPress={() => navigation.goBack()}>
          <Text> hello </Text>
        </TopBarcard> */}
        <HeaderComponent
        titleName={'Account'}
        // rightFirstImage={IC_CHAT_ROUND}
        // rightSecondImage={IC_NOTIFICATION_ACCOUNT}
        subContainerStyle={{ backgroundColor: colors.orangeColor }}
        onRightSecondImagePress={() =>
          navigation.goBack()
        }
        onRightFirstImagePress={() => alert('welcome')}
      />
        </View>
        <View style={{marginTop: 50}}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
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
              <Text style={{color: 'black'}}>No notifications for this user</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Notifications;
