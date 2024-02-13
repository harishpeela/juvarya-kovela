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
import {format} from 'date-fns';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import {UpdateProfileValidation} from '../../common/schemas';
import {styles} from './styles'; // Update this import based on your project structure
import {BackHeader, BackgroundImage} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import SelectDropdown from 'react-native-select-dropdown';
import {
  GetCurrentCustomer,
  Update_Profile,
  getUserInfoNew,
} from '../../utils/api';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {EventInput2, EventInput3} from '../../components/eventCreateInput';
import {TopBarCard2} from '../../components/topBar1/topBarCard';

const UpdateProfile = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {userDetails} = useContext(ApplicationContext);
  const [gotraValue, setGotraValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [dropDownError, setDropDownError] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [eventError, setEventError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [GV, setGV] = useState(false);
  const [PV, setPV] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isRoleSelected, setIsRoleSelected] = useState();
  const [toDate, setToDate] = useState(new Date());
  const [DE, setDE] = useState(false);
  const [pinErr, setPinErr] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState([]);
  const [dob, setDob] = useState(' ');




  const HandleCnfrm = (datedata) => {
    if (datedata) {
      console.log('date', datedata);
      setToDate(datedata);
      setDob(format(datedata, 'dd-MM-yyyy')); // Update the dob state with the selected date
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
    var formattedDate = format(date, 'dd-MM-yyyy');
    // console.log(formattedDate, '====<> date');
    let payload = {
      dob: formattedDate,
      gender: isRoleSelected,
      gothra: gotraValue,
      whatsAppEnabled: true,
      zodiacSign: '',
      primaryContact: '',
    };
    console.log(payload, 'payload');
    if (gotraValue === '' && isRoleSelected === '' && pincode === '') {
      alert('please fill at least one field');
    } else if (gotraValue || isRoleSelected || pincode) {
      try {
        let responce = await Update_Profile(payload);
        console.log('date of birth', responce?.data);
        if (responce?.status === 200) {
          Alert.alert('Success', "Details Updated Successfully", [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching gender data:', error);
      }
    }
  };
  const getCustomer = async () => {
    try {
      let result = await getUserInfoNew();
      // console.log('templeAddress', result?.data);
      if (result) {
        const dty = result?.data || [];
        setCurrentCustomer(dty);
        setDob(dty?.dob);
        setIsRoleSelected(dty?.gender);
      }
    } catch (error) {
      console.log('error in popular temples', error);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{}}>
          <TopBarCard2
            txt={'Update Profile'}
            back={true}
            navigation={navigation}></TopBarCard2>
        </View>
        <View style={{marginTop: '15%'}}>
          <View style={{bottom: '8%'}}>
            <EventInput3
              lable={'Name'}
              user={true}
              placeholder={userDetails?.username}
              height={50}
              value={userDetails?.username}
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
              placeholder={userDetails?.primaryContact}
              phone={true}
              height={50}
              value={phone}
              keyboardType={'numeric'}
              onChangeText={text => {
                setPhone(text);
                setPV(false);
              }}
            />
            <TouchableOpacity>
              <View>
                <Text
                  style={{
                    marginLeft: '8%',
                    marginVertical: '2%',
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Gender
                </Text>
                
                <SelectDropdown
                  data={['Male', 'Female', 'Others']}
                  defaultValue={isRoleSelected}
                  onSelect={(e) => {
                    setIsRoleSelected(e);
                    setGV(true); // Set GV to true when gender is selected
                  }}
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
                    width: '84%',
                    marginHorizontal: '8%',
                  }}
                  dropdownIconPosition="left"
                  defaultButtonText={
                    currentCustomer?.gender ? currentCustomer?.gender  : 'gender'
                  }
                  
                  dropdownStyle={{paddingTop: 10, borderRadius: 20}}
                  onSelect={e => {
                    setIsRoleSelected(e);
                    setDropDownError(false);
                    setGenderValue(true);
                  }}
                  renderDropdownIcon={() => (
                    <View>
                      {isRoleSelected === 'Male' && (
                        <FontAwesome
                          name="male"
                          size={20}
                          color={colors.orangeColor}
                          style={{marginLeft: 2}}
                        />
                      )}
                      {isRoleSelected === 'Female' && (
                        <FontAwesome
                          name="female"
                          size={20}
                          color={colors.orangeColor}
                          style={{marginLeft: 2}}
                        />
                      )}
                      {/* {isRoleSelected === 'Others' && (
                        <FontAwesome
                          name="transgender"
                          size={20}
                          color={colors.orangeColor}
                          style={{marginLeft: 2}}
                        />
                      )} */}
                    </View>
                  )}
                />
              </View>
            </TouchableOpacity>
            <EventInput
              lable={'Gotra'}
              gotra={true}
              placeholder={currentCustomer?.gothra ? currentCustomer?.gothra : 'gotra'}
              height={50}
              onChangeText={text => {
                setGotraValue(text);
              }}
              // value={
              //   currentCustomer?.gothra ? currentCustomer?.gothra : gotraValue
              // }
            />
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '4%',
              }}>
              <View style={{width: '60%', marginTop: 5}}>
                <EventInput2
                  lable={'Date of Birth'}
                  height={50}
                  value1={dob ? dob.slice(0, 10) : toDate?.toLocaleDateString()}
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
              <View style={{width: '45%', right: 35, marginTop: 5}}>
                <EventInput
                  lable={'Pin Code'}
                  pincode={true}
                  placeholder={'Pincode'}
                  height={50}
                  onChangeText={text => {
                    setPincode(text);
                    setPinErr(false);
                  }}
                  maxLength={6}
                  value={pincode}
                />
              </View>
            </View>
            <View style={{width: '80%', alignSelf: 'center', marginTop: 100}}>
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
