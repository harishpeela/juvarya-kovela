/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {allTexts, colors} from '../../common';
export const TopBarcard = ({
  txtColor,
  onPress,
  txt,
  isPlus,
  onPlusPress,
  isBell,
  arrow,
  cancel,
  userIcon,
  children,
  menu,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: isBell ? 'space-between' : 'space-evenly',
            marginTop: '15%',
            marginHorizontal: '5%',
          }}>
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 6}}
              />
            </TouchableOpacity>
          )}
          {menu && (
            <TouchableOpacity onPress={() => alert('under Development')}>
              <Entypo name="menu" size={20} color={'white'} />
            </TouchableOpacity>
          )}
          {/* <View>
            {userIcon && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 1,
                  backgroundColor: 'white',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name="user"
                  size={25}
                  color={colors.black}
                  style={{
                    marginLeft: 10,
                    right: 5,
                    top: 10,
                  }}
                />
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    padding: 1,
                    backgroundColor: 'white',
                    height: 25,
                    width: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 24,
                    padding: 1,
                  }}>
                  <Feather
                    name="menu"
                    size={20}
                    color={colors.black}
                    style={{}}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View> */}
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
                marginHorizontal: '23%',
                color: 'white',
                alignSelf: 'center',
              }}>
              {txt}
            </Text>
          )}
        </View>

        {isPlus && (
          <TouchableOpacity style={{}} onPress={onPlusPress}>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        )}
        {isBell && (
          <TouchableOpacity
            style={{marginRight: '4%'}}
            onPress={() =>
              navigation.navigate(allTexts.screenNames.notification)
            }>
            <Image
              source={require('../../../assets/images/bell.png')}
              style={{height: 25, width: 25, marginRight: '2%'}}
            />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAB0F',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
});
