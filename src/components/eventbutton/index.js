import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';

export const PrimaryEventButton = ({text, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper} {...props}>
      <Text style={styles.textTitle}>{text}</Text>
    </TouchableOpacity>
  );
};
