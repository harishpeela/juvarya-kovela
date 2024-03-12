/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { allTexts } from '../../common';
import { colors } from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FollowUnFollow } from '../../utils/api';

export const Artist_Search = ({
  name,
  img,
  type,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 20,
        margin: 5,
        backgroundColor: 'white',
        height: 165,
        width: 190,
        elevation: 4,
        shadowOpacity: 5,
        padding: 4,
        
      }}
      onPress={onPress}>
      <View style={{ alignItems: 'center', marginTop: 10, height: '70%', backgroundColor: 'white' }}>
        <Image
          source={{
            uri: img ? img
              : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
          }}
          style={{ height: '100%', width: '90%', borderRadius: 15, resizeMode: 'cover' }}
          imageStyle={{ borderRadius: 20 }} />
      </View>

      <View style={{ marginLeft: '5%', marginTop: '2%' }}>
        <Text style={{ color: colors.black, fontWeight: 'bold' }}>
          {name?.length < 20 ? `${name}` : `${name?.substring(0, 20)}..`}
        </Text>
        {type && (
          <Text style={{color: colors.orangeColor, fontWeight: '900'}}>{type} </Text>
        )}

      </View>
    </TouchableOpacity>
  );
};
