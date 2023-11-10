/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../common';


export const BackHeaderNew = ({txtColor,onPress, txt, isPlus, onPlusPress}) => {
  return (
    <View style={{}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <Feather name="arrow-left-circle" color={txtColor === undefined ? (<></>):txtColor} size={28} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '500', marginHorizontal: 10, color:txtColor === undefined ? (<></>):txtColor }}>
          {txt}
        </Text>
        {isPlus && (
          <TouchableOpacity style={{marginLeft: '45%'}} onPress={onPlusPress}>
            <AntDesign name="plus" size={24} color={txtColor === undefined ? (<></>):txtColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
