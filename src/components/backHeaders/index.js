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
  isArrow, // Corrected typo in the prop name
}) => {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isArrow && ( // Corrected condition for arrow rendering
          <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <Fontisto
              name="arrow-left"
              color={'white'}
              size={17}
              color={colors.black}
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
        ) : null}
      </View>
      {isPlus && (
        <TouchableOpacity>
          <AntDesign name="plus" size={24} color={colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};
