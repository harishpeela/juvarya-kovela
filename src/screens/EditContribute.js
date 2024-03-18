/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Alert, useColorScheme } from 'react-native';
import {
  AddEvent,
  AddEventImage,
  TopBarcard,
  EventInput,
  PrimaryButton,
  EventInput1
} from '../components';
import { styles } from './add-events/styles';
import { TopBarCard2 } from '../components/topBar1/topBarCard';
import { launchImageLibrary } from 'react-native-image-picker';
import { allTexts, colors } from '../common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Save_Event } from '../utils/api';
import { statusBarHeight } from '../utils/config/config';
const EditContribute = ({ navigation, route }) => {
  console.log('events screen')
  const [date, setDate] = useState(new Date());
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
const isDarkMode = useColorScheme() === 'dark';
  const CreateEvent = async () => {
    let img = getImageObj(image);
    if (eventName === '') {
      setEventError(true);
    } if (description === '') {
      setDE(true)
    } if (address === '') {
      setAE(true);
    }
    else if (image, description, eventName, address) {
      var formdata = new FormData();
      formdata.append("name", eventName);
      formdata.append("profileId", 1);
      img.forEach(element => {
        formdata.append('files', element);
      });
      formdata.append("eventType", "EVENT");
      formdata.append("description", description);
      let result = await Save_Event(formdata);
      console.log('result of save events', result?.data);
          if (result?.data?.message === "save Event") {
            Alert.alert('Success', `Event created successfully`, [
              {
                text: 'Ok',
                onPress: () =>
                  navigation.navigate(allTexts.screenNames.eventsScreen),
              },
            ]);
          }
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
              console.log('images', images);
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
        <View style={{height:60, marginTop:statusBarHeight }}>
        <TopBarCard2 
        back={true}
        txt={'Contribution'}
        navigation={navigation}
        />
        </View>
        </View>
        <View style={styles.imgCard}>
          <TouchableOpacity style={{}} onPress={() => UpLoadPhoto()}>
            <Image source={require('../../assets/images/cameranew.png')} style={styles.camera} />
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
      <ScrollView style={{ marginTop: '3%' }}>
      <EventInput lable={'Name'} placeholder={'Name'} height={50} onChangeText={(e) => setEventName(e)} value={eventName} />
        <EventInput lable={'Event Name'} placeholder={'Event Name'} height={50} onChangeText={(e) => setEventName(e)} value={eventName} />
        {eventError && (
          <Text style={{ color: 'red', alignSelf: 'center', marginTop: '2%' }}>
            please enter Event Name
          </Text>
        )}
        <EventInput lable={'Management'} placeholder={'Management'} onChangeText={text => setDescription(text)} value={description} />
    
      </ScrollView>
      <View style={{ width: '80%', alignSelf: 'center', marginTop: 50,position: 'absolute', bottom: 10 }}>
          <PrimaryButton text={'Save'} bgColor={colors.orangeColor} onPress={() => CreateEvent()} />
        </View>
    </SafeAreaView>
  );
};
export default EditContribute;
