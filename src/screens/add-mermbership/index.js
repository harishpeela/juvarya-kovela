/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {BackgroundImage, BackHeaderNew, Loader} from '../../components';
import {MemberShipDetails} from '../../utils/api';
import {styles} from './styles';
import {colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const AddMemebershipDetails = ({route, navigation}) => {
  const {id} = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  const [text, onChangeText] = React.useState('Useless Text');
  const [memType, setMemType] = React.useState('');
  const [memName, setMemName] = React.useState('');
  const [memFee, setMemFee] = React.useState('');
  const [memDur, setMemDur] = React.useState('');
  console.log('id ===>', id);
  const MembershipData = async () => {
    // setaLoader(true)
    try {
      let result = await MemberShipDetails(id);
      // console.log('res', result?.data?.memberships);
      if (result) {
        setaLoader(false);
        setData(result?.data?.memberships);
      }
    } catch (error) {
      console.log('error in membership details api', error);
    }
  };
  const onTextBoxChange = () => {
    alert('huuuu');
  };

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
          <TouchableOpacity
            onPress={() => {
              onTextBoxChange();
            }}>
            <Text style={styles.login}>{'CREATE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddMemebershipDetails;
