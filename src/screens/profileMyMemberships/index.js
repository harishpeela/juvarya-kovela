/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { getDonationsList, GetProfilePic } from '../../utils/api';
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

const DonationsList = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = route.params || {};

  const customerProfilePic = async e => {
    try {
      let result = await GetProfilePic(e?.email);
      if (result?.status === 200) {
        let responce = { ...e, url: result?.data?.url };
        if (responce) {
          setApiData(array => [...array, responce]);
          setLoader(false);
        } else {
          console.log('eeeeee', e);
          setLoader(false);
        }
      } else {
        console.log('e state', e);
        setLoader(false);
      }
    } catch (error) {
      console.log('error in profile pic api in donations', error);
    }
  };

  const DonationListApi = async () => {
    setLoader(true);
    try {
      let id = data?.jtProfile;
      let result = await getDonationsList(id, 0, 60);
      let donationDTO = result?.data?.data;
      if (donationDTO) {
        donationDTO.map(e => {
          customerProfilePic(e);
        });
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in donations list api', error);
      setLoader(false);
    }
  };

  const handleSearch = query => {
    setLoading(true);
    const filteredUserData = apiData?.filter(item =>
      item?.name?.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filteredUserData);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    DonationListApi();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ minHeight: '15%', marginTop: '3%' }}>
          <TopBarCard2
            txt={'User Donations'}
            back={true}
            navigation={navigation}
            navMenu={navigation}>
            <View style={styles.searchContainer}>
            </View>
          </TopBarCard2>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : searchedText === '' && apiData.length > 0 ? (
            <Donations_list_Card data={apiData} navigation={navigation} />
          ) : (
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50%' }}>
              <Text style={{ color: colors.orangeColor, fontSize: 15, fontFamily: 'Poppins-Medium' }}>
                No donations to display
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
              No donations Yet
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DonationsList;
