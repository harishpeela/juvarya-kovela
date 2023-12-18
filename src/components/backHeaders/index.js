/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../common';

export const BackHeaderNew = ({
  txtColor,
  onPress,
  txt,
  isPlus,
  onPlusPress,
  isArrrow,
}) => {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isArrrow && (
          <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <Fontisto
              name="arrow-left"
              color={'white'}
              size={17}
            />
          </TouchableOpacity>
        )}
        {txt && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: 'black',
              marginLeft: 10
            }}>
            {txt}
          </Text>
        )}
      </View>
      {isPlus && (
        <TouchableOpacity>
          <AntDesign name="plus" size={24} color={colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};
