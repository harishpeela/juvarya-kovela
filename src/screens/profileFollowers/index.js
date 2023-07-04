/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {BackgroundImage, BackHeaderNew} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
const FollowersMembership = ({route, navigation}) => {
  const {id} = route.params || {};
  console.log('id', id);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginHorizontal: '5%', marginVertical: -10}}>
        <BackHeaderNew txt={'Followers'} onPress={() => navigation.goBack()} />
        <View style={{flexGrow: 1, alignItems: 'center', marginTop: '40%'}}>
          <Text>Page Under DevelopMent </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FollowersMembership;
