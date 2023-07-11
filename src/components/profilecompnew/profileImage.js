/* eslint-disable no-undef */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
export const ProfileImage = ({profileImg}) => {
  const renderImage = () => {
    if (!profileImg?.jtProfileDTO?.logo) {
      return (
        <Image
          source={{
            uri: 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg',
          }}
          style={styles.profileView}
        />
      );
    } else if (profileImg?.jtProfileDTO?.logo) {
      return (
        <Image
          source={{
            uri: profileImg?.jtProfileDTO?.logo,
          }}
          style={styles.profileView}
        />
      );
    }
  };
  return renderImage(profileImg);
};
const styles = StyleSheet.create({
  profileView: {
    width: 80,
    height: 80,
    borderColor: '#FFA001',
    borderWidth: 1,
    borderRadius: 40,
  },
});
