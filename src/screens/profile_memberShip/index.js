/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
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


const ProfileMembership = ({ route, navigation }) => {
  const { id, roleId } = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);

  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(0, 100);
      console.log('res', result?.data?.data);
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
  useEffect(() => {
    MembershipData();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <BackHeaderNew
            txt={'Member'}
            isArrrow={true}
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity onPress={() => {
            // navigation.navigate(allTexts.screenNames.in)
            alert('under development');
          }}>
            {roleId !== 'ROLE_ITEM_ADMIN' ? (
              <Text style={styles.joinText}>Join</Text>
            ) : (
              <TouchableOpacity onPress={() => {
                navigation.navigate(allTexts.screenNames.invitationScreen, {
                  navigation: navigation,
                })
              }}>
                {/* <Icon name="pluscircleo" size={24} color={colors.black} /> */}
                <Text style={{fontSize: 20, color: colors.orangeColor, fontWeight: 'bold'}}>Invite</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: '10%'}}>
            {data?.length ? (
              <FollowersListCard3 data={data} />
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
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;
