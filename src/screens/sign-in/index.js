import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useContext, useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {styles} from './styles.js';
import {KovelaIcon} from '../sign-up/index.js';
import {loginUser1, getUserInfoNew, getHomeFeedList} from '../../utils/api';
import {LoginValidationSchema} from '../../common/schemas';
import {
  saveLoginSessionDetails,
  saveUserDetails,
} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {PasswordField} from '../../components/inputfield';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5.js';
import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';

const Signin = ({navigation}) => {
  const [getHomeFeedListData] = useState([]);
  const [isConnected, setIsConnected] = useState(' ');

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
          username: result?.data?.firstName + result?.data?.lastName,
          email: result.data?.email,
          role: result?.data?.roles,
          id: result?.data?.id,
          primaryContact: result?.data?.primaryContact,
        });
        setUserDetails({
          username: result?.data?.firstName + result?.data?.lastName,
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
    if (data.email.length > 10) {
      let payload = {
        // primaryContact: data?.email,
        email: data?.email,
        password: data.password,
      };
      // console.log('playload with email', payload);
      try {
        let result = await loginUser1(payload);
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
          Alert.alert('Error', 'Invalid Credentials');
        }
      } catch (error) {
        actions.setSubmitting(false);
      }
    } else {
      let payload = {
        primaryContact: data?.email,
        password: data.password,
      };
      // console.log('playload with mobile', payload);

      try {
        let result = await loginUser1(payload);
        // console.log('result of login', result?.data);
        if (result && result.status === 200 && isConnected == true) {
          const {
            data: {accessToken, tokenType},
          } = result;
          await saveLoginSessionDetails(tokenType, accessToken);
          ApiData();
          setLoginDetails(accessToken);
          actions.setSubmitting(false);
        } else if (isConnected == false) {
          actions.setSubmitting(false);
          Alert.alert('Error', 'Invalid Credentials');
        }
      } catch (error) {
        actions.setSubmitting(false);
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
                  title={'Mobile or Email'}
                  isFlag
                  // keyboardType={'numeric'}
                  placeholder={emailPlace}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  maxLength={40}
                />
                <View style={{height: 20}} />
                <View>
                  <PasswordField
                    value={values.password}
                    title={'Password'}
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(allTexts.screenNames.forgetPassword);
                  }}>
                  <View>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </View>
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
