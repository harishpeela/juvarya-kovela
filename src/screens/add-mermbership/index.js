/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {BackgroundImage, BackHeaderNew} from '../../components';
import {styles} from './styles';
import Snackbar from 'react-native-snackbar';
import {MemberShipCreate} from '../../utils/api';
import Icon from 'react-native-vector-icons/AntDesign';

const AddMemebershipDetails = ({route, navigation}) => {
  const {jtProfileId} = route.params || {};
  console.log('jtProfileId', jtProfileId);
  const [memType, setMemType] = useState();
  const [memName, setMemName] = useState();
  const [memberShip, setMemberShip] = useState([]);
  const submit = async () => {
    const payload = {
      name: memName,
      profileId: jtProfileId,
      type: memType,
    };
    console.log('payload', payload);
    try {
      // Invoke MemberShipInvite with the id and email
      let result = await MemberShipCreate(payload);
      if (result) {
        setMemberShip(result?.data);
        console.log(result?.data);
        Snackbar.show({
          text: 'MemberShip Created Successfully',
          backgroundColor: 'green',
          duration: 2000,
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => {
              <></>;
            },
          },
        });
        Alert.alert(
          'Create New MemberShip',
          'Navigating to MemberShips Screen',
          [
            {
              text: 'New',
              onPress: () => {
                setMemName(''), setMemType('');
              },
            },
            {
              text: 'Ok',
              onPress: () => navigation.pop(),
            },
          ],
          {cancelable: false},
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
        {cancelable: false},
      );
    }
  };

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
        {cancelable: false},
      );
    } else if (memName == undefined) {
      console.log('It is  printing inside the MemName');
      Alert.alert(
        'INVALID INPUT',
        'Please Enter the Name of the MemberShip.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else {
      submit();
    }
  };

  let donationType = ['BASIC', 'Primium'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginHorizontal: '5%', marginVertical: '10%'}}>
        <BackHeaderNew
          txt={'Add Membership'}
          onPress={() => navigation.goBack()}
          isArrow={true}
        />
        <View style={{marginTop: '35%'}}>
          <SelectDropdown
            data={donationType}
            defaultValue={memType}
            buttonTextStyle={styles.DTextStyle}
            onSelect={e => setMemType(e)}
            buttonStyle={styles.DbuttonStyle}
            defaultButtonText="Type"
            renderDropdownIcon={() => (
              <View>
                <Icon color={'white'} size={20} name="down" />
              </View>
            )}
          />

          <TextInput
            style={styles.inputTextStyle}
            placeholder="MemberShip Name"
            onChangeText={v => setMemName(v)}
            value={memName}
          />
          <TouchableOpacity onPress={onPressDone} style={styles.btnContainer}>
            <Text style={styles.loginText}>{'CREATE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddMemebershipDetails;