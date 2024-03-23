/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Alert, StatusBar} from 'react-native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import {allTexts, colors} from '../../common';
import Snackbar from 'react-native-snackbar';
import OTPTextInput from 'react-native-otp-textinput';
import {styles} from './style';
import {PrimaryButton, TopBarcard} from '../../components';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  loginUser1,
  NewRegistesrUser,
  getUserInfoNew,
  NewVerifyOTP,
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {statusBarHeight} from '../../utils/config/config';
import {
  saveLoginSessionDetails,
  saveUserDetails,
} from '../../utils/preferences/localStorage';
import {TopBarCard2} from '../../components/topBar1/topBarCard';

const OTPScreen = ({navigation, route}) => {
  const [timer, setTimer] = useState('00');
  const [loading, setLoading] = useState(false);
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
  const {
    params: {mobNum, otp},
  } = route || {};
  // console.log('mobnum', mobNum, otp);
  const setText = () => {
    otpInput?.current?.setValue('');
  };
  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);
  const ApiData = async () => {
    let result = await getUserInfoNew();
    try {
      if (result) {
        saveUserDetails({
          username: result?.data?.userName,
          email: result.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
        setUserDetails({
          username: result?.data?.userName,
          email: result?.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
      }
    } catch (error) {
      console.log('error in get current customer details api', error);
    }
  };
  const signinHandler = async otpOutPut => {
    // if(otpOutPut != otp){
    //   alert('otp Not matched')
    // }
    if (otpOutPut?.length === 6) {
      let payload = {
        primaryContact: mobNum,
        otp: otpOutPut,
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
          Alert.alert('Error', 'Invalid OTP');
        }
      } catch (error) {
        console.log('error', error);
      }
    }
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
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={'white'} />
      <View style={{height: 60, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Confirm OTP'}
          navigation={navigation}
          onPress={() => navigation.navigate(allTexts.screenNames.signup)}
        />
      </View>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{allTexts.headings.verfiyPhone}</Text>
          <Text style={styles.detail}>Enter OTP sent to {mobNum}</Text>
        </View>
      </View>
      <OTPTextInput
        ref={otpInput}
        inputCount={6}
        tintColor={colors.orangeColor}
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
        <View style={{marginHorizontal: 30, marginBottom: '5%'}}>
          <PrimaryButton
            text={'Continue'}
            loading={loading}
            bgColor={colors.orangeColor}
            onPress={() => {
              let otpOutPut = otpInput?.current?.state?.otpText
                ?.toString()
                .replace(/,/g, '');
              if (otpOutPut !== '') {
                signinHandler(otpOutPut);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;