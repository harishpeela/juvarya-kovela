/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {BackgroundImage, BackHeaderNew} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
const ProfileMembership = ({route, navigation}) => {
  const {id} = route.params || {};
  console.log('id', id);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginHorizontal: '5%', marginVertical: -10}}>
        <BackHeaderNew txt={'Membership'} onPress={() => navigation.goBack()} />
        <View style={{flexGrow: 1, alignItems: 'center', marginTop: '40%'}}>
          <Text>Page Under DevelopMent </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;
