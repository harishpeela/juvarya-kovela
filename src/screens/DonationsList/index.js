/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {getDonationsList, GetProfilePic} from '../../utils/api';
import {BackHeaderNew, SearchBar} from '../../components';
import {styles} from './styles';
import {colors} from '../../common';
import {Ellipsis} from '../../components';
import {
  BackgroundImage,
  BackHeader,
  Donations_list_Card,
  Sort,
  FollowersListCard3,
  Loader,
} from '../../components';
const DonationsList = ({navigation, route}) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(apiData);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data} = route.params || {};
  const customerProfilePic = async e => {
    // console.log(e?.email, '=================>');
    try {
      let result = await GetProfilePic(e?.email);
      // console.log('result of profile api', result?.data);
      if (result?.data) {
        let responce = {...e, url: result?.data?.url};
        setApiData(array => [...array, responce]);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in profile pic api in donations', error);
    }
  };
  const DonationListApi = async () => {
    try {
      let id = data?.jtProfile;
      let result = await getDonationsList(id, 0, 60);
      // console.log('result', result?.data?.donationDTO);
      let donationDTO = result?.data?.donationDTO;
      donationDTO.map(e => {
        customerProfilePic(e);
      });
      // setApiData(result?.data?.donationDTO);
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
    // console.log(filteredUserData, '==================================>');
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
      <BackgroundImage />
      <View style={styles.followersHeader}>
        <BackHeaderNew
          txt={'Donations'}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        {/* <Ellipsis txtColor={colors.black} /> */}
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
          {/* <View style={styles.sortContainer}>
            <Sort
              style={styles.sort}
              brColor={colors.gray2}
              txtColor={colors.orangeColor}
              srWidth={'100%'}
              // srHeight={"100%"}
            />
          </View> */}
        </View>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.black} />
          ) : (
            <>
              {searchedText === '' && (
                <FlatList
                  style={styles.list}
                  showsVerticalScrollIndicator={false}
                  data={apiData}
                  contentContainerStyle={styles.flatListStyle}
                  keyExtractor={(item, index) => item?.id?.toString()}
                  renderItem={({item}) => (
                    <FollowersListCard3
                      name={item?.email}
                      rs={item?.donation}
                      description={item?.description}
                      img={item?.url}
                      // img={item.user.url}
                      // data={item.user}
                      // donation={item.user.donation}
                    />
                  )}
                />
              )}

              {searchedText && filteredData?.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.list}
                  data={filteredData}
                  contentContainerStyle={styles.flatListStyle}
                  keyExtractor={item => item?.id.toString()}
                  renderItem={({item}) => (
                    <FollowersListCard3
                      name={item?.email}
                      rs={item?.donation}
                      description={item?.description}
                      img={item?.url}
                      // data={item.user}
                      // donation={item.user.donation}
                    />
                  )}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>
                    No such name in donation list
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
