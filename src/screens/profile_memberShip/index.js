/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {BackHeaderNew, Loader, MemberShipCard} from '../../components';
import {MemberShipDetails} from '../../utils/api';
import {styles} from './styles';
import {colors, allTexts} from '../../common';
const ProfileMembership = ({route, navigation}) => {
  const {id} = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);

  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(0, 100);
      console.log('resssss', result?.data);
      let responce = result?.data?.data;
      if (responce) {
        let dataList = responce
          ?.filter(item => item)
          .map(({membershipDto, loggedInUser, membershipId}) => ({
            membershipDto,
            loggedInUser,
            membershipId,
          }));
        console.log('dayta of members list', dataList);
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
  const onSelect = data => {
    // setIsLiked(data?.selected);
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
      <BackgroundImage />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <BackHeaderNew
            txt={'Members'}
            isArrow={true}
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate(allTexts.screenNames.in)
              alert('under development');
            }}>
            {roleId !== 'ROLE_ITEM_ADMIN' ? (
              <Text style={styles.joinText}>Join</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(allTexts.screenNames.invitationScreen, {
                    navigation: navigation,
                    roleId: roleId,
                    onSelect: onSelect,
                  });
                }}>
                {/* <Icon name="pluscircleo" size={24} color={colors.black} /> */}
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.orangeColor,
                    fontWeight: 'bold',
                  }}>
                  Invite
                </Text>
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
