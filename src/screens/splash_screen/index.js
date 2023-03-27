/* eslint-disable react-native/no-inline-styles */
import {View, Text, ImageBackground, Image} from 'react-native';
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
    <View style={styles.wrapper}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imgBackGround}
        source={require('../../utils/assets/images/templeSplash.png')}>
        <Image
          source={require('../../utils/assets/images/templeGopuram.png')}
          style={{
            height: 195,
            width: 132,
            backgroundColor: 'white',
            position: 'absolute',
            right: 44,
            bottom: '8%',
            borderRadius: 60,
          }}
        />
        <View style={{position: 'absolute', top: 210, left: 30}}>
          <Image
            source={require('../../utils/assets/images/SplashText.png')}
            style={{height: 40, width: 170}}
          />
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Nearby Temples{' '}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash_Screen;
