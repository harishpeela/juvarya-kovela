import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import { InputField, PrimaryButton } from '../../components';
import OTPTextInput from 'react-native-otp-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { allTexts, colors } from '../../common';
import { styles } from './styles.js';
import { KovelaIcon } from '../sign-up/index.js';
import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';
import ApplicationContext from '../../utils/context-api/Context';
import { useTriggerOtpMutation ,useSignInMutation, useLazyGetCustomerDataQuery } from '../../redux/services/authService.tsx';
import {useAppDispatch} from '../../redux/reduxHooks';
import { loginAction, userDataAction } from '../../redux/slices/authSlice.ts';

const Signin = ({ navigation }) => {

  const [isConnected, setIsConnected] = useState(' ');
  const [mobNum, setMobNum] = useState('');
  const [timer, setTimer] = useState('00');
  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const Ref = useRef(null);

  //RTK hooks
  const [doLogin] = useSignInMutation();
  const [doTriggerOtp] = useTriggerOtpMutation();
  const [customerDetails] = useLazyGetCustomerDataQuery()
  const dispatch = useAppDispatch();

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
    setIsOtp(!isOtp);
    let otpPayload = {
      otpType: 'SIGNIN',
      primaryContact: mobNum,
    };
    if(!mobNum === 10){
      alert('please enter proper Mobile Number')
    } else if(mobNum?.length === 10){
      doTriggerOtp(otpPayload)
      .unwrap()
      .then(response => {
        console.log('otpRes--->', response)
          setOtp(response?.otp)
      })
      .catch(error => {
        console.log('error--->', error)
      });
    
    }
  }
const {setLoginDetails} = useContext(ApplicationContext);
const signinHandler = async () => {
    if (mobNum?.length === 10) {
      let signInPlayload = {
        primaryContact: mobNum,
        otp: otp,
      };
      try {
        doLogin(signInPlayload)
        .unwrap()
        .then(response => {
          dispatch(loginAction({ token: response.accessToken, role: response.roles?.[0], tokenType: response.tokenType }));
          setLoginDetails(response.accessToken);
          customerDetails()
          .unwrap()
          .then(response=>{
            dispatch(userDataAction(response));
          })
          .catch(()=>{})

        })
        .catch(error => {
          console.log('error--->', error)
        });
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
          <TouchableOpacity onPress={() => OtpTrigger()}>
            <Text style={{ color: colors.orangeColor, alignSelf: 'flex-end', fontWeight: 'bold' }}> Send OTP</Text>
          </TouchableOpacity>
          {isOtp && (
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
              <View style={{ height: 20 }} />
              <View style={styles.btnContainer}>
                <PrimaryButton
                  bgColor={colors.orangeColor}
                  onPress={() => signinHandler()}
                  text={'Submit'}
                  radius={25}
                />
              </View>
            </>
          )}


        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Signin;