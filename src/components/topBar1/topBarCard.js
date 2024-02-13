/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {allTexts, colors} from '../../common';
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
            marginTop: '22%',
            marginHorizontal: 5,
          }}>
          {menu && (
            <View style={{marginLeft: 18, flex: 1}}>
              <TouchableOpacity
                onPress={() => navigation.navigate(allTexts.tabNames.profile)}
                style={styles.userIcon}>
                {img ? (
                  <Image source={{uri: img?.url}} height={40} width={40} style={{height: 30, width: 30, borderRadius: 80 / 2}} />
                ) : (
                  <View style={{borderWidth: 1, borderRadius: 60 / 2, height: 30, width: 30, alignItems: 'center', justifyContent: 'center', borderColor: 'white'}}>
                    <AntDesign
                  name="user"
                  size={20}
                  color={colors.white}
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
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={navBack}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
              />
            </TouchableOpacity>
          )}
          {cancel && (
            <TouchableOpacity style={styles.iconContainer} onPress={() => alert('kajns')}>
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
                fontWeight: 'bold',
                marginLeft: '-5%',
                color: 'white',
                textAlign: 'center',
                // backgroundColor: 'red',
              }}>
              {txt}
            </Text>
          )}
          {isBell && (
            <TouchableOpacity
              style={{marginRight: '5%', flex: 1}}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.notification)
              }>
              <Image
                source={require('../../../assets/images/bell.png')}
                style={{height: 25, width: 25, marginRight: '2%'}}
              />
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
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
              />
            </TouchableOpacity>
          )}

          {txt && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: txt.length >= 12 ? '21%' : '23%',
                color: 'white',
                textAlign: 'center',
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
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFAB0F',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 10,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 10,
    marginTop: 5,
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
    // backgroundColor: 'white',
    height: 30,
    borderColor: 'white',
    width: 35,
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
    top: -15
  },
  userContainer: {},
});
