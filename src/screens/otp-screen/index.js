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
import {loginUser1, NewRegistesrUser, getUserInfoNew, NewVerifyOTP} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
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
    params: {email, password, data},
  } = route || {};
  const setText = () => {
    otpInput?.current?.setValue('');
  };
  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);
console.log('data ==>', data);
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
  const signinHandler = async () => {
    let payload = {
      primaryContact: data?.phone,
      password: password,
    };
    try {
      let result = await loginUser1(payload);
      // console.log('result', result);
      if (result && result.status === 200) {
        const {
          data: {accessToken, tokenType},
        } = result;
        await saveLoginSessionDetails(tokenType, accessToken);
        await ApiData();
        setLoginDetails(accessToken);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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

  const UserRegisterHandler = async pOtp => {
    let registerPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      primaryContact: data.phone,
      email: data?.email?.toLowerCase(),
      password: data?.password,
      otp: pOtp,
    };
    try {
      let result = await NewRegistesrUser(registerPayload);
      console.log('gnjg', result, '---===>', registerPayload);
      if (result.status === 200) {
        signinHandler();
      } else {
        console.log(result?.data, 'error');
        Alert.alert('Kovela', result?.data?.message || 'Invalid OTP', [
          {
            text: 'Ok',
            // onPress: navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.log('error', error);
      alert(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={'white'} />
      <View style={{minHeight: '15%', marginTop: 20}}>
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
          <Text style={styles.detail}>Enter OTP sent to {data?.phone}</Text>
        </View>
      </View>
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
                UserRegisterHandler(otpOutPut);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;
