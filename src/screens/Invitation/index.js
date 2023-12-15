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
import React, {useEffect, useState} from 'react';
import {BackHeaderNew} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {MemberShipInvite} from '../../utils/api';

const InvitationScreen = ({navigation, id, route}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(true);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [membership, setMemberShip] = useState();

  const submit = async () => {
    try {
      // Invoke MemberShipInvite with the id and email
      let result = await MemberShipInvite(8, email);

      if (result) {
        setMemberShip(result?.data);
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      console.log('error in membership count', error);
    }
  };

  const validateEmail = text => {
    // Use a regular expression for basic email validation
    const isValid = text.toLowerCase().endsWith('@gmail.com');
    console.log('isValid =>>>>>> ' + isValid);
    setValidEmail(isValid);
    setEmail(text);
  };
  const onPressDone = () => {
    if (isValidEmail && email != '') {
      setError(false);
      submit(id, email);
      console.log('Email is valid:', email);
      Alert.alert('Notification Send', 'Navigate to Home Page', [
        {
          text: 'OK',
          onPress: () => {
            // navigation.goBack(null)
            // navigation.goBack(null)
            navigation.pop();
            navigation.pop();
          },
        },
      ]);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      // Handle invalid email, e.g., show an error message
      console.log('Invalid email:', email);
    }
  };
  return (
    <View style={styles.container}>
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
          onChangeText={validateEmail}
        />
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Email is Not valid </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity style={styles.subBtn} onPress={onPressDone}>
        <Text style={styles.subBtnText}>Done</Text>
      </TouchableOpacity>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}>
        <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={styles.model}>
          <View style={styles.modalView}>
            <View style={styles.line} />
            <View style={styles.modalContent}>
              <Text style={styles.modalContentText}>Create a Post</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalContentText}>User groups</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalContentText}>Manage Memberships</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default InvitationScreen;
