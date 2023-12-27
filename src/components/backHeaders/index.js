/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

export const BackHeaderNew = ({
  txtColor,
  onPress,
  txt,
  isPlus,
  onPlusPress,
  color
}) => {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity  onPress={onPress}>
          <Fontisto
            name="arrow-left"
           color={color}
            size={17}
          />
        </TouchableOpacity>
        {txt ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal:'30%',
              
            }}>
            {txt}
          </Text>
        ) : (
          <></>
        )}
      </View>

      {isPlus && (
        <TouchableOpacity onPress={onPlusPress}>
          <AntDesign
            name="plus"
            size={24}
            color={txtColor === undefined ? <></> : txtColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
