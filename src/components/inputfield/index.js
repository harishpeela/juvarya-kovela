import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';
import {colors, fontFamily} from '../../common';
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
              {/* <Image
                resizeMode="contain"
                style={styles.image}
                source={require('../../utils/assets/images/flag.png')}
              /> */}
              <PhoneIcon name="phone" style={styles.image} size={20} />
              <Text style={styles.code}>+91</Text>
            </View>
          )}
          <TextInput
            // placeholder={placeholder}
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
