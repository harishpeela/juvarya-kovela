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
import { Loader } from '../../components';
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
import { CreateCommunityTemple} from '../../utils/api';
const CommunityTemple = ({navigation}) => {
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
  const [isRoleSelected, setIsRoleSelected] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [DE, setDE] = useState(false);
  const [pinErr, setPinErr] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState([]);
  const [dob, setDob] = useState(' ');
  const [CommunityTemple, setCommunityTemple] = useState('');
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(false);
  const [descripton, setDescription] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);
  const [DateError, setDateError] = useState(false);

  const HandleCnfrm = datedata => {
    if (datedata) {
      setToDate(datedata);
      HideDatePicker();
    }
    
  };

  console.log('todate',toDate)
  const ShowDatePicker = () => {
    setDatePickerVisible(true);
  };

  const HideDatePicker = () => {
    setDatePickerVisible(false);
    setDatePickerVisible(false);
  };
  


  const CommunityTempleData = async () => {
    var date = new Date(toDate);
    var formattedDate = format(date, 'dd-MM-yyyy');
    
    let payload ={
      name: name,
      desciption: descripton,
      seasonal: true,
      establishedOn:formattedDate
  }
    setLoader(true);
    if(name === ''){
      setEventError(true)
      console.log('name',name)
    } else if(descripton === ''){
      setDescriptionError(true)
      console.log('description',descripton)
    } else if (date === ''){
      setDateError(true)
      console.log('date',date)
    } else if(name && date && descripton){
      let result = await CreateCommunityTemple(payload);
      console.log('result.date ====kkk>', result?.data);

    }
    

    
    
    // if (result) {
    //   setCommunityTemple(result?.data.data);
    //   setLoader(false);
    // } else {
    //   setCommunityTemple([]);
    //   setLoader(false);
    // }
  };
  useEffect(() => {
    CommunityTempleData();
  }, []);
  // console.log('CommunityTemple Data====>',CommunityTemple );
 


  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{}}>
          <TopBarCard2
            txt={'Create Temple'}
            back={true}
            navigation={navigation}></TopBarCard2>
        </View>
        <View style={{marginTop: '15%'}}>
          <View style={{bottom: '8%'}}>
            <EventInput
              lable={'Name'}
              placeholder={'Enter your name'}
              height={50}
              onChangeText={e => {setName(e); setEventError(false)}}
            />
            {eventError  && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-start',
                  marginTop: '2%',
                  marginLeft:'8%'
                }}>
                please enter Name
              </Text>
            )}
            <EventInput
              lable={'Description'}
              placeholder={'About Temple'}
              height={150}

              onChangeText={e => {setDescription(e); setDescriptionError(false)}}
            />
             {DescriptionError  && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-start',
                  marginTop: '2%',
                  marginLeft:'8%'
                }}>
                please enter Description
              </Text>
            )}



            
            {/* <EventInput
              placeholder={'Established Date'}
             
              height={50}
              value={phone}
              keyboardType={'numeric'}
              onChangeText={text => {
                setPhone(text);
                setPV(false);
              }}
            /> */}
            {/* <TouchableOpacity>
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
                    currentCustomer?.gender ? currentCustomer?.gender : 'gender'
                  }
                  dropdownStyle={{paddingTop: 10, borderRadius: 20}}
                  onSelect={e => {
                    setIsRoleSelected(e);
                    setDropDownError(false);
                    setGenderValue(e);
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
                     
                    </View>
                  )}
                />
              </View>
            </TouchableOpacity> */}
            {/* <EventInput
              lable={'Gotra'}
              gotra={true}
              placeholder={currentCustomer?.gothra ? currentCustomer?.gothra : 'gotra'}
              height={50}
              onChangeText={text => {
                setGotraValue(text);
              }}
             
            /> */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '4%',
              }}>
              <View style={{width: '60%', marginTop: 5}}>
                <View style={{width:'205%',marginLeft:-40}}>
                <EventInput2
                  lable={'     Date of Establishment'}
                  height={50}
                  value1={toDate ? format(toDate, 'dd-MM-yyyy') : ''}
                  calendar={true}
                  onPressCalendar={() => ShowDatePicker()}
                 
                />
                 {DateError  && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-start',
                  marginTop: '2%',
                  marginLeft:'12%'
                }}>
                please Select Date
              </Text>
            )}
                 </View>
                <DateTimePickerModal
                  isVisible={datePickerVisible}
                  mode={date}
                  onConfirm={HandleCnfrm}
                  onCancel={HideDatePicker}
                />
              </View>
              
              <View style={{width: '45%', right: 35, marginTop: 5}}>
                {/* <EventInput
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
                /> */}
              </View>
            </View>
            <View style={{width: '80%', alignSelf: 'center', marginTop: '60%'}}>
              <PrimaryButton
                text={'Submit'}
                bgColor={colors.orangeColor}
                onPress={() => CommunityTempleData()}
              />
            </View>
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CommunityTemple;
