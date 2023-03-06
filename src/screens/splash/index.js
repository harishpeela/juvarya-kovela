/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {PrimaryButton} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {allTexts} from '../../common';
import {styles} from './styles';
import {getInitialToken} from '../../utils/api';
import {saveClientCredentials} from '../../utils/preferences/localStorage';

const Splash = ({navigation}) => {
  const {
    screenNames: {home, signup},
    headings: {splashTitle},
    paragraphs: {splashDescription},
    buttonTexts: {start},
  } = allTexts;

  useEffect(() => {
    GenerateAuthToken();
  }, []);

  const GenerateAuthToken = async () => {
    try {
      let result = await getInitialToken();
      // console.log(result);
      if (result.status === 200) {
        const {
          data: {access_token, expires_in, scope, token_type},
        } = result;
        saveClientCredentials(token_type, access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* <ImageBackground
        resizeMode="cover"
        style={styles.imgBackGround}
        source={require('../../utils/assets/images/splash.png')}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{splashTitle}</Text>
          <Text style={styles.description}>{splashDescription}</Text>
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton
            onPress={() => {
              navigation.replace(signup);
            }}
            text={start}
          />
        </View>
      </ImageBackground> */}
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
        <TouchableOpacity onPress={() => navigation.replace(signup)}>
          <Image
            source={require('../../utils/assets/images/circleSplash.png')}
            style={{
              height: 70,
              width: 70,
              position: 'absolute',
              tintColor: 'red',
              top: 650,
              left: 63,
            }}
          />
          <Image
            source={require('../../utils/assets/images/circlebackground.png')}
            style={{
              height: 64,
              width: 64,
              position: 'absolute',
              top: 653,
              left: 65,
            }}
          />
          <Icon
            name="arrowright"
            size={50}
            color={'white'}
            style={{position: 'absolute', top: 660, left: 70}}
          />
        </TouchableOpacity>
        <View style={{position: 'absolute', top: 200, left: 30}}>
          <Image
            source={require('../../utils/assets/images/SplashText.png')}
            style={{height: 40, width: 160}}
          />
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Nearby Temples{' '}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
