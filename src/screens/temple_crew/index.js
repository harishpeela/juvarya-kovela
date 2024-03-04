/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ApplicationContext from '../../utils/context-api/Context';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Loader, FollowersListCard4} from '../../components';
import {colors, allTexts} from '../../common';
import {styles} from './styles';
import { useIsFocused } from '@react-navigation/native';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {MemberShipList, MembersList, getArtistDonar} from '../../utils/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ioniconss from 'react-native-vector-icons/Entypo';
const TempleCrew = ({route, navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loader, setLoader] = useState(false);
  const [noTextLoader, setTextLoader] = useState(false);
  const {id, message} = route.params || {};
  const [data, setData] = useState([]);
  const [donationData, setDonationData] = useState();
  const [roleType, setRoleType] = useState();
  const [membershipId, setMemberShipId] = useState();
  const [artistData, setArtistData] = useState();
  const isFocused = useIsFocused();
  const [apiNo, setApiNo] = useState(0)

  const MembershipIdData = async () => {
    setLoader(true);
    setTextLoader(true);
    try {
      let result = await MemberShipList(id, 0, 100);
      console.log('list data', result?.data)
      let data = result?.data?.data;
      setMemberShipId(data[0]?.id);
      let ID = data?.filter(item => item)?.map(({id}) => ({id}));
      if (ID) {
        setData(ID);
        setLoader(false);
        setTextLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setLoader(false);
      setTextLoader(false);
    }
  };
  const MembershipData = async memId => {
    setTextLoader(true);
    console.log('data>id', memId?.id);
    try {
      let result = await MembersList(memId?.id, 0, 10);
      let responce = result?.data;
      if (responce) {
        setDonationData(responce);
        setTextLoader(false);
      } else {
        setDonationData(undefined);
        setTextLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setTextLoader(false);
      alert(error);
    }
  };
  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    if (roleAdmin) {
      setRoleType(roleAdmin);
    } else {
      setRoleType(roleAdmin);
    }
  };

  const artistDonar = async () => {
    let responce = await getArtistDonar(id, 0, 100);
    console.log('responce odf artist', responce?.data);
    if (responce?.status === 200) {
      setArtistData(responce?.data);
    } else {
      setArtistData([]);
    }
  };

  useEffect(() => {
    Type();
    artistDonar();
  }, []);
  useEffect(() => {
    if (message === 200 || message === undefined || isFocused) {
      async function prepare() {
        try {
          new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
          MembershipIdData();
        }
      }
      prepare();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      if (apiNo >= 0) {
        artistDonar();
      }
      return () => {};
    }, [])
  );

  return (
    <View style={{backgroundColor: 'white',marginTop:'5%'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle"
            size={39}
            color={colors.orangeColor}
            style={{alignSelf: 'flex-start', justifyContent: 'center',marginLeft:10}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: colors.orangeColor,
              fontWeight: 'normal',
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              marginLeft: '40%',
            }}>
            {' '}
            Members
          </Text>
        </View>
        <TouchableOpacity
          style={{marginLeft: '5%'}}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.invitationScreen, {
              membershipId: membershipId ? membershipId : '',
              id: id,
            });
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'normal',
              fontFamily: 'Poppins-Medium',
              color: colors.orangeColor,
            }}>
            Invite
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: '5%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() =>navigation.navigate(allTexts.screenNames.artistDonorScreen,{id:id})}
              style={{
                height: 70,
                width: 70,
                borderRadius: 100 / 2,
                borderWidth: 2,
                margin: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.orangeColor,
              }}>
              <Ioniconss name="plus" size={25} color={colors.orangeColor} />
            </TouchableOpacity>
            <Text style={{color: 'black'}}> 2025</Text>
          </View>

          {artistData?.length && (
            <>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 100 / 2,
                    borderWidth: 2,
                    flexDirection: 'row',
                    overflow: 'hidden',
                    margin: 2,
                    borderColor: colors.orangeColor,
                  }}>
                  <Image
                    source={{
                      uri: artistData[0]?.artistDto?.artist?.customerProfileUrl
                        ? artistData[0]?.artistDto?.artist?.customerProfileUrl
                        : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
                    }}
                    height={60}
                    width={30}
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 100 / 2,
                      overflow: 'hidden',
                      marginRight: 2,
                    }}
                  />
                </TouchableOpacity>

                <Text style={{color: 'black'}}>
                  {artistData[0]?.year?.substring(6, 11)}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 100 / 2,
                    borderWidth: 2,
                    flexDirection: 'row',
                    overflow: 'hidden',
                    margin: 2,
                    borderColor: colors.orangeColor,
                  }}>
                  <Image
                    source={{
                      uri: artistData[0]?.donarDto?.donar?.customerProfileUrl
                        ? artistData[0]?.donarDto?.donar?.customerProfileUrl
                        : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
                    }}
                    height={60}
                    width={30}
                    style={{
                      height: 65,
                      width: 65,
                      overflow: 'hidden',
                      marginRight: 2,
                      borderRadius: 100 / 2,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{color: 'black'}}>
                  {' '}
                  {artistData[0]?.year?.substring(6, 11)}
                </Text>
              </View>
            </>
          )}
          {artistData?.length && (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    allTexts.screenNames.artistdonardetailslist,
                    {
                      data: artistData,
                      id: id
                    },
                  )
                }
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '30%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.orangeColor,
                    fontSize: 16,
                  }}>
                  {' '}
                  See all
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={{height: '80%'}}>
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{marginTop: '10%'}}>
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
                <Text style={{color: colors.orangeColor}}>
                  {' '}
                  No Members For This Temple
                </Text>
              </View>
            )}
          </View>
        )}
        {/* {noTextLoader ? (
          <View>
            <Loader size={'small'} color={colors.white} />
          </View>
        ) : donationData?.data == undefined ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50%',
            }}>
            <Text style={{color: colors.orangeColor}}>
              {' '}
              No dMembers For This Temple
            </Text>
          </View>
        ) : (
          ''
        )} */}
      </View>
    </View>
  );
};
export default TempleCrew;
