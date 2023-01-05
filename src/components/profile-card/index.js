import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './style';

export const ProfileInfo = ({img, name, email}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}> {name} </Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image resizeMode="contain" style={styles.image} source={img} />
      </View>
    </View>
  );
};
