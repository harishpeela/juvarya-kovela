/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ToastAndroid,
  useColorScheme,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useContext} from 'react';
import {PrimaryButton} from '../../components';
import {PasswordField} from '../../components/inputfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {UpdatePasswordValidation} from '../../common/schemas';
import {styles} from './style';
import {BackHeader} from '../../components';
import {NewUpdateUserPassword} from '../../utils/api';
import {TopBarcard} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
const UpdatePassword = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    buttonTexts: {updatePassword},
    placeHolders: {confirmPasswordPlace, passwordPlace},
    headings: {
      inputTitles: {currentPassword, Newpassword, confirmPassword},
    },
  } = allTexts;
  const PasswordUpdate = async (values, formikActions) => {
    let payLoad = {
      oldPassword: values?.currentPassword,
      password: values?.newPassword,
    };
    // console.log('payload', payLoad);
    try {
      let result = await NewUpdateUserPassword(payLoad);
      // console.log('result of update password', result?.data);
      Alert.alert('Success', 'Password Updated Successfully', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate(allTexts.tabNames.profile),
        },
      ]);
    } catch (error) {
      console.log('error in update passwords', error);
    }
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      {/* <View style={styles.updateProfileTopCard}>
        <TopBarcard
          back={true}
          txt={'updatePassword'}
          navBack={navigation}
        />
      </View> */}

      <View style={{height: '15%'}}>
        <TopBarCard2
          back={true}
          txt={'Update Password'}
          navigation={navigation}
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
            currentPassword: '',
            newPassword: '',
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
                  title={'Current Password'}
                  value={values.currentPassword}
                  titleColor={colors.orangeColor}
                  placeholder={passwordPlace}
                  error={touched.currentPassword && errors.currentPassword}
                  onBlur={handleBlur('currentPassword')}
                  setState={handleChange('currentPassword')}
                />

                <PasswordField
                  title={Newpassword}
                  value={values.newPassword}
                  titleColor={colors.orangeColor}
                  placeholder={passwordPlace}
                  error={touched.newPassword && errors.newPassword}
                  onBlur={handleBlur('newPassword')}
                  setState={handleChange('newPassword')}
                />

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
                    loading={isSubmitting}
                    onPress={handleSubmit}
                    text={updatePassword}
                    radius={25}
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
