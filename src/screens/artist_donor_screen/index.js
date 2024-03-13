import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../common';
import SelectDropdown from 'react-native-select-dropdown';
import { EventInput } from '../../components/eventCreateInput';
import { PrimaryButton } from '../../components';
import { getNewArtist , getNewDonor} from '../../utils/api';

 function ArtistForm({id}) {
   
  const [email, setEmail] = useState(' ');
  const [associationYear, setAssociationYear] = useState(' ');
  
  const getArtist = async () => {
    const payload = {
      profileId:id,
      email: email,
      associationYear:associationYear};
   
    const result = await getNewArtist(payload);
    console.log('result',result?.data)
    if (result.status === 200) {
      Alert.alert('Submitted Successfully !!!!!');
    } else {
      console.log('something went wrong');
    }
  };
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <View style={{marginTop:'35%'}}>
          <EventInput
            lable={'Email '}
            placeholder={'Enter Email'}
            height={50}
            onChangeText={(e) => setEmail(e)}
          />
          <EventInput
            lable={'Year'}
            placeholder={'Please Enter Year'}
            onChangeText={(e) => setAssociationYear(e)}
            calendar={true}
          />
          <View style={{ width: 200, alignSelf: 'center', marginTop: 20 }}>
            <PrimaryButton
              text={'Submit'}
              bgColor={colors.orangeColor}
              onPress={() =>getArtist()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
  
  function DonorForm({id, navigation}) {
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState(' ');
    const [profileId, setProfileId] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [associationYear, setAssociationYear] = useState(' ');

    const getDonor = async () => {
      const payload = {
        name:name,
        profileId:id,
        email: email,
        associationYear:associationYear};
  
        const result = await getNewDonor(payload);
      console.log('result',result?.data)
      if (result?.status === 200) {
        // Alert.alert(result?.data?.message || 'Donar Added');
        Alert.alert('Kovela', result?.data?.message || 'Donar Added', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        alert('something went wrong')
        console.log('something went wrong');
      }
    };
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{marginTop:'35%'}}>
        <EventInput
            lable={'Email '}
            placeholder={'Enter Email '}
            height={50}
            onChangeText={(e) => setEmail(e)}
          />
           <EventInput
            lable={'Name'}
            placeholder={'Enter Name'}
            height={50}
            onChangeText={(e) => setName(e)}
          />
          <EventInput
            lable={'Please Enter Year'}
            placeholder={'DD-MM-YYYY'}
            onChangeText={(e) => setAssociationYear(e)}
            calendar={true}
            // maxLength={4}
          />
          <View style={{ width: 200, alignSelf: 'center', marginTop: 20 }}>
            <PrimaryButton
              text={'Submit'}
              bgColor={colors.orangeColor}
              onPress={() => getDonor()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

export default function ArtistDonorScreen({ navigation,route }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const {id} = route.params || {}
  const roles = [
    { role: 'Artist', form: <ArtistForm id={id}  /> },
    { role: 'Donor', form: <DonorForm id={id} navigation={navigation} /> }
  ];
  
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <TouchableOpacity style={{ marginTop: '10%' }} onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back-circle"
          size={36}
          color={colors.orangeColor}
          style={{ alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 10 }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: colors.orangeColor,
            fontWeight: 'normal',
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            marginLeft: '35%',
            marginTop: '-8%'
          }}>
          {' '}
          Artist/Donor
        </Text>
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 20, marginLeft: '21%' }}>
        <SelectDropdown
          data={roles.map(item => item.role)} 
          onSelect={(selectedItem, index) => setSelectedRole(selectedItem)} 
          defaultButtonText="Select Role"
          buttonStyle={{ backgroundColor: '#FAFAFA', borderRadius: 8 }}
          dropdownStyle={{ marginTop: 2 }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        {selectedRole && roles.find(item => item.role === selectedRole)?.form}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
