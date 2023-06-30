import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {LoginValidationSchema} from '../../common/schemas';
import {styles} from './styles.js';
import Signup, {KovelaIcon} from '../sign-up';
import Icon from 'react-native-vector-icons/Feather';
import {
  getUserInfo,
  getUserInfoNew,
  loginUser,
  loginUser1,
} from '../../utils/api';
import {
  saveLoginSessionDetails,
  saveUserDetails,
  getAuthTokenDetails,
} from '../../utils/preferences/localStorage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApplicationContext from '../../utils/context-api/Context';
import {PasswordField} from '../../components/inputfield';

const Signin = ({navigation}) => {
  const {
    buttonTexts: {login, sigup},
    paragraphs: {loginDescription, dontHaveAccount},
    placeHolders: {emailPlace, passwordPlace},
    headings: {
      inputTitles: {email},
    },
  } = allTexts;

  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);

  const ApiData = async () => {
    let Token = await getAuthTokenDetails();
    console.log('token============>', Token);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://fanfundev.eastasia.cloudapp.azure.com:9092/api/auth/currentCustomer',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result of currentcustomer', result);
        console.log('role', result?.roles);
        if (result) {
          saveUserDetails({
            username: result?.username,
            email: result.email,
            role: result?.roles,
            id: result?.id,
          });
          setUserDetails({
            username: result?.username,
            email: result.email,
            role: result?.roles,
          });
        }
      })
      .catch(error => console.log('error', error));
  };

  const getAndSaveUserInfo = async () => {
    try {
      let response = await getUserInfoNew();
      console.log('login res in signin', response?.data);
    } catch (error) {
      alert(error.message);
    }
  };
  const signinHandler = async (data, actions) => {
    let payload = {
      username: data.email,
      password: data.password,
    };
    console.log('payload load of signin', payload);
    try {
      console.log('343');
      let result = await loginUser1(payload);
      console.log('signinhand login res', result?.data);
      if (result && result.status === 200) {
        const {
          data: {accessToken, tokenType, username},
        } = result;
        await saveLoginSessionDetails(tokenType, accessToken);
        // getAndSaveUserInfo();
        ApiData();
        console.log('accesstoken', tokenType, accessToken);
        console.log('username', username);
        setLoginDetails(accessToken);
        actions.setSubmitting(false);
      } else {
        actions.setSubmitting(false);
        Alert.alert('Error', 'Invaliddd credentials!');

      }
    } catch (error) {
      console.log(error);
      actions.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.signinTextContainer}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-left-circle"
          color={colors.orangeColor}
          size={30}
        />
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
          // validationSchema={LoginValidationSchema}
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
                  title={email}
                  placeholder={emailPlace}
                  // error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  autoCapitalize="none"
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
