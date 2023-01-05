/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {BackHeader, HomeCard} from '../../components';
import {styles} from './styles';
const Events = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <View>
        <HomeCard />
      </View>
    </View>
  );
};
export default Events;
