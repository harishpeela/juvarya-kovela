/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import {allTexts, colors} from '../../common';
import OTPTextInput from 'react-native-otp-textinput';
import {styles} from './style';
import {PrimaryButton} from '../../components';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  getUserInfo,
  loginUser,
  VerifyOTP,
  RegistesrUser,
  loginUser1,
  NewRegistesrUser,
  getUserInfoNew,
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {
  saveLoginSessionDetails,
  saveUserDetails,
  getAuthTokenDetails,
} from '../../utils/preferences/localStorage';

const OTPScreen = ({navigation, route}) => {
  const [timer, setTimer] = useState('00');
  const [loading, setLoading] = useState(false);
  const Ref = useRef(null);
  //timer Feature
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
  // console.log('outinpity', otpInput?.current?.state?.otpText);
  const {
    params: {otp, email, password, data, username},
  } = route || {};
  // console.log('parms', data, username);
  const setText = () => {
    otpInput?.current?.setValue(otp);
  };
  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);

  const ApiData = async () => {
    let Token = await getAuthTokenDetails();
    console.log('token ====================> ', Token);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://20.235.89.214:9092/api/auth/currentCustomer', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('result of apidata otpscreen', result);
        if (result) {
          saveUserDetails({
            // username: `${result?.firstName}${result?.lastName}`,
            username: result?.username,
            password: result?.password,
            email: result?.email,
            id: result?.id,
          });
          console.log(
            'saveuserdetails',
            result?.firstName,
            result?.lastName,
            result?.email,
            result?.id,
          );
          setUserDetails({
            // username: `${result?.firstName}${result?.lastName}`,
            username: result?.username,
            email: result?.email,
            role: result.roles,
            id: result?.id,
          });
        }
      })
      .catch(error => console.log('error', error));
  };

  const signinHandler = async () => {
    let payload = {
      username: data?.userName,
      password: password,
    };
    try {
      let result = await loginUser1(payload);
      console.log('payload', payload);
      // console.log('result of loginuser', result?.data);
      // console.log('result.status', result?.status);
      if (result && result.status === 200) {
        const {
          data: {accessToken, refreshToken, tokenType, email},
        } = result;
        // console.log('accesstoken', tokenType, accessToken);
        await saveLoginSessionDetails(tokenType, accessToken);
        await ApiData();
        // getAndSaveUserInfo();
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
    // getAndSaveUserInfo();
  }, []);

  const UserRegisterHandler = async () => {
    let registerPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      primaryContact: data.phone,
      username: data?.userName,
      email: email.toLowerCase(),
      password: data?.password,
      otp: otp,
    };
    console.log('regi pay', registerPayload);
    try {
      let result = await NewRegistesrUser(registerPayload);
      console.log('register user result', result);
      // console.log('register user data', result?.status);
      if (result.status === 200) {
        // console.log('mesage', result?.data?.message);
        signinHandler();
      } else {
        console.log(result?.data?.message);
      }
    } catch (error) {
      console.log('5');
      console.log('errerer', error);
      alert(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIcon}>
          <AntIcon name="left" size={25} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{allTexts.headings.verfiyEmail}</Text>
          <Text
            style={
              styles.detail
            }>{`${allTexts.placeHolders.otpSend} ${email}`}</Text>
        </View>
      </View>
      <OTPTextInput
        ref={otpInput}
        inputCount={6}
        tintColor={colors.green2}
        textInputStyle={styles.textInput}
        containerStyle={{
          marginTop: 15,
        }}
      />
      <View style={styles.btnContainer}>
        {timer != '00:00' && (
          <Text style={styles.expectOtp}>
            Expect OTP in
            <Text style={styles.black}>{` ${timer} seconds`}</Text>
          </Text>
        )}

        <PrimaryButton
          text={'Continue'}
          loading={loading}
          bgColor={colors.green2}
          onPress={() => {
            let otpOutPut = otpInput?.current?.state?.otpText
              ?.toString()
              .replace(/,/g, '');
            if (otpOutPut !== '') {
              UserRegisterHandler();
            }
          }}
        />
      </View>
    </View>
  );
};

export default OTPScreen;
