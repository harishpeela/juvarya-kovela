import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../common';
import {styles} from './style';
import {Loader} from '..';
import IconVoice from 'react-native-vector-icons/MaterialIcons';

export const SearchBar = ({
  value,
  onTextChange,
  onSubmit,
  bgColor,
  placeHolder,
  loading,
  onCrossPress,
}) => {
  return (
    <View>
      <View
        style={[
          styles.searchContainer,
          {backgroundColor: bgColor ? bgColor : colors.gray4},
        ]}>
        <View style={styles.iconContainer}>
          <Icon name="search1" size={20} color={colors.gray} />
          <TextInput
            onChangeText={onTextChange}
            placeholderTextColor={colors.gray}
            placeholder={placeHolder || 'Search temples'}
            style={styles.field}
            value={value}
            // maxLength={25}
            onSubmitEditing={onSubmit}
          />

          {loading && <Loader size={25} color={colors.green2} />}
          {value !== '' && !loading && (
            <Feather
              onPress={onCrossPress}
              name="x-circle"
              color={colors.orangeColor}
              size={25}
            />
          )}
          {/* <IconVoice name="keyboard-voice" size={25} /> */}
        </View>
      </View>
    </View>
  );
};
