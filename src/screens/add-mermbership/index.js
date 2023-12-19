/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {BackgroundImage, BackHeaderNew} from '../../components';
import {styles} from './styles';
const AddMemebershipDetails = ({route, navigation}) => {
  const [memType, setMemType] = useState('');
  const [memName, setMemName] = useState('');
  const [memFee, setMemFee] = useState('');
  const [memDur, setMemDur] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginHorizontal: '5%', marginVertical: '10%'}}>
        <BackHeaderNew
          txt={'Add Membership'}
          onPress={() => navigation.goBack()}
        />
        <View>
          <TextInput
            style={styles.inputTextStyle}
            onChangeText={v => setMemType()}
            value={memType}
            placeholder="Type"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputTextStyle}
            onChangeText={() => setMemName()}
            value={memName}
            placeholder="Membership name"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputTextStyle}
            onChangeText={() => setMemFee()}
            value={memFee}
            placeholder="Membership fee"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputTextStyle}
            onChangeText={() => setMemDur()}
            value={memDur}
            placeholder="Duration"
            keyboardType="numeric"
          />
          <TouchableOpacity>
            <Text style={styles.login}>{'CREATE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddMemebershipDetails;