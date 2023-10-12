/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const Donation_first_Tab = ({title, rating}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/hanuman.png')}
        style={{height: 70, width: 70, borderRadius: 70 / 2}}
      />
      <View style={{marginLeft: 30}}>
        <Text style={{fontSize: 24, color: colors.black, fontWeight: 'bold'}}>
          {title}{' '}
        </Text>
        <Text style={{fontSize: 16, color: colors.black, fontWeight: '400'}}>
          <AntDesign name="star" size={14} color={'#CC4501'} /> {rating}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
});
