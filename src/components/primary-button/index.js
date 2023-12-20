import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../../common';
import {styles, textStyles} from './styles';

export const PrimaryButton = ({
  shadow,
  bgColor,
  textColor,
  radius,
  text,
  onPress,
  loading,
  padding,
  fontsize,
  width,
  height,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles(bgColor, radius, padding, width,height).wrapper]}
      {...props}>
      <Text style={textStyles(textColor, fontsize).textTitle}>
        {loading === true ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          <Text>{text}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};
