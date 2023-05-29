import {View, ToastAndroid} from 'react-native';
import React, {useContext} from 'react';
import {PrimaryButton} from '../../components';
import {PasswordField} from '../../components/inputfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {UpdatePasswordValidation} from '../../common/schemas';
import {styles} from './style';
import {BackHeader} from '../../components';
import {UpdateUserPassword} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';

const UpdatePassword = ({navigation}) => {
  const {
    buttonTexts: {updatePassword},
    screenNames: {signin, otpScreen},
    placeHolders: {confirmPasswordPlace, passwordPlace},
    headings: {
      inputTitles: {password, confirmPassword},
    },
  } = allTexts;
  const {userDetails} = useContext(ApplicationContext);

  const updatePasswordHandler = async (values, formikActions) => {
    let payload = {
      userName: userDetails.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      updatePassword: true,
    };
    try {
      let result = await UpdateUserPassword(payload);
      formikActions.setSubmitting(false);
      if (result && result.status === 200) {
        ToastAndroid.show(
          'Successfully Updated your Password!',
          ToastAndroid.SHORT,
        );
        navigation.goBack();
      } else {
        ToastAndroid.show(
          'Error in Updating your Password!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.wrapper}>
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
            updatePasswordHandler(values, formikActions);
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
                  title={password}
                  value={values.password}
                  titleColor={colors.orangeColor}
                  placeholder={passwordPlace}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                <View style={{height: 30}} />
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
                    width={190}
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
