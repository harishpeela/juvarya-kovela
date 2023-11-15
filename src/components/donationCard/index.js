/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {allTexts, colors} from '../../common';
import Donation_Button from '../Donate_Button';
import {styles} from './style';
export const Danation_Add_Card = ({onPress, roleId}) => {
  console.log('It is printing the roleId ->>>> ' + roleId);
  return (
    <View style={styles.container}>
      <View style={styles.second}>
        <Image
          source={require('../../../assets/images/tempimg4.jpg')}
          style={{height: 30, wight: 30, borderRadius: 40 / 2}}
          height={40}
          width={40}
        />
        <View style={{marginLeft: 10}}>
          <Text  style={styles.secondText}>Top Donation by Juvarya..</Text>
          <Text style={styles.rs}>
            ₹201 {''} {'>'}{' '}
          </Text>
        </View>
      </View>
      {roleId ? <Donation_Button buttonWidth={"30%"} onPress={onPress} /> : <></>}
    </View>
  );
};
