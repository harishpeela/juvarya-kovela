import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../../common';
import {styles} from './styles';

export const InputTypeAddTemp3 = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  onChange,
  data,
  ...props
}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={{color: colors.green, fontSize: 16}}>{title}</Text>
        <View style={styles.fieldContainer}>
          <TextInput
            value={value}
            placeholderTextColor={colors.gray2}
            onChangeText={onChange}
            style={styles.inputText}
            {...props}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};
