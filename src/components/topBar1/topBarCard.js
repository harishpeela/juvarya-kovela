/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { getNotifications } from '../../utils/api';
// import { GetProfilePic } from '../../utils/api';
// import ApplicationContext from '../../utils/context-api/Context';

export const TopBarcard = ({
  txtColor,
  onPress,
  txt,
  isPlus,
  onPlusPress,
  isBell,
  arrow,
  cancel,
  children,
  menu,
  navigation,
  back,
  navBack,
  navMenu,
  roleId,
  roleType,
  navCreate,
  height,
}) => {
  const [img, setImg] = useState(null);
  // const ProfilePic = async () => {
  //   let result = await GetProfilePic(userDetails?.email);
  //   if(result?.data){
  //     setImg(result?.data);
  //   } else {
  //     setImg(null);
  //   }
  // };
  // useEffect(() => {
  //   ProfilePic();
  // })
  const [notificationsCount, setNotificationCount] = useState(0);

  const GetNotificationsCount = async () => {
    try {
      let result = await getNotifications();
      let Data = result?.data?.customerRoles;
      let mapping = Data?.filter(item => item)?.map(({notifications}) => ({
        notifications,
      }));
      let FilteredData = mapping[0]?.notifications;
      if(FilteredData?.length > 10){
        setNotificationCount("9+");
      }
      else{
        setNotificationCount(FilteredData?.length);
      }
     
    } catch (error) {
      console.log('error in notifications while fetching for notifications count on topBarCard ', error);
    }
  };

  useEffect(() => {
    GetNotificationsCount();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 0.15,alignItems:'center' }}>
          {menu && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.newuserprofile)
                }
                style={styles.userIcon}>
                {img ? (
                  <Image
                    source={{ uri: img?.url }}
                    height={40}
                    width={40}
                  />
                ) : (
                    <EvilIcons
                      name="user"
                      size={45}
                      color={colors.orangeColor}
                    />
                )}
              </TouchableOpacity>
          )}
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{ height: 10, width: 10 }}
              />
            </TouchableOpacity>
          )}
          {back && (
            <TouchableOpacity style={styles.iconContainer} onPress={navBack}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{ height: 10, width: 10 }}
              />
            </TouchableOpacity>
          )}
          {cancel && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => alert('kajns')}>
              <MaterialIcons
                name="cancel"
                size={20}
                color={colors.orangeColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 0.7, }}>
          {txt && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'Normal',
                color: 'orange',
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                // backgroundColor: 'red',
              }}>
              {txt}
            </Text>
          )}
          {children}
        </View>
        <View style={{ flex: 0.15, alignItems:'center' }}>
          {isBell && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(allTexts.screenNames.notification)
              }>
              <View>
                <Feather name="bell" size={30} color={colors.orangeColor} />
                {
                  notificationsCount !== 0 && (
                    <>
                    <View style={styles.notificationsCount}>
                  <Text style={styles.notificationCountNumber}>
                    {notificationsCount}
                  </Text>
                  </View>
                    </>
                  ) 
                }
                
              </View>
            </TouchableOpacity>
          )}
          {(roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN') && (
            <TouchableOpacity onPress={navCreate}>
              <Text style={styles.joinText}>Create</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export const TopBarCard2 = ({
  onPress,
  txt,
  arrow,
  children,
  navigation,
  back,
  roleId,
  roleType,
  navCreate,
  height,
  bData,
  marginLeft,
  isPlus,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 0.15, alignItems:'center'  }}>
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{ height: 10, width: 10 }}
              />
            </TouchableOpacity>
          )}
          {back && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                navigation.goBack(),
                {
                  data: bData,
                };
              }}>
              <Ionicons
                name="arrow-back-circle"
                size={40}
                color="orange"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 0.7}}>
          {txt && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'orange',
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                fontWeight: 'Normal',
              }}>
              {txt}
            </Text>
          )}
          {children}
        </View>
        <View style={{ flex: 0.15}}>
          {(roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN') && (
            <TouchableOpacity
              onPress={navCreate}>
              <Text style={styles.joinText}>Create</Text>
            </TouchableOpacity>
          )}
          {isPlus && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(allTexts.screenNames.communityTemple)
              }
              style={styles.plusContainer}>
              <FeatherIcon
                style={styles.plusIcon}
                name="plus"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: 60,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:'3%'
  },
  children: {
    flex: 0.70,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinText: {
    color: colors.orangeColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userIcon: {
    alignItems: 'center',
    borderRadius: 25,
    // backgroundColor: 'green',
    height: 45,
    borderColor: 'white',
    width: 45,
  },
  menuIcon: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    padding: 1,
    backgroundColor: 'gray',
    height: 20,
    width: 20,
    padding: 1,
  },

  plusIcon: {
    color: colors.white,
  },
  plusContainer: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    textAlign: 'center',
    height: 30,
    width: 30,
  },
  notificationsCount:{
    borderWidth:1,
    borderColor:colors.orangeColor,
    backgroundColor:"white",
    borderRadius:10,
    height:18,
    width:18,
    alignItems:"center",
    justifyContent:'center',
    position:"absolute",
    top:-5,
    left:15
  },
  notificationCountNumber:{
    color:colors.orangeColor,
    fontSize:10
  }
});