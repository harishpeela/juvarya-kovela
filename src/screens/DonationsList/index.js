/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {getDonationsList, GetProfilePic} from '../../utils/api';
import {BackHeaderNew, Donations_list_Card, SearchBar} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Loader} from '../../components';
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
      <View style={styles.followersHeader}>
        <BackHeaderNew
          isArrow={true}
          txt={'Donations'}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(allTexts.screenNames.donations)}>
          <AntDesign name="plus" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchAndFilter}>
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
                  // <FlatList
                  //   style={styles.list}
                  //   showsVerticalScrollIndicator={false}
                  //   data={apiData}
                  //   contentContainerStyle={styles.flatListStyle}
                  //   keyExtractor={(item, index) => item?.id?.toString()}
                  //   renderItem={({item}) => (
                  //     <Donations_list_Card
                  //       data={item}
                  //       // name={item?.email}
                  //       // rs={item?.donation}
                  //       // description={item?.description}
                  //       // img={item?.url}
                  //     />
                  //   )}
                  // />
                  ''
                ))}

              {searchedText && filteredData?.length > 0 ? (
                <Donations_list_Card data={filteredData} />
              ) : (
                // <FlatList
                //   showsVerticalScrollIndicator={false}
                //   style={styles.list}
                //   data={filteredData}
                //   contentContainerStyle={styles.flatListStyle}
                //   keyExtractor={item => item?.id.toString()}
                //   renderItem={({item}) => (
                //     <Donations_list_Card
                //       name={item?.email}
                //       rs={item?.donation}
                //       description={item?.description}
                //       img={item?.url}
                //     />
                //   )}
                // />
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
