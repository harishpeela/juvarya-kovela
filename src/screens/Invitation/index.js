import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BackHeaderNew, BackgroundImage} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {MemberShipInvite} from '../../utils/api';

const InvitationScreen = ({navigation, id, route}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState();
  const [error, setError] = useState();
  const {roleId} = route.params || {};
    console.log('roleId', roleId);
  const MemberShipInviteApi = async () => {
    if (email === '') {
      setError(true);
    } else if (email.includes('.com')) {
      setError(false);
      let payload = {
        id: 24,
        email: email,
      };
      try {
        let result = await MemberShipInvite(payload);
        console.log('result of invite api', result?.data);
        if (result.data?.message) {
          Alert.alert('Success', result?.data?.message, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.profilemembership, {
                  roleId: roleId,
                }),
            },
          ]);
        } else {
          console.log(error, 'error');
        }
      } catch (error) {
        console.log('error in invite membership api', error);
      }
    } else {
      setError(false);
      setValidEmail(true);
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={styles.Header}>
        <BackHeaderNew
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
          txt={'Inviation'}
          isArrrow={true}
          isPlus={false}
        />
      </View>
      <View style={styles.textInputContainer}>
        {/* <Text style={styles.email}>Enter User Email</Text> */}
        <TextInput
          style={[styles.textInput, !isValidEmail && styles.invalidInput]}
          placeholder="Enter the Email"
          onChangeText={e => setEmail(e)}
          maxLength={30}
          value={email}
        />
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
