/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import React from 'react';
import {styles} from './styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
export const BackHeader = ({
  txt,
  onBackPress,
  isOption,
  plusButton,
  onPlusPress,
  onDotsPress,
}) => {
  return (
    <View style={[styles.continer, {marginLeft: !isOption ? 10 : 10}]}>
      <View style={styles.iconContainer}>
        <Icon
          onPress={onBackPress}
          name="arrow-left"
          color={'black'}
          size={30}
        />
        <Text style={[styles.title, {marginLeft: !isOption ? 10 : 15}]}>
          {txt}
        </Text>
      </View>
      {isOption && (
        <View style={styles.icon}>
          <EntypoIcon
            name="dots-three-vertical"
            color={colors.black}
            size={20}
            onPress={onDotsPress}
          />
        </View>
      )}
      {plusButton && (
        <TouchableOpacity onPress={onPlusPress}>
          <View style={styles.plusContainer}>
            <Icon name="plus" color={'white'} size={20} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
