/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ProfileMembershipsData} from '../../utils/api';
import {
  BackHeaderNew,
  Donations_list_Card,
  SearchBar,
  TopBarcard,
} from '../../components';
import { styles } from './styles';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Loader } from '../../components';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import { ProfileMembershipCard } from '../../components/profileMembershipCard';

const ProfileMyMemberships = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [allUserMyMemberships, setAllUserMemberships] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = route.params || {};

  const MyMembershipsData = async () => {
    setLoader(true);
    let result = await ProfileMembershipsData();
    // console.log('result.date ====kkknn>', result?.data);
    if (result) {
      setAllUserMemberships(result?.data);
      setLoader(false);
    } else {
      setAllUserMemberships([]);
      setLoader(false);
    }
  };
  useEffect(() => {
    MyMembershipsData();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'white'}}>
      <View>
        <View style={{ minHeight: '15%', marginTop: '3%' }}>
          <TopBarCard2
            txt={'Memberships'}
            back={true}
            navigation={navigation}
            navMenu={navigation}
            marginLeft={'19%'}>
            <View style={styles.searchContainer}>
            </View>
          </TopBarCard2>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : searchedText === '' && allUserMyMemberships.length > 0 ? (
            <FlatList
                data={allUserMyMemberships}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={({ item, index }) => index}
                style={{}}
                renderItem={({ item, index }) => (
                  <ProfileMembershipCard data={item} navigation={navigation} />
                )}
              />
          ) : (
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '60%' }}>
              <AntDesign  style={{marginBottom:'5%'}} name="idcard" size={50} color={colors.orangeColor} />
              <Text style={{ color: colors.orangeColor, fontSize: 15, fontFamily: 'Poppins-Medium' }}>
                No Memberships To Display
              </Text>
            </View>
          )}
        </View>
        {searchedText && filteredData?.length > 0 ? (
          <Donations_list_Card data={filteredData} />
        ) : loader ? (
          <Loader size={'small'} color={colors.orangeColor} />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              No Donations Yet
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileMyMemberships;
