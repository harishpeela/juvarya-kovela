/* eslint-disable no-undef */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { colors } from '../../common';
export const ProfileImage = ({profileImg}) => {
  // console.log(profileImg);
  const renderImage = () => {
    if (!profileImg?.logo) {
      return (
        <Image
          source={{
            uri: 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg',
          }}
          style={styles.profileView}
        />
      );
    } else if (profileImg?.logo) {
      return (
        <View style={styles.imgView}>
          <Image
            source={{
              uri: profileImg?.logo,
            }}
            style={styles.profileView}
          />
        </View>
      );
    }
  };
  return renderImage(profileImg);
};
const styles = StyleSheet.create({
  profileView: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 90 / 2,
    height: 90,
    width: 90,
    borderColor: '#CC4501',
  }
});
