import {View, Text, ImageBackground} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {PrimaryButton} from '../../components';
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
      <ImageBackground
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
      </ImageBackground>
    </View>
  );
};

export default Splash;
