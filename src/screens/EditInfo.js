/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import {EventInput, PrimaryButton} from '../components';
import {styles} from './add-events/styles';
import {colors,allTexts} from '../common';
import { UpdateInfo } from '../utils/api';

const EditInfo = ({navigation, route}) => {
  const {data} = route.params || {};
  console.log('info==================>>>>>>>>>>>>>>>>>>>>> screen', data);

  const [eventName, setEventName] = useState('');
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState(data?.information || '');
  


  const UpdateInfoData  = async () => {
    console.log('data?.id', data?.id);
    let payload = {
      
      information:description,
      id: data?.id
    }
    console.log("payload",payload);



  let result  = await UpdateInfo(payload);
    console.log('result of save events', result?.data);
          if (result.status === 200) {
            Alert.alert( `Success`,'Information Updated successfully', [
              {
                text: 'Ok',
                onPress: () =>
                  navigation.navigate(allTexts.screenNames.eventsScreen),
              },
            ]);
          }
     else {
      alert('some thing went wrong try again');
      console.log('error')
    }
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{flexDirection: 'row', marginTop: '10%', marginLeft: '6%'}}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/backarrow.png')}
              style={{height: 10, width: 6}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: '20%',
              color: 'white',
              alignSelf: 'center',
            }}>
            Edit Information
          </Text>
        </View>
      </View>
      <ScrollView style={{marginTop: '3%'}}>
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
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          marginTop: 50,
          position: 'absolute',
          bottom: 10,
        }}>
        <PrimaryButton
          text={'Edit'}
          bgColor={colors.orangeColor}
          onPress={() => UpdateInfoData()}
        />
      </View>
    </SafeAreaView>
  );
};
export default EditInfo;
