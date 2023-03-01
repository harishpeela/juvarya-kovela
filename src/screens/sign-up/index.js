/* eslint-disable no-alert */
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {RegisterValidationSchema} from '../../common/schemas';
import {styles} from './style';
import {getUserInfo, RegistesrUser, VerifyOTP} from '../../utils/api';

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
      inputTitles: {fName, phoneNo, lastName, email, password, confirmPassword},
    },
  } = allTexts;

  const UserRegisterHandler = async (data, action) => {
    const otpPayload = {
      otpType: 'SIGNUP',
      channel: 'MOBILE',
      emailAddress: data.email.toLowerCase(),
    };
    try {
      let response = await VerifyOTP(otpPayload);
      console.log('register user result', response?.data);
      const {
        data: {emailAddress, otp, statusCode},
      } = response || {};
      console.log('data', emailAddress, otp, statusCode);
      console.log(emailAddress, statusCode);
      if (response && emailAddress) {
        let otpPayload = {
          otp,
          data,
          email: emailAddress,
          password: data?.confirmPassword,
        };
        navigation.navigate(otpScreen, otpPayload);
      } else if (statusCode == 403) {
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
          }}
          validationSchema={RegisterValidationSchema}
          initialValues={{
            firstName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            lastName: '',
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
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
                <InputField
                  secureTextEntry
                  title={password}
                  placeholder={passwordPlace}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                <InputField
                  secureTextEntry
                  title={confirmPassword}
                  placeholder={confirmPasswordPlace}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  setState={handleChange('confirmPassword')}
                />
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    bgColor={colors.red3}
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
