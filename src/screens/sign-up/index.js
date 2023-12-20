/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {RegisterValidationSchema} from '../../common/schemas';
import {styles} from './style';
import {NewVerifyOTP, loginUser1} from '../../utils/api';
import {PasswordField} from '../../components/inputfield';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const KovelaIcon = () => (
  <View style={styles.imageContainer}>
    <Image
      resizeMode="contain"
      style={styles.templeLogo}
      source={require('../../utils/assets/images/Kovela-logo.png')}
    />
  </View>
);
const Signup = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    buttonTexts: {login, sigup},
    screenNames: {signin, otpScreen},
    paragraphs: {alreadyAccount},
    placeHolders: {
      fistNamePlace,
      lastNamePlace,
      emailPlace,
      confirmPasswordPlace,
      passwordPlace,
    },
    headings: {
      inputTitles: {
        fName,
        phoneNo,
        lastName,
        email,
        password,
        confirmPassword,
        username,
        
      },
    },
  } = allTexts;

  const UserRegisterHandler = async (data, action) => {
    let LogInPayload = {
      username: data.phone,
      password: data.password,
    };
    const otpPayload = {
      otpType: 'SIGNUP',
      primaryContact: data.phone,
    };
    try {
      let response = await NewVerifyOTP(otpPayload);
      const {
        data: {primaryContact, otp},
      } = response || {};
      let result = await loginUser1(LogInPayload);
      if (result?.status === 200) {
        alert('user already registered');
        action.setSubmitting(false);
      } else {
        if (response && primaryContact) {
          let otpPayload = {
            otp,
            data,
            primaryContact: data?.phone,
            password: data?.confirmPassword,
            username: data?.phone,
          };
          navigation.navigate(otpScreen, otpPayload);
        } else if (response?.status == 403) {
          alert(response?.data?.message);
        }
        action.setSubmitting(false);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.signupText}>{sigup}</Text>
        <KovelaIcon />
        <Formik
          onSubmit={(values, formikActions) => {
            UserRegisterHandler(values, formikActions);
            console.log('values', values);
          }}
          validationSchema={RegisterValidationSchema}
          initialValues={{
            firstName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            lastName: '',
            userName: '',
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
                <InputField
                  title={fName}
                  placeholder={fistNamePlace}
                  error={touched.firstName && errors.firstName}
                  onBlur={handleBlur('firstName')}
                  setState={handleChange('firstName')}
                />
                <InputField
                  title={lastName}
                  placeholder={fistNamePlace}
                  error={touched.lastName && errors.lastName}
                  onBlur={handleBlur('lastName')}
                  setState={handleChange('lastName')}
                />

                <InputField
                  title={email}
                  placeholder={emailPlace}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  autoCapitalize="none"
                />
                <InputField
                  title={phoneNo}
                  isFlag
                  keyboardType={'numeric'}
                  placeholder={lastNamePlace}
                  error={touched.phone && errors.phone}
                  onBlur={handleBlur('phone')}
                  setState={handleChange('phone')}
                  maxLength={10}
                />
                <InputField
                  title={username}
                  placeholder={'user Name'}
                  error={touched.userName && errors.userName}
                  onBlur={handleBlur('userName')}
                  setState={handleChange('userName')}
                />
                <PasswordField
                  value={values.password}
                  title={password}
                  placeholder={passwordPlace}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                <PasswordField
                  value={values.confirmPassword}
                  title={confirmPassword}
                  placeholder={confirmPasswordPlace}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  setState={handleChange('confirmPassword')}
                />
                <TouchableOpacity
                  onPress={() => setIsChecked(!isChecked)}
                  style={styles.checkView}>
                  <Ionicons
                    name={isChecked ? 'checkbox' : 'square-outline'}
                    style={{
                      ...styles.checkIcon,
                      color: isChecked ? colors.orangeColor : '#7a98fa',
                    }}
                  />
                  <Text
                    style={{
                      ...styles.tc,
                      color: isChecked ? colors.orangeColor : '#7a98fa',
                    }}>
                    Terms & Conditions{' '}
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  {isChecked ? (
                    <PrimaryButton
                      bgColor={colors.orangeColor}
                      loading={isSubmitting}
                      onPress={handleSubmit}
                      text={sigup}
                      radius={25}
                    />
                  ) : (
                    <PrimaryButton
                      bgColor={'gray'}
                      loading={isSubmitting}
                      onPress={() =>
                        alert('Accept terms and conditions to continue..')
                      }
                      text={sigup}
                      radius={25}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.alreadyAcc}
                  onPress={() => {
                    navigation.navigate(signin);
                  }}>
                  <Text style={styles.alreadyTextContainer}>
                    {alreadyAccount}
                    <Text style={styles.isLogin}>{login}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
