/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { ProfileDonationsData} from '../../utils/api';
import {
  ProfileDonationsCard,
} from '../../components';
import { styles } from './styles';

import { allTexts, colors } from '../../common';
import { Loader } from '../../components';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UserProfileDonationsData = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [allUserProfileDonationData, setAllUserProfileDonationData] = useState('');
  const { data } = route.params || {};

  const MyDonationsData = async () => {
    setLoader(true);
    let result = await ProfileDonationsData();
    console.log('result.date ====kkknn>', result?.data);
    if (result) {
      setAllUserProfileDonationData(result?.data);
      setLoader(false);
    } else {
      setAllUserProfileDonationData([]);
      setLoader(false);
    }
  };
  useEffect(() => {
    MyDonationsData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
        <View style={{ minHeight: '15%', marginTop: '3%' }}>
          <TopBarCard2
            txt={'My Donations'}
            back={true}
            navigation={navigation}
            navMenu={navigation}>
            <View style={styles.searchContainer}>
            </View>
          </TopBarCard2>
        </View>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : searchedText === '' && allUserProfileDonationData?.length > 0 ? (
            <FlatList
                data={allUserProfileDonationData}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={({ item, index }) => index}
                style={{marginBottom: '35%'}}
                renderItem={({ item, index }) => (
                  <ProfileDonationsCard data={item} navigation={navigation} />
                )}
              />
          ) : (
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '60%' }}>
                <FontAwesome5
                  name="donate"
                  size={50}
                  color={'orange'}
                  style={{marginBottom:'5%'}}
                 
                />
              <Text style={{ color: colors.orangeColor, fontSize: 15, fontFamily: 'Poppins-Medium' }}>
                No Donations To Display
              </Text>
            </View>
          )}
        </View>
    </View>
  );
};

export default UserProfileDonationsData;
