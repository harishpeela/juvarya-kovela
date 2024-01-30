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
import { launchImageLibrary } from 'react-native-image-picker';
import { allTexts, colors } from '../common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Save_Event } from '../utils/api';

const EditInfo = ({ navigation, route }) => {
  console.log('eventskkkasasasa screen')
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

  // const CreateEvent = async () => {
  //   let img = getImageObj(image);
  //   if (eventName === '') {
  //     setEventError(true);
  //   } if (description === '') {
  //     setDE(true)
  //   } if (address === '') {
  //     setAE(true);
  //   }
  //   else if (image, description, eventName, address) {
  // let payload = {
  //   information:eventName,
  //   type:description,
  //   eventId:"13" 
  // }
  // console.log("payload",payload);
          
  //   } 
  // };

  const CreateEvent  = async () => {
    let payload = {
      information:eventName,
      type:description,
      eventId:"13"
    }
    console.log("payload",payload);
    const result  = await Save_Event(payload);
    console.log("result",result?.data);
  }

  useEffect(() => {
    CreateEvent()
  })


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
          if (!res?.didCancel 
            && !res?.errorCode) {
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
        <View style={{ flexDirection: 'row', marginTop: '10%', marginLeft: '6%' }}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/backarrow.png')}
              style={{ height: 10, width: 6 }} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: '25%',
              color: 'white',
              alignSelf: 'center'
            }}>
            Edit Info
          </Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: '3%' }}>
        <EventInput lable={'Info Name'} placeholder={'Info Name'} height={50} onChangeText={(e) => setEventName(e)} value={eventName} />
        <EventInput lable={'Description'} placeholder={'Description'} height={100} onChangeText={text => setDescription(text)} value={description} />
      </ScrollView>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode={date}
        onConfirm={HandleCnfrm}
        onCancel={HideDatePicker}
        buttonTextColorIOS= 'black'

      />
      <DateTimePickerModal
        isVisible={datePickerVisible1}
        mode={toDate}
        onConfirm={HandleCnfrm1}
        onCancel={HideDatePicker}
      />
       <View style={{ width: '80%', alignSelf: 'center', marginTop: 50, position: 'absolute', bottom: 10 }}>
          <PrimaryButton text={'Save'} bgColor={colors.orangeColor} onPress={() => CreateEvent()} />
        </View>
    </SafeAreaView>
  );
};
export default EditInfo;
