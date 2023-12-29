import React, { useContext, useEffect, useState } from 'react';
import { View, ToastAndroid, useColorScheme,Text } from 'react-native';
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

  const fetchGenderData = async (data,actions) => {
    let payload = {
      dob: dateOfBirthValue,
      gender: genderValue,
      gothra: gotraValue
    } 
    console.log(payload, 'payload');
    try {
      let responce = await Update_Profile(payload);
      console.log('data gothra', responce?.data);
      setGenderValue(data.gender);
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };

  const fetchDateOfBirthData = async () => {
    try {
      const response = await fetch(
        'https://kovela.app/customer/api/customer/userDetails'
      );
      const data = await response.json();
      setDateOfBirthValue(data.dateOfBirth);
    } catch (error) {
      console.error('Error fetching date of birth data:', error);
    }
  };

  const fetchGotraData = async () => {
    try {
      const response = await fetch(
        'https://kovela.app/customer/api/customer/userDetails'
      );
      const data = await response.json();
      setGotraValue(data.gotra);
    } catch (error) {
      console.error('Error fetching gotra data:', error);
    }
  };

  useEffect(() => {
    fetchGenderData();
    fetchDateOfBirthData();
    fetchGotraData();
  }, []);

  const UpdateProfileInfo = async (values, formikActions) => {
   
    ToastAndroid.show('Profile information updated successfully', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}
    >
      <BackgroundImage />
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
      fetchGenderData(values, formikActions);
    }
  }}
  validationSchema={UpdateProfileValidation}
  initialValues={{
    dateOfBirth: dateOfBirthValue,
    gender: genderValue,
    gotra: gotraValue,
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
