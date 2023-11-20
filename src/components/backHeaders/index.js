/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../common';
import Fontisto from 'react-native-vector-icons/Fontisto'

export const BackHeaderNew = ({
  txtColor,
  onPress,
  txt,
  isPlus,
  onPlusPress,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Fontisto
          name="arrow-left"
          color={txtColor === undefined ? <></> : txtColor}
          size={17}
        />
      </TouchableOpacity>
      {txt ? (
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            marginHorizontal: 10,
            color: txtColor === undefined ? <></> : txtColor,
          }}>
          {txt}
        </Text>
      ) : (
        <></>
      )}

      {isPlus && (
        <TouchableOpacity style={{marginLeft: '45%'}} onPress={onPlusPress}>
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
