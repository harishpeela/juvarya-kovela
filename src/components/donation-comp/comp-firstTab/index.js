/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const Donation_first_Tab = ({title, rating, img}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: img ? img : 'https://fanfun.s3.ap-south-1.amazonaws.com/1709365676652Trinetra.jpg' }}
        style={{height: 70, width: 70, borderRadius: 70 / 2}}
      />
      <View style={{marginLeft: 20}}>
        <Text style={{fontSize: 24, color: colors.black, fontWeight: 'bold'}}>
          {title}{' '}
        </Text>
        <Text style={{fontSize: 16, color: colors.black, fontWeight: '400'}}>
          <AntDesign name="star" size={14} color={'#F28913'} /> {rating}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
