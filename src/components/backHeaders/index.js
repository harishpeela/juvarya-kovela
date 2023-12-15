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
              // color={txtColor === undefined ? <></> : txtColor}
              color={'white'}
              size={17}
            />
          </TouchableOpacity>
        )}
        {txt ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: txtColor === undefined ? <></> : txtColor,
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
