/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {getDonationList, GetProfilePic} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import {Donations_list_Card, SearchBar, TopBarcard} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {Loader} from '../../components';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {FlatList} from 'react-native-gesture-handler';
import {deleteDonations} from '../../utils/api';
const DonationsList = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(apiData);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiProfile, setApiprofile] = useState([]);
  const {data, message} = route.params || {};
  console.log('data.id', data);
  const isFocused = useIsFocused();

  const DonationListApi = async () => {
    setLoader(true);
    try {
      let id = data?.jtProfile;
      let result = await getDonationList(id, 0, 60);
      // console.log('data in donation list', result?.data);
      let donationDTO = result?.data?.data;
      console.log('bjfbhjfbhj', donationDTO?.length);
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
  const DeleteDonations = async id => {
    Alert.alert('Are you sure', 'You want to delete this donation ?', [
      {
        text: 'Yes',
        onPress: async () => {
          Del(id);
        },
      },
      {
        text: 'No',
      },
    ]);
  };
  const Del = async id => {
    console.log('id', id);
    let result = await deleteDonations(id);
    console.log('idjhvjhv', result, id, '---->');
    if (result?.status === 200) {
      DonationListApi();
    } else {
      console.log('--00--', result);
      alert('temple admin or admin can delete donation');
    }
  };
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{minHeight: 120, marginTop: '1%', backgroundColor: 'white'}}>
        <TopBarCard2 back={true} navigation={navigation} navMenu={navigation}>
          <View style={styles.searchbarContainer}>
            <SearchBar
              placeHolder={'Search Donation'}
              showCrossPress={true}
              onCrossPress={() => {
                setSearchedText('');
                // getTemples(userDetails?.id, pageNo, 20);
                DonationListApi();
              }}
              onTextChange={e => {
                setSearchedText(e);
                handleSearch(e);
              }}
              value={searchedText}
              loading={false}
            />
          </View>
          <View>
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
                size={27}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </TopBarCard2>
      </View>
      <View>
        <View style={styles.followersContainer}>
          {loader ? (
            <View style={{marginTop: '50%'}}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : searchedText === '' && apiData?.length ? (
            <FlatList
              data={apiData}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item, index}) => (
                <Donations_list_Card
                  data={item}
                  navigation={navigation}
                  onPressDel={() => DeleteDonations(item?.id)}
                />
              )}
            />
          ) : (
            <View style={{alignItems: 'center', marginTop: '60%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontWeight: 'Normal',
                  color: colors.orangeColor,
                  fontSize: 16,
                }}>
                {' '}
                No Donations To Display
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DonationsList;
