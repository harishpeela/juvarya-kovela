import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TopBarcard} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {EventInput} from '../../components';
import {allTexts, colors} from '../../common';
const Details_Screen = ({navigation, onPress, onChangename, onChangeemail}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 60, marginTop: statusBarHeight}}>
        <TopBarcard txt={'Register Here'} navigation={navigation} />
      </View>
      <View style={{marginTop: '10%'}}>
        <EventInput lable={'Full Name'} onChangeText={onChangename} />
        <EventInput lable={'Email'} onChangeText={onChangeemail} />
        {/* <EventInput lable={'Address'} onChangeText={onChangeaddress} /> */}
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '40%',
          padding: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30%',
          borderRadius: 10,
          backgroundColor: colors.orangeColor,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}> Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Details_Screen;
