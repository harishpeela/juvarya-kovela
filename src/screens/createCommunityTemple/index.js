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

  const [eventError, setEventError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [dob, setDob] = useState(' ');
  const [CommunityTemple, setCommunityTemple] = useState('');
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [descripton, setDescription] = useState('');
  const [DescriptionError, setDescriptionError] = useState(false);
  const [DateError, setDateError] = useState(false);
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
 
  const CommunityTempleData = async () => {
    var date = new Date(toDate);
    var formattedDate = format(date, 'dd-MM-yyyy');
    let payload ={
      name: name,
      desciption: descripton,
      // seasonal: true,
      // establishedOn:formattedDate
  }
    setLoader(true);
    if(name === ''){
      setEventError(true)
      console.log('name',name)
    } if(descripton === ''){
      setDescriptionError(true)
      console.log('description',descripton)
    } else if (date === ''){
      setDateError(true)
      console.log('date',date)
    } else if(name && date && descripton){
      let result = await CreateCommunityTemple(payload);
      console.log('result.date ====kkk>', result?.data);
      console.log('status', result?.status);
      if(result?.status === 200){
        Alert.alert('Success', `Community temple was created successfully`, [
          {
            text: 'Ok',
            onPress: () => navigation.navigate(allTexts.tabNames.profile),
          },
        ]);
      }
    } else{
      alert('something went wrong please try after some time')
    } 
  };
 
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{}}>
          <TopBarCard2
            txt={'Create Community Temple'}
            back={true}marginLeft={'15%'}
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