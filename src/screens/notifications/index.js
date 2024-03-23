/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {getNotifications} from '../../utils/api';
import {Loader, TopBarcard} from '../../components';
import {BackHeaderNew, NotificationCard, NewBackHeader} from '../../components';
import {HeaderComponent} from '../../components/header_comp/HeaderComponent';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {statusBarHeight} from '../../utils/config/config';
const Notifications = ({navigation}) => {
  const [notificationdata, setNotificationData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [name, setName] = useState();

  const GetNotifications = async () => {
    try {
      let result = await getNotifications();
      console.log('res of noti', result?.data?.customerRoles);
      console.log('res of notification data', result?.data);
      let Data = result?.data?.customerRoles;
      let mapping = Data?.filter(item => item)?.map(({notifications}) => ({
        notifications,
      }));
      let FilteredData = mapping[0]?.notifications;
      // console.log('filterd', FilteredData);
      setNotificationData(FilteredData);
      setLoader(false);
    } catch (error) {
      console.log('error in notifications', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    GetNotifications();
  }, []);
  console.log('filterd', notificationdata);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{}}>
        <View style={{height: 60, marginTop: statusBarHeight}}>
          <TopBarCard2
            txt={'Notifications'}
            back={true}
            navigation={navigation}
          />
        </View>
        <View style={{}}>
          {loader ? (
            <View style={{}}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : notificationdata?.length ? (
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={notificationdata}
              showsVerticalScrollIndicator={false}
              keyExtractor={({item, index}) => index}
              renderItem={({item, index}) => <NotificationCard data={item} />}
            />
          ) : (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: '50%',
              }}>
              <FontAwesome
                name="bell-slash"
                color={'orange'}
                size={30}
                style={{marginBottom: '5%', alignSelf: 'center'}}
              />
              <Text
                style={{
                  color: 'orange',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 15,
                }}>
                No Notifications Yet{' '}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Notifications;
