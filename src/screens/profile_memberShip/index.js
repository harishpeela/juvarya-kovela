/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  Loader,
  FollowersListCard3,
} from '../../components';
import { MemberShipDetails } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';
import Icon from "react-native-vector-icons/AntDesign"
import { useFocusEffect } from '@react-navigation/native';


const ProfileMembership = ({ route, navigation, roleId }) => {
  const { id } = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [filteredData, setFilteredData] = useState();

  console.log("profilememberShips roleId displaying =>>>>>>>" + roleId)

  const data2 = [
    {
      id: 1,
      name: 'hasrsh',
      type: 'BASIC',
    },
    {
      id: 2,
      name: 'mahesh',
      type: 'AVERAGE',
    },
    {
      id: 3,
      name: 'mahesh',
      type: 'PREMIUM',
    },
  ];
  // useFocusEffect is used here to run the effect only when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
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
      }
      MembershipData();
    }, [])
  );
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <BackHeaderNew
            txt={'Members'}
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity onPress={() => {
            navigation.navigate(allTexts.screenNames.profilememberships)
          }}>
            {roleId !== 'ROLE_ITEM_ADMIN' ? (
              <Text style={styles.joinText}>Join</Text>
            ) : (
              <TouchableOpacity onPress={() => {
                navigation.navigate(allTexts.screenNames.memberShip, {
                  navigation: navigation,
                })
              }}>
                <Icon name="pluscircleo" size={24} color={colors.black} />
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
            {flatData?.length ? (
              // <FollowersListCard3
              //   onPress={() => alert('under development')}
              //   data={flatData}
              // />
              <FollowersListCard3 data={flatData} />

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
