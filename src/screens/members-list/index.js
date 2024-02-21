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
  FollowersListCard4,
  TopBarcard,
} from '../../components';
import { MemberShipList, MembersList } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';
import ApplicationContext from '../../utils/context-api/Context';
const MemberList = ({ route, navigation }) => {
  const { trfdata, roleId } = route.params || {};
  const {userDetails} = useContext(ApplicationContext);
const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [roleType, setRoleType] = useState();
  const [membership, setMemberShipData] = useState();

  const MembershipIdData = async () => {
    // console.log('membershipid', trfdata?.jtProfile);
    setaLoader(true);
    try {
      let result = await MemberShipList(trfdata?.jtProfile, 0, 100);
      console.log('res ==><><<>>', result?.data);
      let data = result?.data?.data;
      let id = data?.filter(item => item)?.map(({id}) => ({id}));
      console.log('jknkjn.kjn.', id)
      if(id){
        setData(id);
        setaLoader(false)
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setaLoader(false);
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
    MembershipIdData();
    Type();
  }, []); 
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
            <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 20, marginLeft: '40%'}}> Members</Text>
            </View>
            {(roleId === 'ROLE_ITEM_ADMIN' || roleType) && (
                <TouchableOpacity style={{marginLeft: '8%'}} onPress={() => {
                  navigation.navigate(allTexts.screenNames.invitationScreen, {
                    roleId: roleId,
                    // id: id,
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
              <FlatList
              data={data}
                keyExtractor={({item, index}) => item?.id}
                renderItem={({item, index}) => (
                  <FollowersListCard4 data={item} navigation={navigation} />
            )}
              />
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
export default MemberList;