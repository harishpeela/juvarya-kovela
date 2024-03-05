import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from './../../common/index';
import {styles} from './styles';

export const Loader = ({color, size, dynmicStyle}) => {
  return (
    <View style={[styles.container, dynmicStyle]}>
      <ActivityIndicator size={size || 'large'} color={color || colors.orangeColor} />
    </View>
  );
};
