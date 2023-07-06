/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {allTexts} from '../../common';
import {styles} from './styles';

const Splash_Screen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(allTexts.screenNames.splash);
    }, 1000);
  }, []);
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.imgBackGround}
      source={require('../../utils/assets/images/newsplash.png')}>
      <TouchableOpacity
        style={{
          flex: 1,
          marginTop: '155%',
          alignSelf: 'center',
          marginLeft: '50%',
        }}
        onPress={() => navigation.replace(allTexts.screenNames.signup)}>
        <Image
          source={require('../../utils/assets/images/splashButton.png')}
          style={{
            height: 60,
            width: 60,
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Splash_Screen;
