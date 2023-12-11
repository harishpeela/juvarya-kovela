/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import useFocusEffect from '@react-navigation/native';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  Loader,
  MemberShipCard,
} from '../../components';
import { MemberShipDetails } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';

const ProfileMembership = ({ route, navigation }) => {
  // const { id } = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  // const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [filteredData, setFilteredData] = useState(followersList);


  const data ={
    item:{
      name:"hasrsh"
    }
  }

  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(id);
      console.log('res', result?.data);
      if (result) {
        setaLoader(false);
        setData(result?.data?.memberships);
      } else {
        setaLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setaLoader(false);
      alert(error);
    }
  };
  useEffect(() => {
    MembershipData();
  }, []);
  // useFocusEffect(
  //   useCallback(() => {
  //     MembershipData();
  //     return () => {};
  //   }, []),
  // );
  return (
    <SafeAreaView>
      {/* <BackgroundImage /> */}
      <View style={styles.mainContainer}>

        <View style={styles.header}>
          <BackHeaderNew
            txt={'Members'}
            onPress={() => navigation.goBack()}
          // onPlusPress={() =>
          //   navigation.navigate(allTexts.screenNames.addMembershipDetails)
          // }
          />
          <TouchableOpacity onPress={()=>{
            navigation.navigate(allTexts.screenNames.profilememberships)
          }}>
          <Text style={styles.joinText}>Join</Text>
          </TouchableOpacity>
        </View>
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{marginTop: '10%'}}>
            {data?.length ? (
              <MemberShipCard
                onPress={() => alert('under development')}
                data={data}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}>
                <Text> no memberships for this temple</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;