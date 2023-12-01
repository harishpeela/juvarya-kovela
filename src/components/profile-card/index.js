import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './style';
import { colors } from '../../common';

export const ProfileInfo = ({img, name, email, dob}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {' '}
          {name?.length < 14 ? `${name}` : `${name?.substring(0, 14)}...`}{' '}
        </Text>
        <Text style={styles.emailText}>{email}</Text>
        {dob && (
          <Text style={styles.noDobText}>
            Please update Date Of Birth{' '}
          </Text>
        )}
      </View>
      {/* <View style={styles.imageContainer}>
        <Image resizeMode="contain" style={styles.image} source={img} />
      </View> */}
    </View>
  );
};
