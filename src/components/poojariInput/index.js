/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const Input = ({placeholder, props, phtc, oct, value}) => {
  return (
    <View>
      <TextInput
        {...props}
        maxLength={60}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={phtc}
        onChangeText={oct}
        style={{borderBottomWidth: 1}}
      />

    </View>
  );
};
