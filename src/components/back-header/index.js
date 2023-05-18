import {View, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import CalenderIcon from 'react-native-vector-icons/AntDesign';

export const BackHeader = ({
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
          color={colors.orangeColor}
          size={35}
        />
        <Text style={[styles.title, {marginLeft: !isOption ? 30 : 15}]}>
          {txt}
        </Text>
      </View>
      {isOption && (
        <View style={styles.icon}>
          <EntypoIcon
            name="dots-three-vertical"
            color={colors.orangeColor}
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
