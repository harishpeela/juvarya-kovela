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
    <View>
      <View
        // eslint-disable-next-line no-sparse-arrays
        style={[
          styles.searchContainer,
          {backgroundColor: bgColor ? bgColor : colors.white},
          {borderWidth: brWidth ? brWidth : 0},
          {borderColor: brColor ? brColor : colors.white},
          {height: srHeight ? srHeight : 30},
        ]}>
        <View style={styles.iconContainer}>
          <Icon name="search1" size={16} color={colors.gray} />
          <TextInput
            onChangeText={onTextChange}
            placeholderTextColor={colors.gray}
            placeholder={placeHolder || 'Search temples'}
            style={{...styles.field, color: isDarkMode ? colors.black : colors.black}}
            value={value}
            onSubmitEditing={onSubmit}
            autoCapitalize={false}
          />
          {loading && <Loader size={25} color={colors.green2} />}
          {showCrossPress === true ? (
            <>
              {value !== '' && !loading && (
                <Feather
                  onPress={onCrossPress}
                  name="x-circle"
                  color={colors.orangeColor}
                  size={25}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
