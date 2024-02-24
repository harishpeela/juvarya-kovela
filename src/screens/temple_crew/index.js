/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import ApplicationContext from '../../utils/context-api/Context';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Loader, FollowersListCard4} from '../../components';
import {colors, allTexts} from '../../common';
import {styles} from './styles';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {MemberShipList, MembersList, getArtistDonar} from '../../utils/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ioniconss from 'react-native-vector-icons/Entypo';
const TempleCrew = ({route, navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loader, setLoader] = useState(false);
  const [noTextLoader, setTextLoader] = useState(false);
  const {id} = route.params || {};
  const [data, setData] = useState([]);
  const [donationData, setDonationData] = useState();
  const [roleType, setRoleType] = useState();
  const [membershipId, setMemberShipId] = useState();
  const [artistData, setArtistData] = useState();

  const MembershipIdData = async () => {
    // console.log('membershipid', trfdata?.jtProfile);
    setLoader(true);
    setTextLoader(true);
    try {
      let result = await MemberShipList(id, 0, 100);
      console.log('res ==><><<>>', result?.data);
      let data = result?.data?.data;
      let ID = data?.filter(item => item)?.map(({id}) => ({id}));
      console.log('jknkjn.kjn.', ID);
      if (ID) {
        setData(ID);
        setMemberShipId(ID);
        MembershipData(ID[0]?.id);
        setLoader(false);
        setTextLoader(true);
      } else {
        // alert('SomeThing went wrong')
        setLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setLoader(false);
      setTextLoader(true);
    }
  };
  const MembershipData = async memId => {
    setTextLoader(true);
    console.log('data>id', memId);
    try {
      let result = await MembersList(memId, 0, 10);
      let responce = result?.data;
      console.log('===========responce ====>>', responce?.data);
      if (responce) {
        console.log('resssdd', responce);
        setDonationData(responce);
        setTextLoader(false);
      } else {
        console.log('res====>>', responce);
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
    let responce = await getArtistDonar(10, 0, 100);
    console.log('responce odf artist', responce?.data);
    if (responce?.status === 200) {
      setArtistData(responce?.data);
    } else {
      setArtistData([]);
    }
  };

  useEffect(() => {
    MembershipIdData();
    Type();
    artistDonar();
  }, []);

  const infoData = [
    {
      id: 1,
      donarName: '',
      artist: '',
      year: '2024',
      occation: 'dhussera',
      donarPic: '',
      artistPic: '',
    },
    {
      id: 2,
      donarName: 'Anil Adari',
      artist: 'Satya prasad',
      year: '2023',
      occation: 'dhussera',
      donarPic:
        'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
      artistPic:
        'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    },
    {
      id: 3,
      donarName: 'Mahesh doddi',
      artist: 'Sivaji',
      year: '2022',
      occation: 'dhussera',
      donarPic:
        'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
      artistPic:
        'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    },
    // {
    //   id: 4,
    //   donarName: 'siva kumar Dadi',
    //   artist: 'durga naidu',
    //   year: '2021',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',

    // },
    // {
    //   id: 5,
    //   donarName: 'Jagan sai Karri',
    //   artist: 'chiranjeevi',
    //   year: '2020',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    // },
    // {
    //   id: 6,
    //   donarName: 'vamsi chadaram',
    //   artist: 'Prasad',
    //   year: '2019',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    // },
    // {
    //   id: 7,
    //   donarName: 'Jagan sai Karri',
    //   artist: 'chiranjeevi',
    //   year: '2020',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    // },
    // {
    //   id: 8,
    //   donarName: 'vamsi chadaram',
    //   artist: 'Prasad',
    //   year: '2019',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    // },
    // {
    //   id: 9,
    //   donarName: 'Jagan sai Karri',
    //   artist: 'chiranjeevi',
    //   year: '2020',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    // },
    // {
    //   id: 10,
    //   donarName: 'vamsi chadaram',
    //   artist: 'Prasad',
    //   year: '2019',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    // },
  ];
  console.log(donationData, 'jahsbxahbs');
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="caret-back-circle"
            size={36}
            color={colors.orangeColor}
            style={{alignSelf: 'flex-start', justifyContent: 'center'}}
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
              roleId: membershipId?.id ? membershipId[0]?.id : '',
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
            <TouchableOpacity
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
      {/* <View
        style={{
          marginLeft: '5%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
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
          <Text style={{color: 'black'}}> {infoData[0]?.year}</Text>
        </View>
        <FlatList
          data={artistData}
          horizontal
          keyExtractor={({item, index}) => item?.year}
          style={{}}
          renderItem={({item, index}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 100 / 2,
                  // borderWidth: 2,
                  margin: 2,
                  borderColor: colors.orangeColor,
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: item?.artistDto?.artist?.customerProfileUrl
                      ? item?.artistDto?.artist?.customerProfileUrl
                      : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
                  }}
                  height={70}
                  width={70}
                  style={{
                    height: 70,
                    width: 70,
                    overflow: 'hidden',
                    marginRight: 2,
                    borderRadius: 100 / 2,
                  }}
                />
              </TouchableOpacity>
              <Text style={{color: 'black'}}>{item?.year?.substring(6, 11)} </Text>
            </View>
          )}
        />
      </View> */}
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
        {noTextLoader ? (
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
              No Members For This Temple
            </Text>
          </View>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};
export default TempleCrew;
