import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const ProfileTimingTabs = ({data}) => {
  console.log('profileTimeing tab', data);
  console.log('1=====>');
  return <Text>hi</Text>;
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  toptemp: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    borderWidth: 0.5,
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 4,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
