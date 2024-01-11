import React, { useContext, useEffect, useState } from 'react';
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
import { format } from 'date-fns';
import {
  EventInput,
  EventInput1,
  Input,
  PrimaryButton,
  ProfileInfo,
  TopBarcard,
} from '../../components';
import { InputField } from '../../components/inputfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import { UpdateProfileValidation } from '../../common/schemas';
import { styles } from './styles'; // Update this import based on your project structure
import { BackHeader, BackgroundImage } from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import SelectDropdown from 'react-native-select-dropdown';
import { Update_Profile } from '../../utils/api';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { EventInput2, EventInput3 } from '../../components/eventCreateInput';

const UpdateProfile = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    buttonTexts: { updateProfile },
    headings: {
      inputTitles: { },
    },
  } = allTexts;

  const { userDetails, setLoginDetails } = useContext(ApplicationContext);
  console.log('userDe', userDetails);

  const [gotraValue, setGotraValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [dropDownError, setDropDownError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [eventError, setEventError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [GV, setGV] = useState(false);
  const [PV, setPV] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isRoleSelected, setIsRoleSelected] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [DE, setDE] = useState(false);
  const [pinErr, setPinErr] = useState(false)
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
  const ProfileUpdate = async () => {
    var date = new Date(toDate);
    console.log('frondatew', date);
    var formattedDate = format(date, "dd-MM-yyyy");
    console.log(formattedDate, '====<> date');
    let payload = {
      dob: formattedDate,
      gender: isRoleSelected,
      gothra: gotraValue,
    };
    console.log(payload, 'payload');
    if (toDate === '' || isRoleSelected === '' || gotraValue === '' || phone === '' || name === '' || pincode === '') {
      setEventError(true);
      console.log('1');
      setPV(true);
      setGV(true);
      setDropDownError(true);
      setDE(true);
      setPinErr(true)
    } else if (gotraValue && toDate && isRoleSelected && pincode && phone && name) {
      setEventError(false);
      setPV(false);
      setGV(false);
      setDropDownError(false)
      setPinErr(false)
      setDE(true);
      console.log('jhasb', toDate, isRoleSelected, gotraValue, phone, pincode);
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
    }
    else if (toDate) {
      console.log('2');
      setDE(false)
    } else if (isRoleSelected) {
      console.log('6');

      setDropDownError(false)
    } else if (gotraValue) {
      console.log('3');
      setGV(false)
    } else if (phone?.length < 10 || phone?.length > 10) {
      console.log('4');
      setPV(true)
    } else if (phone?.length === 10) {
      setPV(false)
    } else if (name) {
      console.log('5');
      setEventError(false)
    } else if (pincode) {
      console.log('7');
      setPinErr(false)
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
        <View style={{ marginTop: '25%' }}>
          <View style={{ bottom: '8%' }}>
            <EventInput3
              lable={'Name'}
              user={true}
              placeholder={userDetails?.username}
              height={50}
              value={name}
            />
            {eventError && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: '2%',
                }}>
                please enter Name
              </Text>
            )}
            <EventInput3
              lable={'Email'}
              email={true}
              placeholder={userDetails?.email}
              height={50}
              value={email}
            />
            <EventInput
              lable={'Phone Number'}
              placeholder={'Phone Number'}
              phone={true}
              height={50}
              value={phone}
              keyboardType={'numeric'}
              onChangeText={text => { setPhone(text); setPV(false) }}
            />
            {PV && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.red1 }}> please enter phone number</Text>
              </View>
            )}
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
                  dropdownStyle={{ paddingTop: 10, borderRadius: 20 }}
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
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                  )}
                />
              </View>
            </TouchableOpacity>
            {dropDownError && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.red1 }}> please select gender</Text>
              </View>
            )}
            <EventInput
              lable={'Gotra'}
              gotra={true}
              placeholder={'Gotra'}
              height={50}
              onChangeText={text => { setGotraValue(text); setGV(false) }}
              value={gotraValue}
            />
            {GV && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.red1 }}> please enter Gotra</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '6%',
              }}>
              <View style={{ width: '60%', marginTop: 5 }}>
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

              </View>
              <View style={{ width: '45%', right: 45, marginTop: 5 }}>
                <EventInput
                  lable={'Pin Code'}
                  // keyboardType={true}
                  pincode={true}
                  placeholder={'Pincode'}
                  height={50}
                  onChangeText={text => { setPincode(text); setPinErr(false) }}
                  value={pincode}
                />
                {pinErr && (
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: colors.red1 }}> please enter Gotra</Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{ width: '80%', alignSelf: 'center', marginTop: 50 }}>
              <PrimaryButton
                text={'Update'}
                bgColor={colors.orangeColor}
                onPress={() => ProfileUpdate()}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
