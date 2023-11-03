import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {styles} from './styles.js';
import Signup, {KovelaIcon} from '../sign-up';
import Icon from 'react-native-vector-icons/Feather';
import {loginUser1, getUserInfoNew} from '../../utils/api';
import {LoginValidationSchema} from '../../common/schemas';
import {
  saveLoginSessionDetails,
  saveUserDetails,
} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {PasswordField} from '../../components/inputfield';

const Signin = ({navigation}) => {
  const {
    buttonTexts: {login, sigup},
    paragraphs: {dontHaveAccount},
    placeHolders: {emailPlace, passwordPlace},
  } = allTexts;

  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);

  const ApiData = async () => {
    let result = await getUserInfoNew();
    try {
      if (result) {
        saveUserDetails({
          username: result?.data?.username,
          email: result.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
        setUserDetails({
          username: result?.data?.username,
          email: result.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
      }
    } catch (error) {
      console.log('error in get current customer details api', error);
    }
  };
  const signinHandler = async (data, actions) => {
    console.log('actions', actions);
    let payload = {
      primaryContact: data?.email,
      password: data.password,
    };
    try {
      let result = await loginUser1(payload);
      console.log('error=====', result);
      if (result && result.status === 200) {
        const {
          data: {accessToken, tokenType},
        } = result;
        await saveLoginSessionDetails(tokenType, accessToken);
        ApiData();
        setLoginDetails(accessToken);
        actions.setSubmitting(false);
      } else {
        actions.setSubmitting(false);
<<<<<<< HEAD
        Alert.alert('Error', `${result?.message}`);
=======
        Alert.alert('Error', result?.message);
>>>>>>> 5be67f0a4c428b30b7227da3c76c75c89e6fdd5c
      }
    } catch (error) {
      console.log('error in signin', error);
      actions.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.signinTextContainer}>
        {/* <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-left-circle"
          color={colors.orangeColor}
          size={30}
        /> */}
        <Text style={styles.signinText}>{login}</Text>
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyboardStyle}
        contentContainerStyle={styles.contentStyle}>
        <KovelaIcon />
        <Formik
          onSubmit={(values, formikActions) => {
            const {email, password} = values;
            signinHandler(values, formikActions);
          }}
          validationSchema={LoginValidationSchema}
          initialValues={{
            email: '',
            password: '',
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
              <View style={styles.inputContainer}>
                <InputField
                  title={'Mobile number'}
                  isFlag
                  keyboardType={'numeric'}
                  placeholder={emailPlace}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  maxLength={10}
                />
                <View style={{height: 20}} />
                <View>
                  <PasswordField
                    value={values.password}
                    title={'password'}
                    placeholder={passwordPlace}
                    error={touched.password && errors.password}
                    onBlur={handleBlur('password')}
                    setState={handleChange('password')}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <PrimaryButton
                    bgColor={colors.orangeColor}
                    loading={isSubmitting}
                    onPress={handleSubmit}
                    text={login}
                    radius={25}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(allTexts.screenNames.signup);
                  }}>
                  <Text style={styles.navLinkText}>
                    {dontHaveAccount}
                    <Text style={styles.login}>{sigup}</Text>
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

export default Signin;
