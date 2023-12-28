import React from 'react';
import { Image,View } from 'react-native';
import { styles } from './style';

import imageUrl from '../../utils/assets/images/temple.png';


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
export const BackgroundImage2 = ({ templeImage }) => {
  // const imageUrl = uri ? uri : templeImage;
  return (
    <View style={styles.backgroundImage2Container}>
      <Image
        source={{
          uri: templeImage ? templeImage : ''
        }}
        style={styles.backgroundImage2}
      />
    </View>
  );
};
export const BackgroundImageFlower = () => (
  <Image
    source={require('../../../assets/images/bgflower.png')}
    style={styles.backgroundFlower}
  />
);
