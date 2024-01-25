/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';
import Donation_Button from '../Donate_Button';
import {styles} from './style';
export const Danation_Add_Card = ({onPress, roleId, text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.second}>
        <Image
          source={{uri: 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg'}}
          style={{height: 30, wight: 30, borderRadius: 40 / 2}}
          height={40}
          width={40}
        /> 
        <View style={styles.textContainer}>
          <Text style={styles.secondText}>{text}</Text>
          
        </View>
      </View>
      {roleId ? (
        <Donation_Button buttonWidth={'30%'} onPress={onPress} />
      ) : (
        <Text style={styles.rs}>₹201</Text>
      )}
    </View>
  );
};
