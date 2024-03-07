import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { getDonationList, deleteDonations } from '../../utils/api';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Donations_list_Card, SearchBar, TopBarcard } from '../../components';
import { styles } from './styles';
import { allTexts, colors } from '../../common';
import { Loader } from '../../components';
import FeatherIcon from 'react-native-vector-icons/Feather';

const DonationsList = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [apiData, setApiData] = useState([]);
  const { data, message } = route.params || {};
  const isFocused = useIsFocused();
  const nav = useNavigation();

  const DonationListApi = async () => {
    setLoader(true);
    try {
      let id = data?.jtProfile;
      let result = await getDonationList(id, 0, 60);
      let donationDTO = result?.data?.data;
      setApiData(donationDTO);
      setLoader(false);
    } catch (error) {
      console.log('error in donations list api', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (message === 200 || message === undefined || isFocused) {
      DonationListApi();
    }
  }, [isFocused, message]);

  const DeleteDonations = async id => {
    Alert.alert('Are you sure', 'You want to delete this donation?', [
      {
        text: 'Yes',
        onPress: async () => {
          const result = await deleteDonations(id);
          if (result?.status === 200) {
            nav.emit('donationCreated'); // Emit event after successful deletion
          } else {
            console.log('Error deleting donation:', result);
            alert('Temple admin or admin can delete donation');
          }
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const handleSearch = query => {
    const filteredUserData = apiData?.filter(item =>
      item?.name?.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchedText(query);
    setApiData(filteredUserData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Your UI code here */}
    </SafeAreaView>
  );
};

export default DonationsList;
