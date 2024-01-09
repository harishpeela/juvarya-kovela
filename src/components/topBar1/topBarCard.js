/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import { allTexts, colors } from '../../common';
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
              isBell || roleType || roleId ? 'space-between' : 'space-evenly',
            marginTop: '20%',
            marginHorizontal: 10,
          }}>
          {menu && (
            <TouchableOpacity
              onPress={() => navigation.navigate(allTexts.tabNames.profile)}
              style={styles.userIcon}>
              <AntDesign
                name="user"
                size={25}
                color={colors.white}
                style={{
                  marginLeft: 10,
                  right: 7,
                  top: 10,
                }}
              />
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => navigation.navigate(allTexts.tabNames.profile)}>
                <Feather
                  name="menu"
                  size={15}
                  color={colors.white}
                  style={{}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
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
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
              />
            </TouchableOpacity>
          )}
          {back && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
              />
            </TouchableOpacity>
          )}

          {cancel && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
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
                fontWeight: 'bold',
                marginHorizontal: '20%',
                color: 'white',
                alignSelf: 'center',
              }}>
              {txt}
            </Text>
          )}
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFAB0F',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 10,
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
  },
  joinText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 20,
  },
  userIcon: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 1,
    // backgroundColor: 'white',
    height: 35,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  menuIcon: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    padding: 1,
    // backgroundColor: 'white',
    height: 20,
    width: 20,
    left: 18,
    padding: 1,
  },
  userContainer: {},
});
