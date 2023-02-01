import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../../common';
import {styles} from './style';
import PhoneIcon from 'react-native-vector-icons/Feather';

export const InputField = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  ...props
}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <Text
          style={[
            styles.title,
            {color: titleColor ? titleColor : colors.darkBrown},
          ]}>
          {title}
        </Text>
        <View style={styles.fieldContainer}>
          {isFlag && (
            <View style={styles.imgContainer}>
              <PhoneIcon name="phone" style={styles.image} size={20} />
              <Text style={styles.code}>+91</Text>
            </View>
          )}
          <TextInput
            value={value}
            placeholderTextColor={colors.gray2}
            onChangeText={val => setState(val)}
            style={styles.inputText}
            {...props}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export const InputField1 = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  ...props
}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <Text
          style={[
            styles.title,
            {color: titleColor ? titleColor : colors.darkBrown},
          ]}>
          {title}
        </Text>
        <View style={styles.fieldContainer}>
          {isFlag && (
            <View style={styles.imgContainer}>
              <PhoneIcon name="phone" style={styles.image} size={20} />
              <Text style={styles.code}>+91</Text>
            </View>
          )}
          <TextInput
            value={value}
            placeholderTextColor={colors.gray2}
            onChangeText={val => setState(val)}
            style={styles.inputText}
            {...props}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};
