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
<<<<<<< HEAD
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons
        name="call"
        size={16}
        color={'#CC4501'}
        style={{alignSelf: 'center', justifyContent: 'center'}}
      />
=======
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: -5,
      }}>
      <Ionicons name="call" size={16} color={'#CC4501'} />
>>>>>>> 5be67f0a4c428b30b7227da3c76c75c89e6fdd5c
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
