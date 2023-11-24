/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {getDonationsList} from '../../utils/api';
import {
  BackgroundImage,
  BackHeader,
  Donations_list_Card,
} from '../../components';
const DonationsList = ({navigation, route}) => {
  const [apiData, setApiData] = useState([]);
  const {data} = route.params || {};
  const DonationListApi = async () => {
    try {
      let id = data?.jtProfile;
      let result = await getDonationsList(id, 0, 40);
      console.log('result', result?.data?.donationDTO);
      setApiData(result?.data?.donationDTO);
    } catch (error) {
      console.log('error in donations list api', error);
    }
  };
  useEffect(() => {
    DonationListApi();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View>
        <BackHeader onBackPress={() => navigation.goBack()} />
      </View>
      <View style={{marginBottom: '20%'}}>
        <Donations_list_Card data={apiData} />
      </View>
    </View>
  );
};
export default DonationsList;
