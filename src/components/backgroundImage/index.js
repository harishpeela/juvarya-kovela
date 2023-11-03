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
  backgroundA: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 410, // adjust as needed
    height: 220, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
  },
  backgroundFlower: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 160, // adjust as needed
    height: 180, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
  },
});
export const BackgroundImageAClass = () => (
  <Image
    source={require('../../../assets/images/bggray.png')}
    style={styles.backgroundA}
  />
);
export const BackgroundImageFlower = () => (
  <Image
    source={require('../../../assets/images/bgflower.png')}
    style={styles.backgroundFlower}
  />
);
