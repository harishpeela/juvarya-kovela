/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import React from 'react';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import CalenderIcon from 'react-native-vector-icons/AntDesign';

export const EventHeader = ({
  txt,
  onBackPress,
  isOption,
  plusButton,
  onPlusPress,
  onDotsPress,
}) => {
  return (
    <View style={[styles.continer, {margin: !isOption ? 0 : 10}]}>
      <View style={styles.iconContainer}>
        <Icon
          onPress={onBackPress}
          name="arrow-left-circle"
          color={colors.green2}
          size={35}
        />
        <Text style={[styles.title, {marginLeft: !isOption ? 30 : 15}]}>
          {txt}
        </Text>
      </View>
      {isOption && (
        <TouchableOpacity style={styles.icon}>
          <CalenderIcon
            name="calendar"
            color={colors.white}
            size={22}
            onPress={onDotsPress}
          />
        </TouchableOpacity>
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
