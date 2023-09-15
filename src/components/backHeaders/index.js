/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../common';

export const BackHeaderNew = ({onPress, txt, isPlus, onPlusPress}) => {
  return (
    <View style={{}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <Feather name="arrow-left-circle" color={colors.black2} size={28} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: '500', marginHorizontal: 10}}>
          {txt}
        </Text>
        {isPlus && (
          <TouchableOpacity style={{marginLeft: '45%'}} onPress={onPlusPress}>
            <AntDesign name="plus" size={24} color={colors.orangeColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
