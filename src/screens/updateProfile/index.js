import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ToastAndroid,
  useColorScheme,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  EventInput,
  EventInput1,
  Input,
  PrimaryButton,
  TopBarcard,
} from '../../components';
import {InputField} from '../../components/inputfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {UpdateProfileValidation} from '../../common/schemas';
import {styles} from './styles'; // Update this import based on your project structure
import {BackHeader, BackgroundImage} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import SelectDropdown from 'react-native-select-dropdown';
import {Update_Profile} from '../../utils/api';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {EventInput2} from '../../components/eventCreateInput';

const UpdateProfile = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    buttonTexts: {updateProfile},
    headings: {
      inputTitles: {dateOfBirth, gender, gotra},
    },
  } = allTexts;

  const [dateOfBirthValue, setDateOfBirthValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [gotraValue, setGotraValue] = useState('');
  const [isRoleSelected, setIsRoleSelected] = useState('');
  const [dropDownError, setDropDownError] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profPic, setProfPic] = useState(null);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [eventError, setEventError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  // const [datePickerVisible1, setDatePickerVisible1] = useState(false);
  const [AE, setAE] = useState(false);
  const [DE, setDE] = useState(false);
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [calendar, setCalendar] = useState(false);

  const HandleCnfrm = datedata => {
    if (datedata) {
      setToDate(datedata);
      HideDatePicker();
    }
  };

  const ShowDatePicker = () => {
    setDatePickerVisible(true);
  };

  const HideDatePicker = () => {
    setDatePickerVisible(false);
    setDatePickerVisible(false);
  };

  const ProfileUpdate = async (data, actions) => {
    let payload = {
      dob: data?.dateOfBirth,
      gender: genderValue,
      gothra: data?.gotra,
    };
    console.log(payload, 'payload');
    try {
      console.log(payload, 'payload try');
      let responce = await Update_Profile(payload);
      if (responce?.status === 200) {
        Alert.alert('Success', responce?.data?.message, [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        alert('some thing went wrong');
      }
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };
  return (
    // <View
    //   style={{
    //     ...styles.wrapper,
    //     backgroundColor: isDarkMode ? 'white' : 'white',
    //   }}
    // >
    //   <View style={styles.headerContainer}>
    //     <BackHeader
    //       onBackPress={() => {
    //         navigation.goBack();
    //       }}
    //       txt={updateProfile}
    //     />
    //   </View>
    //   <KeyboardAwareScrollView
    //     keyboardShouldPersistTaps="handled"
    //     style={styles.keyBoardStyle}
    //     contentContainerStyle={styles.scrollContainer}
    //   >
    //     <Formik
    //       onSubmit={(values, formikActions) => {
    //         if (
    //           values.dateOfBirth === dateOfBirthValue &&
    //           values.gender === genderValue &&
    //           values.gotra === gotraValue
    //         ) {
    //           ToastAndroid.show('No changes detected.', ToastAndroid.SHORT);
    //         } else {
    //           ProfileUpdate(values, formikActions);
    //         }
    //       }}
    //       validationSchema={UpdateProfileValidation}
    //       initialValues={{
    //         dateOfBirth: '',
    //         gender: '',
    //         gotra: '',
    //       }}
    //     >
    //       {({
    //         errors,
    //         touched,
    //         handleChange,
    //         handleBlur,
    //         handleSubmit,
    //         isSubmitting,
    //         values,
    //       }) => {
    //         return (
    //           <View style={styles.fieldContainer}>
    //             <InputField
    //               title={dateOfBirth}
    //               titleColor={colors.orangeColor}
    //               onBlur={handleBlur('dateOfBirth')}
    //               setState={handleChange('dateOfBirth')}
    //               value={values.dateOfBirth}
    //             />
    //             <View style={styles.dropDownContainer}>
    //               <Text style={styles.genderText}>Gender</Text>
    //               <SelectDropdown
    //                 data={['Male', 'Female', 'Others']}
    //                 buttonTextStyle={styles.textStyle}
    //                 defaultValue={isRoleSelected}
    //                 onSelect={e => {
    //                   setIsRoleSelected(e);
    //                   setDropDownError(false);
    //                   setGenderValue(e);
    //                 }}
    //                 buttonStyle={styles.buttonStyle}
    //                 dropdownStyle={styles.dropdownStyle}
    //                 defaultButtonText="Select your Gender"
    //                 renderDropdownIcon={() => (
    //                   <View>
    //                     {/* You can add an icon here if needed */}
    //                   </View>
    //                 )}
    //               />
    //             </View>

    //             <InputField
    //               title={gotra}
    //               titleColor={colors.orangeColor}
    //               onBlur={handleBlur('gotra')}
    //               setState={handleChange('gotra')}
    //               value={values.gotra}
    //             />

    //             <View style={styles.centeredButtonContainer}>
    //               <PrimaryButton
    //                 bgColor={colors.orangeColor}
    //                 radius={25}
    //                 width={150}
    //                 marginTop={200}
    //                 textColor={'white'}
    //                 onPress={handleSubmit}
    //                 text={'Update Details'}
    //               />
    //             </View>
    //           </View>
    //         );
    //       }}
    //     </Formik>
    //   </KeyboardAwareScrollView>
    // </View>
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{minHeight: '20%'}}>
          <TopBarcard
            txt={' Update Profile'}
            menu={true}
            isBell={true}
            navigation={navigation}></TopBarcard>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.uploadContainer}>
            {image !== null ? (
              <View style={styles.preViewImageContainer}>
                {isCross && (
                  <View style={styles.crossIconContainer}>
                    <Icon
                      onPress={() => {
                        setImage(null);
                      }}
                      name="closecircle"
                      color={colors.orangeColor}
                      size={25}
                    />
                  </View>
                )}
                <Image
                  resizeMode="cover"
                  style={styles.preViewImage}
                  source={{uri: image?.uri}}
                />
              </View>
            ) : isLoading ? (
              <View style={styles.loader}>
                <Loader size={'small'} color={colors.orangeColor} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadPic}
                onPress={() => {
                  uploadPhoto();
                }}>
                {profPic ? (
                  <Image
                    source={{uri: profPic?.url}}
                    style={styles.profileImage}
                  />
                ) : (
                  // <Image source={{uri: 'https://s3.ap-south-1.amazonaws.com/kovela.app/17036713072161703671306767.jpg'}} style={styles.profileImage} />
                  // <Image source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}} style={styles.profileImage} />
                  <View>
                    <View style={styles.profileImage}>
                      <Icon
                        name="camera"
                        size={70}
                        color={colors.orangeColor}
                      />
                    </View>
                    <View style={styles.editProfile}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 50,
                          width: '40%',
                          height: '46%',
                          backgroundColor: colors.orangeColor,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          borderColor: 'white',
                        }}>
                        <Icon name="edit" size={20} color={colors.white} />
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{}}>
          <View style={{bottom: '8%'}}>
            <EventInput
              lable={'Name'}
              user={true}
              placeholder={'Name'}
              height={50}
              onChangeText={e => setEventName(e)}
              value={eventName}
            />
            {eventError && (
              <Text
                style={{color: 'red', alignSelf: 'center', marginTop: '2%'}}>
                please enter Event Name
              </Text>
            )}
            <EventInput
              lable={'Email'}
              email={true}
              placeholder={'Email'}
              height={50}
              onChangeText={text => setDescription(text)}
              value={description}
            />
            {DE && (
              <Text style={{color: 'red', alignSelf: 'center'}}>
                please enter description
              </Text>
            )}
            <View>
              <EventInput
                lable={'Phone Number'}
                placeholder={'Phone Number'}
                phone={true}
                height={50}
                onChangeText={text => setAddress(text)}
              />
              {AE && <Text>Phone Number</Text>}
            </View>
            <EventInput
              lable={'Gender'}
              placeholder={'Gender'}
              height={50}
              gender={true}
              onChangeText={text => setDescription(text)}
              value={description}
            />
            {DE && (
              <Text
                style={{color: 'red', alignSelf: 'center', marginTop: '2%'}}>
                please enter description
              </Text>
            )}
            <EventInput
              lable={'Gotra'}
              gotra={true}
              placeholder={'Gotra'}
              height={50}
              onChangeText={text => setDescription(text)}
              value={description}
            />
            {DE && (
              <Text
                style={{color: 'red', alignSelf: 'center', marginTop: '2%'}}>
                please enter description
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '6%',
              }}>
              <View style={{width: '47%'}}>
                <EventInput2
                  lable={'Date of Birth'}
                  height={50}
                  value1={toDate?.toDateString()}
                  calendar={true}
                  onPressCalendar={() => ShowDatePicker()}
                />
                <DateTimePickerModal
                  isVisible={datePickerVisible}
                  mode={date}
                  onConfirm={HandleCnfrm}
                  onCancel={HideDatePicker}
                />
              </View>
              <View style={{width: '47%'}}>
                <EventInput
                  lable={'Pin Code'}
                  // keyboardType={true}
                  pincode={true}
                  placeholder={'Pincode'}
                  height={50}
                  onChangeText={text => setDescription(text)}
                  value={description}
                />
                {DE && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'center',
                      marginTop: '2%',
                    }}>
                    please enter description
                  </Text>
                )}
              </View>
            </View>
            <View style={{width: '80%', alignSelf: 'center', marginTop: 50}}>
              <PrimaryButton
                text={'Update'}
                bgColor={colors.orangeColor}
                onPress={() => CreateEvent()}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
