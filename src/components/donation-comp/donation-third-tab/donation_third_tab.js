/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../../../common';
export const Donation_Third_Tab = () => {
  return (
    <View>
      <Text style={styles.donTxt}>How Is Your Donation Used</Text>
      <Image
        source={require('../../../../assets/images/annadanam.jpeg')}
        height={50}
        width={100}
        style={styles.img}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{height: 40, margin: 10}}>
        <Text style={{fontSize: 12}}>
          Lorem ipsum dolor sit amet consectetur. Sollicitudin ipsum bibendum
          nunc integer tellus. In lorem feugiat facilisi ante vitae blandit
          ipsum sed. Nulla mi pulvinar gravida a. Cursus nibh mauris elementum
          laoreet integer quis. Donec egestas maecenas et purus lectus accumsan.
          Dolor cursus viverra interdum tristique suspendisse cursus ornare.
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
