import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {LoginValidationSchema} from '../../common/schemas';
import {styles} from './styles.js';
import {KovelaIcon} from '../sign-up';
import Icon from 'react-native-vector-icons/Feather';
import {getUserInfo, loginUser} from '../../utils/api';
import {
  saveLoginSessionDetails,
  saveUserDetails,
} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';

const Signin = ({navigation}) => {
  const {
    buttonTexts: {login, sigup},
    paragraphs: {loginDescription, dontHaveAccount},
    placeHolders: {emailPlace, passwordPlace},
    headings: {
      inputTitles: {email, password},
    },
    screenNames: {bottomTab},
  } = allTexts;

  const {setLoginDetails, setUserDetails} = useContext(ApplicationContext);

  const getAndSaveUserInfo = async () => {
    try {
      let response = await getUserInfo();
      // console.log('login res', response);
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

  const signinHandler = async (data, actions) => {
    let payload = {
      username: data.email,
      password: data.password,
    };
    try {
      let result = await loginUser(payload);
      // console.log('signinhand login res', result);
      if (result && result.status === 200) {
        const {
          data: {access_token, refresh_token, token_type, expires_in},
        } = result;
        await saveLoginSessionDetails(token_type, access_token);
        getAndSaveUserInfo();
        setLoginDetails(access_token);
        actions.setSubmitting(false);
      } else {
        actions.setSubmitting(false);
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
          color={colors.green2}
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
          }) => {
            return (
              <View style={styles.inputContainer}>
                <InputField
                  title={email}
                  placeholder={emailPlace}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  autoCapitalize="none"
                />
                <View style={{height: 20}} />
                <InputField
                  title={password}
                  placeholder={passwordPlace}
                  secureTextEntry={true}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                <View style={styles.btnContainer}>
                  <PrimaryButton
                    bgColor={colors.red3}
                    loading={isSubmitting}
                    onPress={handleSubmit}
                    text={login}
                    radius={25}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
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
