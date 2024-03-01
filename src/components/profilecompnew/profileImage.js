/* eslint-disable no-undef */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
export const ProfileImage = ({profileImg}) => {
  const renderImage = () => {
    if (!profileImg?.logo) {
      return (
        <Image
          source={{
            uri: 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
          }}
          style={styles.profileView}
        />
      );
    } else if (profileImg?.logo) {
      return (
        <View style={styles.imgView}>
          <Image
            source={{
              uri: profileImg?.logo ? profileImg?.logo : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
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
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 100,
    height: 120,
    width:120,
    borderColor: '#CC4501',
  }
});
