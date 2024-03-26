/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {allTexts} from '../../common';
import {styles} from './styles';
import {getInitialToken, getInitialTokenBroadLeaf} from '../../utils/api';
import {
  saveClientCredentials,
  saveBraodLeafClientCredentials,
} from '../../utils/preferences/localStorage';

const Splash = ({navigation}) => {
  const {
    screenNames: {signin},
  } = allTexts;

  useEffect(() => {
    GenerateAuthToken();
  }, []);

  const GenerateAuthToken = async () => {
    try {
      let result = await getInitialToken();
      console.log('authtoken', result);
      if (result.status === 200) {
        const {
          data: {access_token, token_type},
        } = result;
        saveClientCredentials(token_type, access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        onPress={() => navigation.replace(signin)}>
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

export default Splash;
