/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {
  AddEvent,
  AddEventImage,
  TopBarcard,
  EventInput,
  PrimaryButton,
} from '../../components';
import { styles } from './styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';
import { allTexts, colors } from '../../common';
const AddEvents = ({ navigation, route }) => {
  const [data, setdata] = useState('');
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [eventError, setEventError] = useState(false);
  const [AE, setAE] = useState(false);
  const [DE, setDE] = useState(false);
  const CreateEvent = async () => {
    let Token = await getAuthTokenDetails();
    let img = getImageObj(image);
    console.log('==><', image, description, eventName, address);
    if(eventName === ''){
      setEventError(true);
    } if (description === ''){
      setDE(true) 
    } if(address === ''){
      setAE(true); 
    }
   else if (image, description, eventName, address) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", Token);
      var formdata = new FormData();
      formdata.append("name", eventName);
      formdata.append("profileId", 1);
      img.forEach(element => {
        formdata.append('files', element);
      });
      formdata.append("eventType", "EVENT");
      formdata.append("description", description);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://kovela.app/events/jtevent/save", requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result?.message === "save Event"){
            Alert.alert('Success', `Event created successfully`, [
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
  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAwareScrollView 
      keyboardShouldPersistTaps="handled"> */}
      <View style={styles.header}>
        <TopBarcard txt={'Add Event'} navigation={navigation} />
      </View>
      <View style={styles.imgCard}>
        <TouchableOpacity style={{}} onPress={() => UpLoadPhoto()}>
          <Image source={require('../../../assets/images/cameranew.png')} style={styles.camera} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}> Upload Photo</Text>
          <Text style={{ fontSize: 7 }}>[Upload upto 5 photos]</Text>
        </View>
        {image && (
          <AddEventImage data={image} />
        )}
      </View>
        {/* <KeyboardAwareScrollView> */}
        <ScrollView style={{ marginTop: '3%' }}>
          <EventInput lable={'Event Name'} placeholder={'Event Name'} height={50} onChangeText={(e) => setEventName(e)} value={eventName} />
          {eventError && (
            <Text style={{color: 'red', alignSelf: 'center', marginTop: '2%'}}>
              please enter Event Name
            </Text>
          )}
          <EventInput lable={'Description'} placeholder={'Description'} height={100} onChangeText={text => setDescription(text)} value={description} />
          {DE && (
            <Text style={{color: 'red', alignSelf: 'center', marginTop: '2%'}}>
              please enter description
            </Text>
          )}
          <EventInput lable={'From Date to To date'} placeholder={'from date to to date'} height={50} calendar={true} />
          <EventInput lable={'Address'} placeholder={'Address'} height={50} location={true} onChangeText={(text) => setAddress(text)} />
          {AE && (
            <Text style={{color: 'red', alignSelf: 'center', marginTop: '2%'}}>
              please enter Event Name
            </Text>
          )}
          <View style={{ width: '80%', alignSelf: 'center', marginTop: 50 }}>
          <PrimaryButton text={'Update'} bgColor={colors.orangeColor} onPress={() => CreateEvent()} />
        </View>
        </ScrollView>
        {/* </KeyboardAwareScrollView> */}
        
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};
export default AddEvents;
