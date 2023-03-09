import React from 'react';
import {StyleSheet, Image} from 'react-native';

export const BackgroundImage = () => (
  <Image
    source={require('../../../assets/images/background_image.png')}
    style={styles.background}
  />
);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200, // adjust as needed
    height: 150, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
  },
});
