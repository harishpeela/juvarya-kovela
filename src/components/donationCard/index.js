/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {allTexts, colors} from '../../common';
export const Danation_Add_Card = ({onPress}) => {
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
          <Text style={styles.secondText}>Top Donation by Juvarya..</Text>
          <Text style={styles.rs}>
            ₹201 {''} {'>'}{' '}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.third} onPress={onPress}>
        <Image
          source={require('../../../assets/images/handcoin.png')}
          style={{height: 20, width: 20}}
        />
        <Text style={{color: '#CC4501', fontSize: 11}}>Donate Now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3E5',
    padding: 10,
  },
  second: {
    maxWidth: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondText: {
    fontSize: 14,
    color: colors.black,
  },
  rs: {color: colors.black, fontWeight: 'bold', fontSize: 16},
  third: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
    borderColor: '#CC4501',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-between',
  },
});
