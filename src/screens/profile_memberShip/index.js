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
import { MemberShipDetails, MembersList } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';
import ApplicationContext from '../../utils/context-api/Context';
const ProfileMembership = ({ route, navigation }) => {
  const { id, roleId } = route.params || {};
  console.log('id====', id);
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
      let result = await MembersList( id ,0, 100);
      console.log('res=====>', result?.data);
      let responce = result?.data?.data;
      if (responce) {
        let dataList = responce.filter(item => item).map(({ invitedCustomer, membershipDto, membershipId }) => ({ membershipDto, invitedCustomer, membershipId }));
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
    if (roleAdmin) {
      setRoleType(roleAdmin);
    } else{
      setRoleType(roleAdmin);
    }
  };
  useEffect(() => {
    MembershipData();
    Type();
  }, []); 
  console.log('data in memberslist', data);
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Ionicons
                name="caret-back-circle"
                size={36}
                color={'#ffffff'}
                style={{ alignSelf: 'flex-start', justifyContent: 'center' }}
              />
            </TouchableOpacity>
            <View>
            <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 20, marginLeft: '35%'}}> Members List</Text>
            </View>
            {(roleId === 'ROLE_ITEM_ADMIN' || roleType) && (
                <TouchableOpacity style={{marginLeft: '10%'}} onPress={() => {
                  navigation.navigate(allTexts.screenNames.invitationScreen, {
                    roleId: roleId,
                    id: id,
                  })
                }}>
                  <Text style={{ fontSize:20,fontWeight:'bold', color: colors.white}}>Invite</Text>
                </TouchableOpacity>
              )}
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