/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground, Image, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common';
export const BackgroundSmallFlower = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/smallflower.png')}
      style={{
        height: 30,
        width: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10,
      }}>
      <AntDesign name="plus" size={16} color={colors.white} />
    </ImageBackground>
  );
};

export const BackgroundSmallFlowerCall = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/smallflower.png')}
      style={{
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons
        name="call"
        size={16}
        color={'#CC4501'}
        style={{alignSelf: 'center', justifyContent: 'center'}}
      />
    </ImageBackground>
  );
};

export const BackgroundSmallFlowerUser = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/smallflower.png')}
      style={{
        height: 30,
        width: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: -5,
      }}>
      <Image
        source={require('../../../assets/images/person.png')}
        height={20}
        width={20}
        style={{height: 20, width: 20}}
      />
    </ImageBackground>
  );
};

export const BackgroundSmallFlowerRs = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/smallflower.png')}
      style={{
        height: 30,
        width: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: -5,
      }}>
      <Text>₹</Text>
    </ImageBackground>
  );
};
