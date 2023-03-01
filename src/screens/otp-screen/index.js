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
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {
  saveLoginSessionDetails,
  saveUserDetails,
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
  const {
    params: {otp, email, password, data},
  } = route || {};
  const setText = () => {
    otpInput?.current?.setValue(otp);
  };
  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);

  const getAndSaveUserInfo = async () => {
    try {
      let response = await getUserInfo();
      if (response && response.status === 200) {
        const {
          data: {
            firstName,
            lastName,
            emailAddress,
            roles: {customerRoles},
          },
        } = response;
        let userRole = customerRoles[0];
        const {
          role: {roleName},
        } = userRole;
        saveUserDetails({
          username: `${firstName} ${lastName}`,
          email: emailAddress,
          role: roleName,
        });
        setUserDetails({
          username: `${firstName} ${lastName}`,
          email: emailAddress,
          role: roleName,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const signinHandler = async () => {
    let payload = {
      username: email,
      password: password,
    };
    try {
      let result = await loginUser(payload);
      if (result && result.status === 200) {
        const {
          data: {access_token, refresh_token, token_type, expires_in},
        } = result;
        await saveLoginSessionDetails(token_type, access_token);
        getAndSaveUserInfo();
        setLoginDetails(access_token);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const verifyUserOtp = async () => {
    const otpPayload = {
      otpType: 'SIGNUP',
      channel: 'MOBILE',
      emailAddress: email,
    };
    try {
      setLoading(true);
      let response = await VerifyOTP(otpPayload);
      if (response.status === 200) {
        //verified otp
        signinHandler();
      } else {
        setLoading(false);
        alert('otp not matched');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    startTime(getDeadTime());
    setText();
  }, []);

  const UserRegisterHandler = async () => {
    let registerPayload = {
      lastName: data.lastName, // Hint: temoprary it is static
      firstName: data.firstName,
      emailAddress: data.email.toLowerCase(),
      password: data.confirmPassword,
      primaryContact: data.phone,
      registered: true,
      otp: otp,
    };
    try {
      let result = await RegistesrUser(registerPayload);
      console.log('register user result', result?.data);
      const {
        data: {emailAddress, otp, statusCode},
      } = result || {};
      // console.log(emailAddress, otp, statusCode);
      if (result && result?.data?.otp != undefined) {
        signinHandler();
      } else if (statusCode == 403) {
        alert(result?.data?.message);
      }
    } catch (error) {
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
