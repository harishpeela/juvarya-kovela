import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import { allTexts } from '../../common';


const Donation_Button = ({buttonWidth, onPress}) => {
  console.log('buttonWidth --->>' + buttonWidth);
  return (
    <SafeAreaView style={[styles.buttonContainer, {width: buttonWidth ? buttonWidth : 30}]}>
      <TouchableOpacity style={[styles.third]} onPress={onPress}>
        <Image
          source={require('../../../assets/images/handcoin.png')}
          style={{height: 20, width: 20}}
        />
        <Text style={{color: '#CC4501', fontSize: 14}}>
          {allTexts.other.Donation }
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Donation_Button;
