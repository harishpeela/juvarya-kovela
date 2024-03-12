import {Alert, Keyboard, Text, TextInput, TouchableOpacity, View, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {BackHeaderNew, BackgroundImage} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {MemberShipInvite} from '../../utils/api';

import Ionicons from 'react-native-vector-icons/Ionicons';

const InvitationScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState();
  const {membershipId, id} = route.params || {};
  console.log('id', id, 'roleId', membershipId);
  const MemberShipInviteApi = async () => {
    if (mobileNumber?.length != 10) {
      setError(true);
    } else if (mobileNumber?.length === 10) {
      setError(false);
      let payload = {
        id: membershipId,
        mobileNumber: mobileNumber
      };
      try {
        let result = await MemberShipInvite(payload);
        // console.log('result of invite api', result?.data);
        if (result.data?.message) {
          console.log(result?.data, '--==------')
          Alert.alert('Success', result?.data?.message, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.templecrew, {
                  roleId: membershipId,
                  id: id,
                  message: 200,
                }),
            },
          ]);
        } else {
          alert('some thing went wrong')
          console.log(error, 'error');
        }
      } catch (error) {
        alert('some thing went wrong');
        console.log('error in invite membership api', error);
      }
    } else {
      setError(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{marginLeft:10}} onPress={() => navigation.goBack()}>
        <Ionicons
        name="arrow-back-circle"
        size={42}
        color={colors.orangeColor}
        style={{alignSelf: 'flex-start', justifyContent: 'center'}}
      />
     
        </TouchableOpacity>
        <Text style={styles.headingText}>{'Invite'}</Text>
      </View>
      <View style={styles.textInputContainer}>
        {/* <Text style={styles.email}>Enter User Email</Text> */}
        <View style={styles.input}>
        <TextInput
          style={[styles.textInput]}
          placeholder="Enter the Mobile Number"
          onChangeText={e => {setMobileNumber(e), setError(false)}}
          maxLength={35}
          value={mobileNumber}
          keyboardType='numeric'
          placeholderTextColor={isDarkMode ? 'black' : 'black'}
        />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}> Please enter a valid Mobile Number </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.subBtn}
        onPress={() => MemberShipInviteApi()}>
        <Text style={styles.subBtnText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvitationScreen;
