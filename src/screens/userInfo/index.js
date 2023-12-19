import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {styles} from './styles';
import {BackHeaderNew, BackgroundImage, TempleInput} from '../../components';
import {AddressUpdate} from '../../utils/api';
const UserInfo = ({navigation}) => {
  const AddressUpdateInfo = async () => {
    try {
      let result = await AddressUpdate();
      console.log('results of address update', result?.data);
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
              label={'Contact Number'}
              placeholder={'Contact Number'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Address Line 1'}
              placeholder={'Address Line 1'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Address Line 2'}
              placeholder={'Adress Line 2'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Address Line 3'}
              placeholder={'Adress Line 3'}
              width={'100%'}
            />
          </View>
          {/* <View style={styles.subFormElement}> */}
          <TempleInput
            label={'Pincode'}
            placeholder={'Enter Pincode'}
            width={'100%'}
          />
          {/* <TempleInput
              label={'State'}
              placeholder={'Enter State'}
              width={'50%'}
            /> */}
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default UserInfo;
