import React, {useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {BackHeaderNew, BackgroundImage, TempleInput} from '../../components';
import {AddressUpdate} from '../../utils/api';
const UserInfo = ({navigation}) => {
  const [data, setData] = useState({
    contactNumber: '',
    line1: '',
    line2: '',
    postalCode: '',
    city: '',
    locality: '',
  });
  const AddressUpdateInfo = async () => {
    let payload = {
      contactNumber: data?.contactNumber,
      line1: data?.line1,
      line2: data?.line2,
      postalCode: data?.postalCode,
      city: data?.city,
      locality: data?.locality,
    };
    // console.log('payload', payload);
    try {
      let result = await AddressUpdate(payload);
      // console.log('results of address update', result?.data);

      if (result && result.status === 200) {
        Alert.alert('Success', 'Address update was success', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.log('error in address update', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={styles.headerContainer}>
        <BackHeaderNew
          txt={'User Info'}
          isArrow={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subFormHeading}>Address</Text>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Description'}
              placeholder={'Type here'}
              width={'100%'}
              onChangeText={text => setData({...data, contactNumber: text})}
              value={data?.contactNumber}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              // label={'Contact Number'}
              placeholder={'Contact Number'}
              width={'100%'}
              value={data.contactNumber}
              onChangeText={text => setData({...data, contactNumber: text})}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              // label={'Address Line 1'}
              placeholder={'Address Line 1'}
              width={'100%'}
              value={data.line1}
              onChangeText={text => setData({...data, line1: text})}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              // label={'Address Line 2'}
              placeholder={'Adress Line 2'}
              width={'100%'}
              value={data.line2}
              onChangeText={text => setData({...data, line2: text})}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Locality'}
              placeholder={'Locality'}
              width={'100%'}
              value={data.locality}
              onChangeText={text => setData({...data, locality: text})}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'City'}
              placeholder={'City'}
              width={'100%'}
              value={data.city}
              onChangeText={text => setData({...data, city: text})}
            />
          </View>
          {/* <View style={styles.subFormElement}> */}
          <TempleInput
            label={'PostalCode'}
            placeholder={'Enter postalCode'}
            width={'100%'}
            value={data.postalCode}
            onChangeText={text => setData({...data, postalCode: text})}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => AddressUpdateInfo()}>
          <Text style={styles.butText}> Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default UserInfo;
