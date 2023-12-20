/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';
import Donation_Button from '../Donate_Button';
import {styles} from './style';
export const Danation_Add_Card = ({onPress, roleId}) => {
  return (
    <View style={styles.container}>
      <View style={styles.second}>
        <Image
          source={require('../../../assets/images/tempimg4.jpg')}
          style={{height: 30, wight: 30, borderRadius: 40 / 2}}
          height={40}
          width={40}
        />
        <View style={styles.textContainer}>
          <Text style={styles.secondText}>Top Donation by Juvarya </Text>
          {roleId ? <Text style={styles.rs}>₹201</Text> : <></>}
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
