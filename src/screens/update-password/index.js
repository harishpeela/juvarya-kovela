/* eslint-disable react-native/no-inline-styles */
import {View, ToastAndroid, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import {PrimaryButton} from '../../components';
import {PasswordField} from '../../components/inputfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {UpdatePasswordValidation} from '../../common/schemas';
import {styles} from './style';
import {BackHeader, BackgroundImage} from '../../components';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';

const UpdatePassword = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {

    buttonTexts: {updatePassword},
    placeHolders: {confirmPasswordPlace, passwordPlace},
    headings: {
      inputTitles: {currentPassword,Newpassword, confirmPassword},
    },
  } = allTexts;
  const {userDetails} = useContext(ApplicationContext);

  const PasswordUpdate = async (values, formikActions) => {
    let token = await getAuthTokenDetails();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    var raw = JSON.stringify({
      username: userDetails?.username,
      password: values.password,
    });
    console.log('raw', raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://kovela.app/customer/api/customer/password', requestOptions)
      .then(response => response.json())
      .then(result => {
        formikActions.setSubmitting(false);
        if (result) {
          ToastAndroid.show(
            // 'మీ పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది ..!',
            'Your Password saved sucessfully',
            ToastAndroid.SHORT,
          );
          navigation.goBack();
        } else {
          ToastAndroid.show(
            'Error in Updating your Password!',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      <BackgroundImage />
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={updatePassword}
        />
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <Formik
          onSubmit={(values, formikActions) => {
            PasswordUpdate(values, formikActions);
          }}
          validationSchema={UpdatePasswordValidation}
          initialValues={{
            password: '',
            confirmPassword: '',
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

                 <PasswordField
                  title={currentPassword}
                  value={values.password}
                  titleColor={colors.orangeColor}
                  placeholder={passwordPlace}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                <PasswordField
                  title={Newpassword}
                  value={values.password}
                  titleColor={colors.orangeColor}
                  placeholder={passwordPlace}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                {/* <View style={{height: 30}} /> */}
                <PasswordField
                  title={confirmPassword}
                  value={values.confirmPassword}
                  titleColor={colors.orangeColor}
                  placeholder={confirmPasswordPlace}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  setState={handleChange('confirmPassword')}
                />
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    bgColor={colors.orangeColor}
                    radius={25}
                    width={100}
                    textColor={'white'}
                    loading={isSubmitting}
                    onPress={handleSubmit}
                    text={updatePassword}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default UpdatePassword;
