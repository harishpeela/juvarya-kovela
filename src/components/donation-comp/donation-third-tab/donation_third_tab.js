/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../../../common';
export const Donation_Third_Tab = ({description, url}) => {
  return (
    <View>
      <Text style={styles.donTxt}>How Is Your Donation Used</Text>
      <Image
        source={{uri: url}}
        height={50}
        width={100}
        style={styles.img}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 10}}>
        <Text style={{fontSize: 12}}>
         {description}
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {height: 200, width: '100%', borderRadius: 10},
  donTxt: {
    margin: 5,
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
