/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
export const BackHeaderNew = ({onPress, txt}) => {
  return (
    <View style={{}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: '500', marginHorizontal: 10}}>
          {txt}
        </Text>
      </View>
    </View>
  );
};
