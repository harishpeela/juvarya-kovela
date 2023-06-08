/* eslint-disable no-alert */
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {RegisterValidationSchema} from '../../common/schemas';
import {styles} from './style';
import {
  getUserInfo,
  RegistesrUser,
  VerifyOTP,
  NewVerifyOTP,
} from '../../utils/api';
import {PasswordField} from '../../components/inputfield';

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
      kovela,
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
    const otpPayload = {
      otpType: 'SIGNUP',
      channel: 'MOBILE',
      emailAddress: data.email.toLowerCase(),
    };
    console.log(otpPayload, 'otp');
    try {
      let response = await NewVerifyOTP(otpPayload);
      // console.log('register user result', response?.data);
      const {
        data: {emailAddress, otp},
      } = response || {};
      // console.log('data', emailAddress, otp, response?.status);
      console.log('999999999999999999999', emailAddress);
      if (response && emailAddress) {
        let otpPayload = {
          otp,
          data,
          email: emailAddress,
          password: data?.confirmPassword,
          username: data?.userName,
        };
        navigation.navigate(otpScreen, otpPayload);
      } else if (response?.status == 403) {
        console.log('2');
        alert(response?.data?.message);
      }
      action.setSubmitting(false);
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
                  title={username}
                  placeholder={'user Name'}
                  error={touched.userName && errors.userName}
                  onBlur={handleBlur('userName')}
                  setState={handleChange('userName')}
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
                  title={email}
                  placeholder={emailPlace}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  autoCapitalize="none"
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
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    bgColor={colors.orangeColor}
                    loading={isSubmitting}
                    onPress={handleSubmit}
                    text={sigup}
                    radius={25}
                  />
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
