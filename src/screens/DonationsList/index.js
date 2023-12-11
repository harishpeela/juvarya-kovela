/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getDonationsList, GetProfilePic} from '../../utils/api';
import {BackHeaderNew, SearchBar} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {BackgroundImage, FollowersListCard3, Loader} from '../../components';
const DonationsList = ({navigation, route}) => {
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(apiData);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data} = route.params || {};
  const customerProfilePic = async e => {
    try {
      let result = await GetProfilePic(e?.email);
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
      let donationDTO = result?.data?.donationDTO;
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
      <BackgroundImage />
      <View style={styles.followersHeader}>
        <BackHeaderNew
          txt={'Donations'}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
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
                      />
                    )}
                  />
                ) : (
                  ''
                ))}

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
                    />
                  )}
                />
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
      <TouchableOpacity
        onPress={() => navigation.navigate(allTexts.screenNames.donations)}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '30%',
          width: '40%',
          alignItems: 'center',
          padding: 10,
          backgroundColor: colors.red6,
          borderRadius: 20,
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Add Donation
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default DonationsList;