/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { getDonationList, GetProfilePic } from '../../utils/api';
import { useIsFocused } from '@react-navigation/native';
import {
  Donations_list_Card,
  SearchBar,
  TopBarcard,
} from '../../components';
import { styles } from './styles';
import { allTexts, colors } from '../../common';
import { Loader } from '../../components';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import { FlatList } from 'react-native-gesture-handler';
import { deleteDonations } from '../../utils/api';
const DonationsList = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(apiData);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiProfile, setApiprofile] = useState([]);
  const { data, message } = route.params || {};
  // console.log('data.id', data);
  const isFocused = useIsFocused();

  const DonationListApi = async () => {
    setLoader(true);
    try {
      let id = data?.jtProfile;
      // console.log('id', id)
      let result = await getDonationList(id, 0, 60);
      // console.log('data in donation list', result?.data);
      let donationDTO = result?.data?.data;
      console.log("bjfbhjfbhj", donationDTO?.length)
      setApiData(donationDTO);
        setLoader(false);
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
  const DeleteDonations = async (id) => {
    Alert.alert('Success', 'Are you sure you want to delete this donation ?', [
      {
        text: 'Yes',
        onPress: async () => {
          Del(id)
        }
      },
      {
        text: 'No',
      }
    ]);
  }
const Del = async (id) => {
  console.log('id', id)
  let result = await deleteDonations(id);
  if (result?.status === 200) {
    console.log('0000000000000000000000')
    DonationListApi();
  } else{
    alert('some thing went wrong')
  }
}
useEffect(() => {
  if (message === 200 || message === undefined || isFocused) {
    async function prepare() {
      try {
        new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        DonationListApi();
      }
    }
    prepare();
    
  }
}, [isFocused]);
  // console.log('display data', apiData);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ minHeight: '18.5%', marginTop: '3%' }}>
          <TopBarCard2
            txt={'Donation List'}
            back={true}
            navigation={navigation}
            navMenu={navigation}>
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.donations, {
                    data: data,
                  })
                }
                style={styles.plusContainer}>
                <FeatherIcon
                  style={styles.plusIcon}
                  name="plus"
                  size={30}
                  color={colors.orangeColor}
                />
              </TouchableOpacity>
            </View>
          </TopBarCard2>
        </View>
      </View>
      <View style={styles.bodyContainer}>

        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            searchedText === '' && apiData?.length ? (
              <FlatList
                data={apiData}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={item => item?.id?.toString()}
                renderItem={({ item, index }) => (
                  <Donations_list_Card data={item} navigation={navigation} onPressDel={() => DeleteDonations(item?.id)} />
                )}
              />
            ) : (
              <View style={{ alignItems: 'center', marginTop: '60%'}}>
                <Text style={{ color: colors.orangeColor, fontSize: 15}}> No donations to display</Text>
              </View>
            ))}
        </View>
        {searchedText && filteredData?.length > 0 ? (
          <Donations_list_Card data={filteredData} />
        ) : (
          loader ? (
            <Loader size={'small'} color={colors.orangeColor} />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                No donations Yet
              </Text>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};
export default DonationsList;
