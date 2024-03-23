/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {getNewArtist} from '../../utils/api';
import {EventInput, PrimaryButton} from '../../components';
import {colors} from '../../common';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {statusBarHeight} from '../../utils/config/config';
const AddArtist = ({navigation, route}) => {
  const {id} = route.params || {};
  console.log('id ==', id);
  const [mobNum, setMobNum] = useState('');
  const [associationYear, setAssociationYear] = useState( );

  const getArtist = async () => {
    const payload = {
      profileId: id,
      primaryContact: mobNum,
      associationYear: associationYear,
    };
    console.log('payload', payload);
    try {
      let result = await getNewArtist(payload);
      console.log('result', result?.data);
      if (result.status === 200) {
        Alert.alert('Submitted Successfully !!!!!');
      } else {
        alert('something went wrong');
      }
    } catch (error) {
      console.log('error in add artist screen', error);
      alert('something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{height: 60, marginTop: statusBarHeight}}>
        <TopBarCard2 txt={'Add Artist'} back={true} navigation={navigation} />
      </View>
      <View style={{marginTop: '25%'}}>
        <EventInput
          lable={'Mobile Number '}
          placeholder={'Enter Mobile Number'}
          height={50}
          onChangeText={e => setMobNum(e)}
          keyboardType={'numeric'}
          maxLength={10}
        />
        <EventInput
          lable={'Year'}
          placeholder={'DD-MM-YYYY'}
          onChangeText={e => setAssociationYear(e)}
          calendar={true}
        />
        <View style={{width: 200, alignSelf: 'center', marginTop: 20}}>
          <PrimaryButton
            text={'Submit'}
            bgColor={colors.orangeColor}
            onPress={() => getArtist()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default AddArtist;
