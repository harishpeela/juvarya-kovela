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
  ProfileInfo,
  TopBarcard,
} from '../../components';
import {InputField} from '../../components/inputfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import {EventInput2, EventInput3} from '../../components/eventCreateInput';

const UpdateProfile = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    buttonTexts: {updateProfile},
    headings: {
      inputTitles: {},
    },
  } = allTexts;

  const {userDetails, setLoginDetails} = useContext(ApplicationContext);

  const [dateOfBirthValue, setDateOfBirthValue] = useState('');
  const [gotraValue, setGotraValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [dropDownError, setDropDownError] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profPic, setProfPic] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGneder] = useState('');
  const [gotra, setGotra] = useState('');
  const [dob, setDob] = useState('');
  const [pincode, setPincode] = useState('');
  const [eventError, setEventError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  // const [datePickerVisible1, setDatePickerVisible1] = useState(false);
  const [AE, setAE] = useState(false);
  const [DE, setDE] = useState(false);
  const [date, setDate] = useState(new Date());
  const [calendar, setCalendar] = useState(false);
  const [isRoleSelected, setIsRoleSelected] = useState('');
  const [selected, setSelected] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  const demo = () => {
    console.log(name);
    console.log(isRoleSelected);
    console.log(gotra);
    console.log(toDate);
    console.log(pincode);
  };

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
      toDate: toDate,
      gender: isRoleSelected,
      gotra: gotra,
    };
    console.log(payload, 'payload');
    try {
      let responce = await Update_Profile(payload);
      console.log(payload, 'payload try');
      console.log('Update Profile', responce?.data);

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
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{}}>
          <TopBarcard
            txt={'Update Profile'}
            back={true}
            navigation={navigation}></TopBarcard>
        </View>
        {/* <View style={styles.profileContainer}>
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
        </View> */}
        <View style={{marginTop: '25%'}}>
          <Formik
            onSubmit={(values, formikActions) => {
              const {dob, isRoleSelected, gotra} = values;
              console.log('values', values);
              ProfileUpdate(values, formikActions);
              if (
                values.gender === isRoleSelected &&
                values.gotra === gotra &&
                values.dob === dob
              ) {
                ToastAndroid.show('No changes detected.', ToastAndroid.SHORT);
              } else {
                ProfileUpdate(values, formikActions);
              }
            }}
            validationSchema={UpdateProfileValidation}
            initialValues={{
              gender: '',
              gotra: '',
              dob: '',
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
                <View style={{bottom: '8%'}}>
                  <EventInput
                    lable={'Name'}
                    user={true}
                    placeholder={'Enter Name'}
                    height={50}
                    onChangeText={e => setName(e)}
                    value={name}
                    setState={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {eventError && (
                    <Text
                      style={{
                        color: 'red',
                        alignSelf: 'center',
                        marginTop: '2%',
                      }}>
                      please enter Event Name
                    </Text>
                  )}
                  <EventInput3
                    lable={'Email'}
                    email={true}
                    placeholder={userDetails?.email}
                    height={50}
                    onChangeText={text => setEmail(text)}
                    value={email}
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
                      value={phone}
                      onChangeText={text => setPhone(text)}
                    />
                  </View>
                  <TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          marginLeft: '10%',
                          marginVertical: '2%',
                          color: 'black',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        Gender
                      </Text>
                      <SelectDropdown
                        data={['Male', 'Female', 'Others']}
                        buttonTextStyle={{
                          fontSize: 14,
                          marginRight: '70%',
                          color: colors.gray,
                        }}
                        defaultValue={isRoleSelected}
                        buttonStyle={{
                          backgroundColor: 'white',
                          borderColor: 'black',
                          borderWidth: 0.5,
                          borderRadius: 8,
                          height: 45,
                          width: '80%',
                          marginHorizontal: '10%',
                        }}
                        dropdownIconPosition="left"
                        defaultButtonText="Gender"
                        dropdownStyle={{paddingTop: 10, borderRadius: 20}}
                        onSelect={e => {
                          setIsRoleSelected(e);
                          setDropDownError(false);
                          setGenderValue(e);
                        }}
                        renderDropdownIcon={() => (
                          <View>
                            <FontAwesome
                              name="transgender-alt"
                              size={20}
                              color={colors.orangeColor}
                              style={{marginLeft: 10}}
                            />
                          </View>
                        )}
                      />
                      {errors.gender && touched.gender ? (
                        <Text style={styles.errors}>{errors.gender}</Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                  <View>
                    <EventInput
                      lable={'Gotra'}
                      gotra={true}
                      placeholder={'Gotra'}
                      height={50}
                      onChangeText={text => setGotra(text)}
                      value={gotra}
                    />
                    {errors.gotra && touched.gotra ? (
                      <Text style={styles.errors}>{errors.gotra}</Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '6%',
                    }}>
                    <View style={{width: '60%', marginTop: 5}}>
                      <EventInput2
                        lable={'Date of Birth'}
                        height={50}
                        value1={toDate?.toLocaleDateString()}
                        calendar={true}
                        onPressCalendar={() => ShowDatePicker()}
                      />
                      <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode={date}
                        onConfirm={HandleCnfrm}
                        onCancel={HideDatePicker}
                      />
                      {errors.dob && touched.dob ? (
                        <Text style={styles.errors}>{errors.dob}</Text>
                      ) : null}
                    </View>
                    <View style={{width: '45%', right: 45, marginTop: 5}}>
                      <EventInput
                        lable={'Pin Code'}
                        // keyboardType={true}
                        pincode={true}
                        placeholder={'Pincode'}
                        height={50}
                        onChangeText={text => setPincode(text)}
                        value={pincode}
                      />
                    </View>
                  </View>
                  <View
                    style={{width: '80%', alignSelf: 'center', marginTop: 50}}>
                    <PrimaryButton
                      text={'Update'}
                      bgColor={colors.orangeColor}
                      onPress={() => ProfileUpdate()}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
