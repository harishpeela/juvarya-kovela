/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, useColorScheme} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../common';
import {styles} from './style';
import {Loader} from '..';

export const SearchBar = ({
  value,
  onTextChange,
  onSubmit,
  bgColor,
  placeHolder,
  loading,
  onCrossPress,
  showCrossPress,
  brColor,
  brWidth,
  srHeight,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.iconContainer}>
      <TextInput
        onChangeText={onTextChange}
        placeholderTextColor={colors.orangeColor}
        placeholder={placeHolder || 'Search temples'}
        style={{
          ...styles.field,
          color: colors.orangeColor,
        }}
        value={value}
        onSubmitEditing={onSubmit}
        autoCapitalize={false}
        selectionColor={colors.orangeColor}
      />
      {loading && <Loader size={25} color={colors.green2} />}

      {showCrossPress === true && value !== '' && !loading && (
        <View
          style={{
            backgroundColor: '#FAFAFA',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Feather
            onPress={onCrossPress}
            name="x-circle"
            color={colors.orangeColor}
            size={20}
            style={{}}
          />
        </View>
      )}
    </View>
  );
};
