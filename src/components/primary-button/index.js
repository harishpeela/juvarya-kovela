import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../../common';
import {styles, textStyles} from './styles';

export const PrimaryButton = ({
  bgColor,
  textColor,
  radius,
  text,
  onPress,
  loading,
  padding,
  fontsize,
  width,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles(bgColor, radius, padding, width).wrapper}
      {...props}>
      <Text style={textStyles(textColor, fontsize).textTitle}>
        {loading == true ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  );
};
