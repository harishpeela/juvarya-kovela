/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Alert, useColorScheme, Platform } from 'react-native';
import {
  AddEvent,
  AddEventImage,
  TopBarcard,
  EventInput,
  PrimaryButton,
  EventInput1
} from '../../components';
import { styles } from './styles';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import { launchImageLibrary } from 'react-native-image-picker';
import { allTexts, colors } from '../../common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { EventHighLights } from '../utils/api';
import { EVENTS_URL } from '../../utils/api/api';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';
import { id } from 'date-fns/locale';
const Save_Highlight = ({ navigation, route }) => {
  const {id} = route.params || {};
  const [date, setDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [eventError, setEventError] = useState(false);
  const [AE, setAE] = useState(false);
  const [DE, setDE] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible1, setDatePickerVisible1] = useState(false);
  const [EventHighLightsData, setEventHighLightsData] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const eventHighlights = async () => {
    let img = getImageObj(image);
    let token = await getAuthTokenDetails();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var formdata = new FormData();
    formdata.append("eventId", id);
    formdata.append("highLight", eventName);
    formdata.append("description", description);
    img?.forEach(element => {
      formdata.append('files', element);
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    if(img === null || img === ''){
      alert('please upload image')
    }
    if (eventName === '') {
     alert('please fill event name')
    } if (description === '') {
      alert('please fill description')
    }
    else if (image, description, eventName) {
      fetch(`${EVENTS_URL}jtEventHighlights/save`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          Alert.alert('Success', `hightlights created successfully`, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.eventsScreen),
            },
          ]);
        } else {
          Alert.alert('error', `some thing went wrong try again`, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.eventsScreen),
            },
          ]);
        }
      })
      .catch(error => console.log('error', error));
    } else {
      alert('some thing went wrong try again');
      console.log('error')
    }

    
  };

  const UpLoadPhoto = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          selectionLimit: 5,
          quality: 1,
          // maxHeight: 1080,
          // maxWidth: 1080,
        },
        res => {
          if (!res?.didCancel && !res?.errorCode) {
            let assets = res?.assets;
            if (assets) {
              let images = assets.filter(item => item).map(({ uri }) => ({ uri }));
              // console.log('images', images);
              setImage(images);
            }
          } else {
            console.log(res?.errorMessage);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getImageObj = img => {
    return img?.map(oImg => {
      let newUri =
        Platform.OS === 'ios' ? oImg.uri : oImg.uri.replace('file://', 'file:');
      let imageObj = {
        uri: newUri,
        name: `${Date.now()}.jpg`,
        type: 'image/jpeg',
      };
      return imageObj;
    });
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
      <View style={styles.header}>
      <View>
        
        <View style={{minHeight: '45%'}}>
        <TopBarCard2 
        back={true}
        txt={'Event HighLights'}
        navigation={navigation}
        marginLeft={'21%'}
        />
        </View>
        </View>
        <View style={styles.imgCard}>
          <TouchableOpacity style={{}} onPress={() => UpLoadPhoto()}>
            <Image source={require('../../../assets/images/cameranew.png')} style={styles.camera} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: isDarkMode ? 'gray' : 'gray' }}> Upload Photo</Text>
            <Text style={{ fontSize: 7, color: isDarkMode ? 'gray' : 'gray' }}>[Upload upto 5 photos]</Text>
          </View>
          {image && (
            <AddEventImage data={image} />
          )}
        </View>
      </View>
      <ScrollView style={{ backgroundColor:'white'}}>
        <EventInput lable={'Event Name'} placeholder={'Event Name'} height={50} onChangeText={(e) => setEventName(e)} value={eventName} />
        {eventError && (
          <Text style={{ color: 'red', alignSelf: 'center', marginTop: '2%' }}>
            please enter Event Name
          </Text>
        )}
        <EventInput lable={'Description'} placeholder={'Description'} height={100} onChangeText={text => setDescription(text)} value={description} />
        {/* {DE && (
          <Text style={{ color: 'red', alignSelf: 'center', marginTop: '2%' }}>
            please enter description
          </Text>
        )} */}
        <EventInput1 lable={'From Date and To date'} placeholder={'from date'} height={50} value1={date?.toDateString()} onPressCalendar2={() => ShowDatePicker()} value2={toDate?.toDateString()} calendar={true} onPressCalendar={() => ShowDatePicker()} />
        {/* {AE && (
          <Text style={{ color: 'red', alignSelf: 'center', marginTop: '2%' }}>
            please enter Event Name
          </Text>
        )} */}
      </ScrollView>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode={date}
        onConfirm={HandleCnfrm}
        onCancel={HideDatePicker}
        buttonTextColorIOS='black'

      />
      <DateTimePickerModal
        isVisible={datePickerVisible1}
        mode={toDate}
        onConfirm={HandleCnfrm1}
        onCancel={HideDatePicker}
      />
      <View style={{ width: '80%', alignSelf: 'center', marginTop: 50, position: 'absolute', bottom: 10 }}>
        <PrimaryButton text={'Save'} bgColor={colors.orangeColor} onPress={() => eventHighlights()} />
      </View>
    </SafeAreaView>
  );
};
export default Save_Highlight;
