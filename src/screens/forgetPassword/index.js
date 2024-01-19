import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  handleChange,
  Alert,
  Modal,
  useColorScheme,
} from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { allTexts, colors } from '../../common';
import { useState } from 'react';
import { NewVerifyOTP, forgotPassword } from '../../utils/api';
import { styles } from './styles';
import { Pressable } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { Formik } from 'formik';
import { forgotPasswordSchema } from '../../common/schemas';
import { PasswordField } from '../../components/inputfield';
import { PrimaryButton } from '../../components';
import Snackbar from 'react-native-snackbar';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [memberShip, setMemberShip] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState('00');
  const [secLeft, setSecLeft] = useState(30);
  const [otp, setOtp] = useState('000000');
  let otpInput = useRef(null);
  const Ref = useRef(null);

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const startTimer = e => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
        ':' +
        (seconds > 9 ? seconds : '0' + seconds),
      );
    }
  };
  const startTime = e => {
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = newTime => {
    if (newTime) {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + secLeft);
      return deadline;
    } else {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + secLeft);
      return deadline;
    }
  };
  // useEffect(() => {
  //   const setText = () => {
  //     otpInput?.current?.setValue(`${otp}`);
  //   };
  //   setText();
  // }, otp);

  useEffect(() => {
    setSecLeft(secLeft + 30);
    const newTime = getDeadTime(true);
    startTime(newTime);
  }, []);
  const otpGeneration = async (email, Ootp) => {
    const payload = {
      otpType: 'FORGOT_PASSWORD',
      emailAddress: email,
    };
    try {
      // console.log('email =>>>>>>>>' + payload);
      let result = await NewVerifyOTP(payload);
      // console.log('otpGeneration =>>>>>>>>>>>>' + result);
      if (result) {
        setTimeout(() => {
          setOtp(Ootp);
        }, 2000);
        console.log('data is coming here =>>>>');
        Snackbar.show({
          text: 'OTP Generated Successfully',
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
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      Snackbar.show({
        text: 'Error while Generating the OTP',
        backgroundColor: 'red',
        duration: 2000,
        action: {
          text: 'Ok',
          textColor: 'white',
          onPress: () => {
            <></>;
          },
        },
      });
    }
  };
  const validateEmail = text => {
    const isValid = text.toLowerCase().endsWith('.com');
    setValidEmail(isValid);
    setUserEmail(text);
  };
  const onPressDone = (Ootp) => {
    console.log('otp', Ootp);
    if (validEmail && userEmail !== '') {
      otpGeneration(userEmail, Ootp);
      setOtp(Ootp)
      setModalVisible(true);
      console.log('Email is valid:', userEmail);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.log('Invalid email:', userEmail);
    }
  };
  const userPasswordHandler = async values => {
    let otpOutPut = otpInput?.current?.state?.otpText
      ?.toString()
      .replace(/,/g, '');
      console.log('otpoutput', otpOutPut);
    const payload = {
      email: userEmail,
      password: values.password,
      otp: otpOutPut,
    };
    console.log('forgot password payload', payload);
    try {
      let result = await forgotPassword(payload);
      if (result) {
        Snackbar.show({
          text: 'Password Created Successfully',
          backgroundColor: 'green',
          duration: 2000,
          action: {
            text: 'Ok',
            textColor: 'white',
          },
        });
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate(allTexts.screenNames.signin);
        }, 1500);
      } else {
        console.log('error in forgotpassword')
        setMemberShip(0);
      }
    } catch (error) {
      Snackbar.show({
        text: 'Error try Again',
        backgroundColor: 'red',
        duration: 2000,
        action: {
          text: 'Ok',
          textColor: 'white',
          onPress: () => {
            <></>;
          },
        },
      });
    }
  };
  const closeToggleModal = () => {
    console.log('Close button is trigeering');
    setModalVisible(false);
  };
  const isChecked = true;
  const resetHandler = () => {
    console.log('reset is trigerring here ');
    otpGeneration();
  }
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'white' : 'white' },]}>
      <View
        style={
          styles.logoContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          size={30}
          style={styles.backButton}
          color={'black'}
          name="arrow-back"
        />
      </View>
      <TextInput
        style={styles.textinputContainer}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={validateEmail}
        value={userEmail}
        placeholderTextColor="black"
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Email is Not Valid</Text>
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          let otpOutPut = otpInput?.current?.state?.otpText
            ?.toString()
            .replace(/,/g, '');
          if (otpOutPut !== '') {
            console.log(otpOutPut, 'otpoutput');
            setOtp(otpOutPut);
            onPressDone(otpOutPut);
          }
        }}
      >
        <Text style={styles.signupText}>SEND</Text>
      </TouchableOpacity>

      {modalVisible ? (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <Pressable style={[styles.overlay]} onPress={closeToggleModal}>
            <View style={[styles.centeredView]}>
              <View style={[styles.otpContainer]}>
                <Text style={styles.emailText}>
                  Enter otp sent to {userEmail}
                </Text>
                <OTPTextInput
                  ref={otpInput}
                  inputCount={6}
                  tintColor={colors.green2}
                  textInputStyle={styles.otpTextInput}
                  containerStyle={{
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
                <View style={styles.timeContainer}>
                  {timer != '00:00' && (
                    <Text style={styles.expectOtp}>
                      Expect OTP in
                      <Text style={styles.black}>{` ${timer} seconds`}</Text>
                    </Text>
                  )}
                  {timer === '00:00' && (
                    <Text style={styles.expectOtp}>
                      Expect OTP in
                      <Text style={styles.black}>{` ${timer} seconds`}</Text>
                    </Text>
                  )}

                  <TouchableOpacity onPress={() => resetHandler()}>
                    <Text>Resend OTP</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Formik
                onSubmit={(values, formikActions) => {
                  userPasswordHandler(values);
                  console.log('values', values);
                }}
                validationSchema={forgotPasswordSchema}
                initialValues={{
                  password: '',
                  confirmPassword: '',
                }}>
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  values,
                }) => {
                  return (
                    <View style={styles.fieldContainer}>

                      <PasswordField
                        value={values.password}
                        title={'password'}
                        placeholder={'Enter your Password'}
                        error={touched.password && errors.password}
                        onBlur={handleBlur('password')}
                        setState={handleChange('password')}
                      />
                      <PasswordField
                        value={values.confirmPassword}
                        title={'confirm Password'}
                        placeholder={'Confirm your Password'}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        onBlur={handleBlur('confirmPassword')}
                        setState={handleChange('confirmPassword')}
                      />

                      <View style={styles.buttonContainer}>
                        {isChecked ? (
                          <PrimaryButton
                            bgColor={colors.orangeColor}
                            loading={false}
                            onPress={handleSubmit}
                            text={'submit'}
                            radius={25}
                          />
                        ) : (
                          <PrimaryButton
                            textColor={'white'}
                            bgColor={'gray'}
                            loading={false}
                            onPress={() =>
                              alert('Accept terms and conditions to continue..')
                            }
                            text={'Submit'}
                            radius={25}
                          />
                        )}
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </Pressable>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
};
export default ForgetPassword;
