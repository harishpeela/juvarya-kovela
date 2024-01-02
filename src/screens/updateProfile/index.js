import React, { useContext, useEffect, useState } from 'react';
import { View, ToastAndroid, useColorScheme, Text, Alert } from 'react-native';
import { PrimaryButton } from '../../components';
import { InputField } from '../../components/inputfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { allTexts, colors } from '../../common';
import { Formik } from 'formik';
import { UpdateProfileValidation } from '../../common/schemas';
import { styles } from './styles'; // Update this import based on your project structure
import { BackHeader, BackgroundImage } from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import SelectDropdown from 'react-native-select-dropdown';
import { Update_Profile } from '../../utils/api';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';

const UpdateProfile = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    buttonTexts: { updateProfile },
    headings: {
      inputTitles: { dateOfBirth, gender, gotra },
    },
  } = allTexts;

  const [dateOfBirthValue, setDateOfBirthValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [gotraValue, setGotraValue] = useState('');
  const [isRoleSelected, setIsRoleSelected] = useState('');
  const [dropDownError, setDropDownError] = useState('');

  const ProfileUpdate = async (data, actions) => {
    let payload = {
      dob: data?.dateOfBirth,
      gender: genderValue,
      gothra: data?.gotra
    } 
    console.log(payload, 'payload');
    try {
      console.log(payload, 'payload try');
      let responce = await Update_Profile(payload);
      if(responce?.status === 200){
        Alert.alert('Success', responce?.data?.message, [
          {
            text: 'Ok',
            onPress: () =>
              navigation.goBack(),
          },
        ]);
      } else  {
        alert('some thing went wrong');
      }
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };
  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}
    >
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={updateProfile}
        />
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}
      >
        <Formik
          onSubmit={(values, formikActions) => {
            if (
              values.dateOfBirth === dateOfBirthValue &&
              values.gender === genderValue &&
              values.gotra === gotraValue
            ) {
              ToastAndroid.show('No changes detected.', ToastAndroid.SHORT);
            } else {
              ProfileUpdate(values, formikActions);
            }
          }}
          validationSchema={UpdateProfileValidation}
          initialValues={{
            dateOfBirth: '',
            gender: '',
            gotra: '',
          }}
        >
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
                  title={dateOfBirth}
                  titleColor={colors.orangeColor}
                  onBlur={handleBlur('dateOfBirth')}
                  setState={handleChange('dateOfBirth')}
                  value={values.dateOfBirth}
                />
                <View style={styles.dropDownContainer}>
                  <Text style={styles.genderText}>Gender</Text>
                  <SelectDropdown
                    data={['Male', 'Female', 'Others']}
                    buttonTextStyle={styles.textStyle}
                    defaultValue={isRoleSelected}
                    onSelect={e => {
                      setIsRoleSelected(e);
                      setDropDownError(false);
                      setGenderValue(e);
                    }}
                    buttonStyle={styles.buttonStyle}
                    dropdownStyle={styles.dropdownStyle}
                    defaultButtonText="Select your Gender"
                    renderDropdownIcon={() => (
                      <View>
                        {/* You can add an icon here if needed */}
                      </View>
                    )}
                  />
                </View>

                <InputField
                  title={gotra}
                  titleColor={colors.orangeColor}
                  onBlur={handleBlur('gotra')}
                  setState={handleChange('gotra')}
                  value={values.gotra}
                />

                <View style={styles.centeredButtonContainer}>
                  <PrimaryButton
                    bgColor={colors.orangeColor}
                    radius={25}
                    width={150}
                    marginTop={200}
                    textColor={'white'}
                    onPress={handleSubmit}
                    text={'Update Details'}
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

export default UpdateProfile;
