import React from 'react';
import {Image} from 'react-native';
import {styles} from './style'


export const BackgroundImage = () => (
  <Image
    source={require('../../../assets/images/background_image.png')}
    style={styles.background}
  />
);

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
