import {Alert, Text, TextInput, TouchableOpacity, View, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {BackHeaderNew, BackgroundImage} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {MemberShipInvite} from '../../utils/api';

import Ionicons from 'react-native-vector-icons/Ionicons';

const InvitationScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState();
  const [error, setError] = useState();
  const {roleId, id} = route.params || {};
  const MemberShipInviteApi = async () => {
    if (email === '') {
      setError(true);
    } else if (email.includes('.com')) {
      setError(false);
      let payload = {
        id: id,
        email: email,
      };
      try {
        let result = await MemberShipInvite(payload);
        // console.log('result of invite api', result?.data);
        if (result.data?.message) {
          Alert.alert('Success', result?.data?.message, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.profilememberships, {
                  roleId: roleId,
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
      setValidEmail(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        {/* <BackHeaderNew
          onPress={() => {
            navigation.goBack();
          }}
          txtColor={colors.black}
          txt={'Inviation'}
          isArrow={true}
          isPlus={false}
        /> */}
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
        <Ionicons
        name="caret-back-circle"
        size={36}
        color={'#ffffff'}
        style={{alignSelf: 'flex-start', justifyContent: 'center'}}
      />
     
        </TouchableOpacity>
        <Text style={styles.headingText}>{'Invite'}</Text>
      </View>
      <View style={styles.textInputContainer}>
        {/* <Text style={styles.email}>Enter User Email</Text> */}
        <View style={styles.input}>
        <TextInput
          style={[styles.textInput, !isValidEmail && styles.invalidInput]}
          placeholder="Enter the Email"
          onChangeText={e => setEmail(e)}
          maxLength={35}
          value={email}
          placeholderTextColor={isDarkMode ? 'black' : 'black'}
        />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Email is Not valid </Text>
          </View>
        )}
        {isValidEmail && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>please enter a valid Email </Text>
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
