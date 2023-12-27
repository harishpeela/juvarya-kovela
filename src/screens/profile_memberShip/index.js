/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import useFocusEffect from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  Loader,
  FollowersListCard3,
} from '../../components';
import { MemberShipDetails } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';
import Icon from 'react-native-vector-icons/AntDesign';

const ProfileMembership = ({ route, navigation }) => {
  const { id, roleId } = route.params || {};
  console.log('roleid', roleId);

  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [filteredData, setFilteredData] = useState();

  const DataApi = [
    {
      id: 1,
      customerID: 19,
      membershipId: 8,
      membershipDto: {
        id: 8,
        name: 'BASIC',
        profileId: 88,
        type: 'BASIC',
      },
      loggedInUser: {
        id: 19,
        email: 'syamala.pacharla@juvarya.com',
        firstName: 'syamala pacharla',
        roles: ['ROLE_USER', 'ROLE_ADMIN'],
        customerProfileUrl:
          'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1702035902920krishna.png',
        primaryContact: '8888888888',
      },
    },
    {
      id: 2,
      customerID: 19,
      membershipId: 8,
      membershipDto: {
        id: 8,
        name: 'BASIC',
        profileId: 88,
        type: 'BASIC',
      },
      loggedInUser: {
        id: 19,
        email: 'syamala.pacharla@juvarya.com',
        firstName: 'syamala pacharla',
        roles: ['ROLE_USER', 'ROLE_ADMIN'],
        customerProfileUrl:
          'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1702035902920krishna.png',
        primaryContact: '8888888888',
      },
    },
    {
      id: 3,
      customerID: 19,
      membershipId: 8,
      membershipDto: {
        id: 8,
        name: 'BASIC',
        profileId: 88,
        type: 'BASIC',
      },
      loggedInUser: {
        id: 19,
        email: 'syamala.pacharla@juvarya.com',
        firstName: 'syamala pacharla',
        roles: ['ROLE_USER', 'ROLE_ADMIN'],
        customerProfileUrl:
          'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1702035902920krishna.png',
        primaryContact: '8888888888',
      },
    },
    ,
  ];
const Split = () => {
  let result = DataApi;
  let dataList = result.filter(item => item).map(({membershipDto, loggedInUser, membershipId}) => ({membershipDto, loggedInUser, membershipId}));
  console.log('dayta of members list', dataList);
  setData(dataList);
};

  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(0, 100);
      console.log('res', result?.data);
      let responce = result?.data?.data;
      if (responce) {
        let dataList = responce.filter(item => item).map(({membershipDto, loggedInUser, membershipId}) => ({membershipDto, loggedInUser, membershipId}));
        console.log('dayta of members list', dataList);
        setaLoader(false);
        setData(dataList);
      } else {
        setaLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setaLoader(false);
      alert(error);
    }
  };
  console.log('data', data);
  useEffect(() => {
    MembershipData();
    // Split();
  }, []);
  return (
    <SafeAreaView>
      {/* <BackgroundImage /> */}
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <BackHeaderNew
            txt={'Members'}
            isArrrow={true}
            onPress={() => navigation.navigate(allTexts.screenNames.profilememberships, {
              roleId: roleId,
            })}
          // onPlusPress={() =>
          //   navigation.navigate(allTexts.screenNames.addMembershipDetails)
          // }
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(allTexts.screenNames.profilememberships);
            }}>
            {!roleId ? (
              <>
              </>
            ) : (
              <TouchableOpacity onPress={() => {
                navigation.navigate(allTexts.screenNames.invitationScreen, {
                  roleId: roleId,
                })
              }}>
                {/* <Icon name="pluscircleo" size={24} color={colors.black} /> */}
                <Text style={{fontSize: 20, color: colors.orangeColor}}>Invite</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{marginTop: '10%'}}>
            {data?.length ? (
              <FollowersListCard3 data={data} navigation={navigation} />
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