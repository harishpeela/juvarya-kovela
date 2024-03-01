/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import {
  AddEvent,
  AddEventImage,
  TopBarcard,
  EventInput,
  PrimaryButton,
  EventInput1,
} from '../../components';
import {styles} from './styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {allTexts, colors} from '../../common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Save_Event} from '../../utils/api';
import {TopBarCard2} from '../../components/topBar1/topBarCard';

const Info = ({navigation, route}) => {
  const {data} = route.params || {};
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible1, setDatePickerVisible1] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const CreateEvent = async () => {
    let payload = {
      information: eventName,
      type: 'DESCRIPTION',
      eventId: data?.id,
    };
    // console.log('payload', payload);
    const result = await Save_Event(payload);
    // console.log('result of save events', result?.data);
    if (result.status === 200) {
      Alert.alert('Success', `Info created successfully`, [
        {
          text: 'Ok',
          onPress: () => navigation.navigate(allTexts.screenNames.eventsScreen),
        },
      ]);
    } else {
      alert('some thing went wrong try again');
      console.log('error');
    }
  };

  const HandleCnfrm = datedata => {
    if (datedata) {
      setDate(datedata);
      HideDatePicker();
    }
  };
  const HandleCnfrm1 = datedata => {
    if (datedata) {
      setToDate(datedata);
      HideDatePicker();
    }
  };
  const ShowDatePicker = () => {
    setDatePickerVisible1(true);
  };
  const HideDatePicker = () => {
    setDatePickerVisible(false);
    setDatePickerVisible1(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{minHeight: '15%',backgroundColor:'white'}}>
          <TopBarCard2
            back={true}
            txt={'Event Information'}
            navigation={navigation}
          />
        </View>
      </View>
      <ScrollView style={{backgroundColor:'white'}}>
        <EventInput
          lable={'Info Name'}
          placeholder={'Info Name'}
          height={50}
          onChangeText={e => setEventName(e)}
          value={eventName}
        />
        <EventInput
          lable={'Description'}
          placeholder={'Description'}
          height={100}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode={date}
        onConfirm={HandleCnfrm}
        onCancel={HideDatePicker}
        buttonTextColorIOS="black"
      />
      <DateTimePickerModal
        isVisible={datePickerVisible1}
        mode={toDate}
        onConfirm={HandleCnfrm1}
        onCancel={HideDatePicker}
      />
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          marginTop: 50,
          position: 'absolute',
          bottom: 10,
        }}>
        <PrimaryButton
          text={'Save'}
          bgColor={colors.orangeColor}
          onPress={() => CreateEvent()}
        />
      </View>
    </SafeAreaView>
  );
};
export default Info;
