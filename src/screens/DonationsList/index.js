/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {getDonationsList, GetProfilePic} from '../../utils/api';
import {BackHeaderNew, Donations_list_Card, SearchBar, TopBarcard} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Loader} from '../../components';
import FeatherIcon from 'react-native-vector-icons/Feather';

const DonationsList = ({navigation, route}) => {
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(apiData);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data} = route.params || {};
  // console.log('data.id', data);
  const customerProfilePic = async e => {
    // console.log('e', e.email);
    try {
      let result = await GetProfilePic(e?.email);
      // console.log('profilepic', result?.data);
      if (result?.data) {
        let responce = {...e, url: result?.data?.url};
        // console.log('responce', responce);
        setApiData(array => [...array, responce]);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in profile pic api in donations', error);
    }
  };
  console.log('dislay data', apiData);
  const DonationListApi = async () => {
    try {
      let id = data?.jtProfile;
      let result = await getDonationsList(id, 0, 60);
      console.log('data', result?.data);
      let donationDTO = result?.data?.data;
      console.log('list of donations', donationDTO);
      donationDTO.map(e => {
        customerProfilePic(e);
      });
    } catch (error) {
      console.log('error in donations list api', error);
      setLoader(false);
    }
  };
  const handleSearch = query => {
    setLoading(true);
    const filteredUserData = apiData?.filter(item =>
      item?.email?.toLowerCase().includes(query.toLowerCase()),
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View>
      <View style={{minHeight: 160, marginTop: '3%'}}>
      <TopBarcard txt={'Donation List'} back={true}  navigation={navigation} navMenu={navigation}>
      <View style={styles.searchContainer}>
      <SearchBar
              value={searchedText}
              onTextChange={text => {
                setSearchedText(text);
                handleSearch(text);
              }}
              loading={loading}
              onCrossPress={() => {
                setSearchedText('');
                setFilteredData([]);
              }}
              placeHolder={'Search here'}
              style={styles.customSearch}
              showCrossPress={true}
              bgColor={colors.white}
              brColor={colors.gray2}
              brWidth={1}
            />
              <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.donations, {
                data: data,
              })} style={styles.plusContainer}>
                <FeatherIcon style={styles.plusIcon} name="plus" size={30} color= {colors.orangeColor} />
              </TouchableOpacity>
      </View>
      </TopBarcard>
      </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchAndFilter}>
          <View style={styles.searchContainer}>
           
          </View>
        </View>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.black} />
          ) : (
            <>
              {searchedText === '' &&
                (apiData?.length ? (
                  <Donations_list_Card data={apiData} />
                ) : (
                  ''
                ))}
 
              {searchedText && filteredData?.length > 0 ? (
                <Donations_list_Card data={filteredData} />
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>
                    No items in donation list
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DonationsList;
 