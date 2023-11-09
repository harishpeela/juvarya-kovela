/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {
  BackHeaderNew,
  Donation_first_Tab,
  Donation_Second_Tab,
  Donation_Third_Tab,
} from '../../components';
const Donations = ({navigation}) => {
  const [value, setValue] = useState('0' || value);
  let Data = [
    {id: 1, rs: '101'},
    // {id: 2, rs: '201'},
    {id: 3, rs: '301'},
    // {id: 4, rs: '401'},
    {id: 5, rs: '501'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackHeaderNew txtColor={'black'} onPress={() => navigation.goBack()} />
      </View>
      <Donation_first_Tab title={'Durga Matha'} rating={'3.5 (18 rating)'} />
      <View>
        <View style={styles.secondTab}>
          <Donation_Second_Tab
            VALUE={a => setValue(a)}
            Data={Data}
            onChange={e => setValue(e)}
          />
        </View>
        <View style={{marginHorizontal: 10}}>
          <Donation_Third_Tab />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.butText}> Donate ₹ {value} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Donations;
