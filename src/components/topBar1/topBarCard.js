/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {allTexts, colors} from '../../common';

import Ionicons from 'react-native-vector-icons/Ionicons';
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
  // const {userDetails} = useContext(ApplicationContext);
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: '12%',
            // marginHorizontal: 5,
          }}>
          {menu && (
            <View style={{marginLeft: '1%', flex: 1}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.newuserprofile)
                }
                style={styles.userIcon}>
                {img ? (
                  <Image
                    source={{uri: img?.url}}
                    height={40}
                    width={40}
                    style={{height: 30, width: 30, borderRadius: 80 / 2}}
                  />
                ) : (
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <EvilIcons
                      name="user"
                      size={50}
                      color={colors.orangeColor}
                    />
                  </View>
                )}
                {/* <TouchableOpacity
                  style={styles.menuIcon}
                  onPress={() =>
                    navigation.navigate(allTexts.tabNames.profile)
                  }>
                  <Feather
                    name="menu"
                    size={13}
                    color={colors.white}
                    style={{}}
                  />
                </TouchableOpacity> */}
              </TouchableOpacity>
            </View>
          )}
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
              />
            </TouchableOpacity>
          )}
          {back && (
            <TouchableOpacity style={styles.iconContainer} onPress={navBack}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
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
          {txt && (
            <Text
              style={{
                fontSize: 20,
                flex: 10,
                fontWeight: 'Normal',
                marginLeft: '1%',
                color: 'orange',
                textAlign: 'center',
                marginTop: 15,
                fontFamily: 'Poppins-Medium',
                // backgroundColor: 'red',
              }}>
              {txt}
            </Text>
          )}
          {isBell && (
            <TouchableOpacity
              style={{marginBottom: -30, marginRight: 20}}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.notification)
              }>
              {/* <Image
                source={{uri:'https://www.iconsdb.com/icons/preview/orange/bell-xxl.png'}}
                style={{ height: 30, width: 30, marginTop: '10%' }}
              /> */}
              <View style={{marginTop: 16}}>
                <Feather name="bell" size={30} color={colors.orangeColor} />
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
      {children}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: '22%',
            marginHorizontal: 1,
          }}>
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
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
                size={42}
                color="orange"
                style={{marginLeft: 2, marginTop: 6}}
              />
            </TouchableOpacity>
          )}

          {txt && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                // marginLeft: marginLeft ? marginLeft : '25%',
                marginLeft: marginLeft ? marginLeft : '15%',
                color: 'orange',
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                fontWeight: 'Normal',
                marginTop: 5,
                // backgroundColor: 'red',
              }}>
              {txt}
            </Text>
          )}
          {(roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN') && (
            <TouchableOpacity
              style={{flex: 1, marginLeft: '10%', marginTop: 2}}
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
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // marginBottom: 10,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    flex: 1,
    height: '80%',
    borderColor: 'black',
    // borderWidth:0.2,
    // elevation:
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'orange',
    marginLeft: 10,
    marginTop: -10,
  },
  joinText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    top: 5,
  },
  userIcon: {
    alignItems: 'center',
    borderRadius: 50,
    // backgroundColor: 'green',
    height: 60,
    borderColor: 'white',
    width: 60,
  },
  menuIcon: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    padding: 1,
    backgroundColor: 'gray',
    height: 20,
    width: 20,
    left: 15,
    padding: 1,
    top: -15,
  },

  plusIcon: {
    color: colors.white,
  },
  plusContainer: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    textAlign: 'center',
    height: 31,
    width: 31,
    marginLeft: '26%',
  },
});
