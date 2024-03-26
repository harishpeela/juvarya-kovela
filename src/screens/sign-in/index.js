/* eslint-disable no-undef */
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {InputField, PrimaryButton} from '../../components';
import OTPTextInput from 'react-native-otp-textinput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {styles} from './styles.js';
import {KovelaIcon} from '../sign-up/index.js';
import {loginUser1, getUserInfoNew, NewVerifyOTP} from '../../utils/api';
import {LoginValidationSchema} from '../../common/schemas';
import {
  saveLoginSessionDetails,
  saveUserDetails,
} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {PasswordField} from '../../components/inputfield';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5.js';
import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';
const Signin = ({navigation}) => {
  const [getHomeFeedListData] = useState([]);
  const [isConnected, setIsConnected] = useState(' ');
  const [mobNum, setMobNum] = useState('');
  const [timer, setTimer] = useState('00');
  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const Ref = useRef(null);

  var secLeft = 30;
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

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + secLeft);
    return deadline;
  };

  let otpInput = useRef(null);

  const setText = () => {
    otpInput?.current?.setValue('');
  };
  useEffect(() => {
    startTime(getDeadTime());
    setText();
    // alert('OTP Generated Successfully, check your spam folder if not received Email')
    // setTimeout(() => {
    //   Snackbar.show({
    //     text: 'OTP Generated Successfully, check your spam folder if not received Email',
    //     backgroundColor: 'green',
    //     duration: 2000,
    //     action: {
    //       text: 'Ok',
    //       textColor: 'white',
    //       onPress: () => {},
    //     },
    //   });
    // }, 2000);
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const NetWorkChecking = () => {
    if (isConnected === false) {
      Snackbar.show({
        text: 'No Internet Connection',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'grey',
        action: {
          text: 'Reload',
          textColor: 'White',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      });
    }
  };

  useEffect(() => {
    NetWorkChecking();
  }, []);

  const OtpTrigger = async () => {
    let otpPayload = {
      otpType: 'SIGNIN',
      primaryContact: mobNum,
    };
    if (mobNum?.length != 10) {
      alert('please enter valid Mobile Number');
    } else if (mobNum?.length === 10) {
      let response = await NewVerifyOTP(otpPayload);
      console.log('responce of otp', response?.data);
      if (response?.data) {
        navigation.navigate(allTexts.screenNames.otpScreen, {
          mobNum: mobNum,
          otp: response?.data?.otp,
        });
      }
    }
  };

  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);

  const signinHandler = async otpOutPut => {
    console.log('otp', otp, otpOutPut);
    if (otpOutPut != otp) {
      alert('otp mismatched');
    } else if (mobNum?.length === 10) {
      let payload = {
        primaryContact: mobNum,
        otp: otp,
      };
      console.log('playload with email', payload);
      try {
        let result = await loginUser1(payload);
        console.log('res', result?.data);
        if (result && result.status === 200) {
          const {
            data: {accessToken, tokenType},
          } = result;
          await saveLoginSessionDetails(tokenType, accessToken);
          ApiData();
          setLoginDetails(accessToken);
        } else {
          // actions.setSubmitting(false);
          Alert.alert('Error', 'Invalid Credentials');
        }
      } catch (error) {
        // actions.setSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor={'white'} translucent={true} />
      <View style={styles.signinTextContainer}>
        {/* <Text style={styles.signinText}>{login}</Text> */}
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyboardStyle}
        contentContainerStyle={styles.contentStyle}>
        <KovelaIcon />
        <View style={styles.inputContainer}>
          <InputField
            title={'Mobile Number'}
            isFlag
            value={mobNum}
            setState={e => setMobNum(e)}
            keyboardType={'numeric'}
            placeholder={'Enter Mobile Number'}
            maxLength={10}
          />

          {/* {isOtp && (
            <>
              <OTPTextInput
                ref={otpInput}
                inputCount={6}
                tintColor={colors.green2}
                textInputStyle={styles.textInput}
                containerStyle={{
                  marginTop: 1,
                }}
              />
              <View style={styles.btnContainer}>
                {timer != '00:00' && (
                  <Text style={styles.expectOtp}>
                    Expect OTP in
                    <Text style={styles.black}>{` ${timer} seconds`}</Text>
                  </Text>
                )}
              </View>
              <View style={{height: 20}} />
              <View style={styles.btnContainer}>
                <PrimaryButton
                  bgColor={colors.orangeColor}
                  // loading={isSubmitting}
                  // onPress={() => signinHandler()}
                  onPress={() => {
                    let otpOutPut = otpInput?.current?.state?.otpText
                      ?.toString()
                      .replace(/,/g, '');
                    if (otpOutPut !== '') {
                      signinHandler(otpOutPut);
                    }
                  }}
                  text={'Submit'}
                  radius={25}
                />
              </View>
            </>
          )} */}
          <TouchableOpacity style={styles.button} onPress={() => OtpTrigger()}>
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {' '}
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Signin;
