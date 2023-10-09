/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {BackHeaderNew, Donation_first_Tab} from '../../components';
const Donations = ({navigation}) => {
  return (
    <View>
      <View style={{marginTop: 50, margin: 20}}>
        <BackHeaderNew onPress={() => navigation.goBack()} />
      </View>
      <Donation_first_Tab title={'Durga Matha'} rating={'3.5 (18 rating)'} />
    </View>
  );
};
export default Donations;
