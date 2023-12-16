/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { BackgroundImage, BackHeaderNew } from '../../components';
import { styles } from './styles';
import Snackbar from 'react-native-snackbar';
import { MemberShipCreate } from '../../utils/api'

const AddMemebershipDetails = ({ route, navigation }) => {

  const [memType, setMemType] = useState();
  const [memName, setMemName] = useState();
  // const [memFee, setMemFee] = useState('');
  // const [memDur, setMemDur] = useState('');
  const [memberShip, setMemberShip] = useState([])
  const submit = async () => {
    const payload = {
      name: "commitee",
      profileId: 1,
      type: "TEMPORARY"
    }
    try {
      // Invoke MemberShipInvite with the id and email
      let result = await MemberShipCreate(payload);
      console.log("result =>>>>>>>>>>>>" + result)
      if (result) {
        setMemberShip(result?.data);
        console.log("New_Member");
        console.log(result?.data)
        // Show a custom alert for a successful API call
        Snackbar.show({
          text: 'MemberShip Created Successfully',
          backgroundColor: 'green',
          duration: 2000,
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => { <></> },
          }
        })
        Alert.alert(
          'Create New MemberShip',
          'Navigating to MemberShips Screen',
          [
            {
              text: 'New',
              onPress: () => {
                setMemName(""),
                  setMemType("")
              },
            },
            {
              text: 'Ok',
              onPress: () => navigation.pop(),
            },
          ],
          { cancelable: false }
        );
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      console.log('Error in sending the request', error);
      // Handle error and show an appropriate alert if needed
      Alert.alert(
        'Error',
        'Failed to Create MemberShip...Please try again.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    }
  }




  const onPressDone = () => {
    if (memType == undefined) {
      Alert.alert(
        'INVALID INPUT',
        'Please Enter the type of the MemberShip.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    } else if (memName == undefined) {
      console.log("It is  printing inside the MemName")
      Alert.alert(
        'INVALID INPUT',
        'Please Enter the Name of the MemberShip.',
        [

          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    } else {
      submit();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <BackgroundImage />
      <View style={{ marginHorizontal: '5%', marginVertical: '10%' }}>
        <BackHeaderNew
          txt={"Add Membership"}
          onPress={() => navigation.goBack()}
          isArrrow={true}
        />
        <View>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type"
            onChangeText={(v) => setMemType(v)}
            value={memType}
          />
          <TextInput
            style={styles.inputTextStyle}
            placeholder="MemberShip Name"
            onChangeText={(v) => setMemName(v)}
            value={memName}
          />
          {/* <TextInput
            style={styles.inputTextStyle}
            onChangeText={v => setMemType(v)}
            value={memType}
            placeholder="Type"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputTextStyle}
            onChangeText={() => setMemName(v)}
            value={memName}
            placeholder="Membership name"
            keyboardType="numeric"
          /> */}
          {/* <TextInput
            style={styles.inputTextStyle}
            onChangeText={() => setMemFee()}
            value={memFee}
            placeholder="Membership fee"
            keyboardType="numeric"
          /> */}
          {/* <TextInput
            style={styles.inputTextStyle}
            onChangeText={() => setMemDur()}
            value={memDur}
            placeholder="Duration"
            keyboardType="numeric"
          /> */}
          <TouchableOpacity onPress={onPressDone} style={styles.btnContainer}>
            <Text style={styles.loginText}>{'CREATE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddMemebershipDetails;