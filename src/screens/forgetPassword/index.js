import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {allTexts, colors} from '../../common';
import {useState} from 'react';
import {NewVerifyOTP, forgotPassword} from '../../utils/api';
import {styles} from './styles';
import {Pressable} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {Formik} from 'formik';
import {forgotPasswordSchema} from '../../common/schemas';
import {PasswordField} from '../../components/inputfield';
import {PrimaryButton} from '../../components';
import Snackbar from 'react-native-snackbar';
import {TopBarCard2} from '../../components/topBar1/topBarCard';

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
    let {total, minutes, seconds} = getTimeRemaining(e);
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

  useEffect(() => {
    setSecLeft(secLeft + 30);
    const newTime = getDeadTime(true);
    startTime(newTime);
  }, []);

  const otpGeneration = async (email, Ootp) => {
    const payload = {
      otpType: 'FORGOT_PASSWORD',
      primaryContact: email,
    };

    try {
      let result = await NewVerifyOTP(payload);

    console.log('res of otp', result?.data);
      if (result) {
        setOtp(Ootp);
        alert('OTP Generated Successfully, check your spam folder if not received Email');
        // setTimeout(() => {
        //   Snackbar.show({
        //     // text: 'OTP Generated Successfully, check your spam folder if not received Email',
        //     // backgroundColor: 'green',
        //     // duration: 2000,
        //     // action: {
        //     //   text: 'Ok',
        //     //   textColor: 'white',
        //     //   onPress: () => {},
        //     // },
        //   });
        // }, 2000);
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
          onPress: () => {},
        },
      });
    }
  };

  const validateEmail = text => {
    // const isValid = text.toLowerCase().endsWith('.com');
    // setValidEmail(isValid);
    setUserEmail(text);
  };

  const onPressDone = Ootp => {
    if(userEmail === ''){
      setError(true);
    } else if (userEmail?.length === 10) {
      otpGeneration(userEmail, Ootp);
      console.log('mobile number is valid:', userEmail);
      setModalVisible(true);
    } else if (userEmail?.length > 10 || userEmail?.length < 10){
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const userPasswordHandler = async values => {
    console.log(values, 'values');
    let otpOutPut = otpInput?.current?.state?.otpText
      ?.toString()
      .replace(/,/g, '');
    const payload = {
      primaryContact: userEmail,
      password: values.password,
      otp: otpOutPut,
    };      let result = await forgotPassword(payload);
    // console.log('forgot password payload', payload);
    try {
      if (result?.status === 200) {
        Snackbar.show({
          text: 'Password Updated Successfully',
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
        Alert.alert('Error', 'Invalid OTP', [
          {
            text: 'Ok',
            onPress: () =>  setModalVisible(false)
          },
        ]);
      }
    } catch (error) {
      Snackbar.show({
        text: 'Error try Again',
        backgroundColor: 'red',
        duration: 2000,
        action: {
          text: 'Ok',
          textColor: 'white',
          onPress: () => {},
        },
      });
    }
  };

  const closeToggleModal = () => {
    console.log('Close button is trigeering');
    setModalVisible(false);
  };

  const resetHandler = () => {
    console.log('reset is trigerring here ');
    otpGeneration();
  };

  const isChecked = true;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'white' : 'white'},
      ]}>
      <StatusBar backgroundColor={'white'} />
      <View style={{minHeight: '15%'}}>
        <TopBarCard2
          back={true}
          txt={'Forgot Password'}
          navigation={navigation}
          onPress={() => navigation.goBack()}
          marginLeft={'16%'}
        />
      </View>
      <TextInput
        style={styles.textinputContainer}
        placeholder="Enter your Mobile number"
        keyboardType="numeric"
        onChangeText={validateEmail}
        value={userEmail}
        placeholderTextColor="black"
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}> please enter valid Mobile number</Text>
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
            onPressDone(otpOutPut);
          }
        }}>
        <Text style={styles.signupText}>SEND</Text>
      </TouchableOpacity>

      {modalVisible ? (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
                // console.log('values', values);
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
                      error={touched.confirmPassword && errors.confirmPassword}
                      onBlur={handleBlur('confirmPassword')}
                      setState={handleChange('confirmPassword')}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <View style={styles.buttonContainer}>
                        <PrimaryButton
                          bgColor={colors.orangeColor}
                          loading={false}
                          onPress={handleSubmit}
                          text={'submit'}
                          radius={25}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
          </View>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ForgetPassword;
