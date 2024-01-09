/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useFocusEffect from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  Loader,
  FollowersListCard3,
  TopBarcard,
} from '../../components';
import { MemberShipDetails } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';
import ApplicationContext from '../../utils/context-api/Context';
const ProfileMembership = ({ route, navigation }) => {
  const { id, roleId } = route.params || {};
  const {userDetails} = useContext(ApplicationContext);
const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [roleType, setRoleType] = useState();

  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(0, 100);
      console.log('res', result?.data);
      let responce = result?.data?.data;
      if (responce) {
        let dataList = responce.filter(item => item).map(({ membershipDto, loggedInUser, membershipId }) => ({ membershipDto, loggedInUser, membershipId }));
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
  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    console.log('role===>', roleAdmin);
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    }
  };
  useEffect(() => {
    MembershipData();
    Type();
  }, []);
  console.log('roleid', roleId, roleType);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
              <Ionicons
                name="caret-back-circle"
                size={36}
                color={'#ffffff'}
                style={{ alignSelf: 'flex-start', justifyContent: 'center' }}
              />
            </TouchableOpacity>
            <View>
            <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 20,paddingRight:'10%'}}> Memberships</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(allTexts.screenNames.profilememberships);
              }}>
              {roleId || roleType  && (
                <TouchableOpacity onPress={() => {
                  navigation.navigate(allTexts.screenNames.invitationScreen, {
                    roleId: roleId,
                  })
                }}>
                  {/* <Icon name="pluscircleo" size={24} color={colors.black} /> */}
                  <Text style={{ fontSize:20,fontWeight:'bold', color: colors.white }}>Invite</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{ marginTop: '10%' }}>
            {data?.length ? (
              <FollowersListCard3 data={data} navigation={navigation} />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}>
                <Text style={{color: isDarkMode ? 'black' : 'black'}}> no memberships for this temple</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;