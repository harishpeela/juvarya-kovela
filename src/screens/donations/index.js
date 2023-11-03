/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  BackHeaderNew,
  Donation_first_Tab,
  Donation_Second_Tab,
} from '../../components';
const Donations = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{marginTop: 50, margin: 20}}>
        <BackHeaderNew onPress={() => navigation.goBack()} />
      </View>
      <Donation_first_Tab title={'Durga Matha'} rating={'3.5 (18 rating)'} />
      <View
        style={{
          height: '40%',
          backgroundColor: '#FFF3E5',
          margin: 10,
          borderRadius: 10,
        }}>
        <Donation_Second_Tab />
      </View>
    </View>
  );
};
export default Donations;
