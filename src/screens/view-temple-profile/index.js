/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  FlatList,
  useColorScheme,
  Modal,
  Pressable,
} from 'react-native';
import {
  Loader,
  ContactModal,
  TempleProfile_PostsCard,
  BackgroundImageAClass,
  BackgroundImageFlower,
  EventCard,
} from '../../components';
import { styles } from './styles';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { allTexts } from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Data } from '../home-feed/formateDetails';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useFocusEffect } from '@react-navigation/native';
import {
  FollowUnFollow,
  NewGetFollowUmFollowById,
  NewFollowCount,
  GetPosts,
  EventList,
  getTopDonation,
  TempleCommunity,
  TempleAddress,
  getProfileEvents,
  getTempleProfileDetails,
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import { ProfileSeconTab, ProfileFourthTab } from '../../components';
import {
  CommunityComp,
  FollowersComp,
  ContactTabcomp,
  CreateFeedTabComp,
  FolloUnfollowComp,
  DirectionsTabComp,
  ProfileTimingTabs,
  Danation_Add_Card,
  TempleCrewTabComp,
} from '../../components';
import { ProfileImage } from '../../components';
import { colors } from '../../common';
import { PostsComp } from '../../components/profilecompnew/postsComp';
import { SearchTempleRoleWithId } from '../../utils/api';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NearByTempleComp from '../../components/NearByTempleComp';
import Entypo from 'react-native-vector-icons/Entypo';
import { useLazyGetNewFollowCountQuery, useLazyGetNewFollowUnFollowByIdQuery, useLazyGetProfileEventsQuery, useLazyGetTempleAddressQuery, useLazyGetTempleCommunityQuery, useLazyGetTempleDetailsQuery, useLazyGetTempleDonationQuery, useLazyGetTemplePostsQuery, useLazySearchTempleRoleWithIdQuery } from '../../redux/services/templeProfileService';

const ViewTempleProfile = ({ route, navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { userDetails } = useContext(ApplicationContext);
  const { data } = route.params;
  const [loader, setloader] = useState(false);
  const [donationLoader, setDonationLoader] = useState(false);
  const [isFollow, setisFollow] = useState();
  const [trfData, setTrfData] = useState();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [followVisible, setFollowVisible] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [postImages, setPostImages] = useState([]);
  const [roleId, setRoleId] = useState();
  const [roleLoader, setRoleLoader] = useState(false);
  const [posts, setPosts] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [isModal, setIsModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [roleType, setRoleType] = useState();
  const [donationValue, setDonationValue] = useState([]);
  const [communityList, setCommunityList] = useState();
  const [templeaddress, setTempleAddress] = useState();
  const [events, setEvents] = useState([]);
  const [tempProfileData, setTempProfileData] = useState();
  const [mainLoader, setMainLoader] = useState(false);

  //RTK Query
  const [getTempleProfile] = useLazySearchTempleRoleWithIdQuery()
  const [getTempleDetails] = useLazyGetTempleDetailsQuery();
  const [getTempleAddress] = useLazyGetTempleAddressQuery();
  const [getTempleCommunity] = useLazyGetTempleCommunityQuery();
  const [getTemplePost] = useLazyGetTemplePostsQuery();
  const [getTempleDonation] = useLazyGetTempleDonationQuery();
  const [getProfileEvents] = useLazyGetProfileEventsQuery()
  const [getNewFollowUnFollowById] = useLazyGetNewFollowUnFollowByIdQuery();
  const [getNewFollowCount] = useLazyGetNewFollowCountQuery()

  const FOLLOW = id => {
    if (isFollow) {
      followTemples(id);
    } else if (!isFollow) {
      followTemples(id);
      setisFollow(!isFollow);
    }
  };

  useEffect(() => {
    if (data) {
      let result = Data(data);
      if (result) {
        setTrfData(result);
        if (result?.jtProfile) {
          // MemberShip(result?.jtProfile);
          templeRoleSearchWithId(result?.jtProfile);
          templeDetails(result?.jtProfile);
          templeAddressDetails(result?.jtProfile);
          CommunityTemple(result?.jtProfile);
          Posts(result?.jtProfile);
          dontationValue(result.jtProfile);
          eventList(result?.jtProfile);
          getFollowValue(result?.jtProfile);
          followingCount(result?.jtProfile);
        }
      }
    }
  }, [data])

  useEffect(() => {
    Type();
  }, []);

  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    var roleAgent = ROLES?.indexOf('ROLE_AGENT') > -1;
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    } else if (roleAgent) {
      setRoleType('ROLE_AGENT');
    }
  };

  const followTemples = async id => {
    const payload = {
      jtProfile: id,
      following: !isFollow,
    };
    try {
      setFollowBtnDisable(true);
      let results = await FollowUnFollow(payload);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        setFollowBtnDisable(false);
        FollowingCount();
      } else {
        alert('something went wrong');
      }
    } catch (error) {
      console.log('error in folow temples api in view profile page', error);
    }
  };
  const FollowingCount = () => {
    if (!isFollow === true) {
      setFollowCount(followCount + 1);
    } else if (isFollow) {
      setFollowCount(followCount - 1);
    }
  };

  const templeRoleSearchWithId = (profileId) => {
    setRoleLoader(true);
    getTempleProfile(profileId)
      .unwrap()
      .then(response => {
        if (response) {
          let val = response?.roles;
          var roleAdmin = val?.indexOf('ROLE_ITEM_ADMIN') > -1;
          if (roleAdmin) {
            setRoleId('ROLE_ITEM_ADMIN');
            setRoleLoader(false);
          } else {
            setRoleLoader(false);
          }
        } else {
          setRoleId(null);
          setRoleLoader(false);
        }
      }
      )
      .catch(error => {
        setRoleLoader(false);
        console.log('error-->', error)
      })
  }

  const templeDetails = (profileId) => {
    setMainLoader(true);
    getTempleDetails(profileId)
      .unwrap()
      .then(response => {
        setTempProfileData(response);
        setMainLoader(false)
      }
      )
      .catch(error => {
        setMainLoader(false);
        console.log('error-->', error)
      })
  };

  const templeAddressDetails = (profileId) => {
    setMainLoader(true);
    getTempleAddress(profileId)
      .unwrap()
      .then(response => {
        setTempleAddress(response);
        setMainLoader(false)
      }
      )
      .catch(error => {
        setMainLoader(false);
        console.log('error-->', error)
      })
  };

  const CommunityTemple = profileId => {
    setMainLoader(true);
    getTempleCommunity(profileId)
      .unwrap()
      .then(response => {
        setCommunityList(response);
        setMainLoader(false)
      }
      )
      .catch(error => {
        setMainLoader(false);
        console.log('error-->', error)
      })
  };

  const Posts = (profileId) => {
    setloader(true);
    let data = {
      profileId: profileId,
      pageNo: 0,
      pageSize: 100,
    }
    getTemplePost(data)
      .unwrap()
      .then(response => {
        let postsData = response?.data;
        let urls = postsData
          ?.filter(item => item)
          ?.map(({ mediaList, id, jtProfile }) => ({ mediaList, id, jtProfile }));
        if (urls) {
          let media = urls?.filter(item => item?.mediaList);
          setPostImages(media);
          setloader(false);
        } else {
          setPostImages(0);
          setloader(false);
        }
        let count = postsData?.filter(item => item.mediaList);
        if (count) {
          setPostsCount(count);
        } else {
          setPostsCount(0);
        }
      })
      .catch(error => {
        setloader(false);
        console.log('error posts-->', error)
      })
  };


  const dontationValue = profileId => {
    setDonationLoader(true);
    let data = {
      profileId: profileId,
      pageNo: 0,
      pageSize: 20,
    }
    getTempleDonation(data)
      .unwrap()
      .then(response => {
        if (response) {
          setDonationValue(response?.data[0]);
          setDonationLoader(false);
        } else {
          setDonationValue([]);
          setDonationLoader(false);
        }
      }
      )
      .catch(error => {
        setDonationLoader(false);
        console.log('error DOnation -->', error)
      })
  };

  const eventList = profileId => {
    setMainLoader(true);
    let data = {
      profileId: profileId,
      pageNo: 0,
      pageSize: 40,
    }
    getProfileEvents(data)
      .unwrap()
      .then(response => {
        if (response) {
          setEvents(response);
          setMainLoader(false);
        }
      }
      )
      .catch(error => {
        setMainLoader(false);
        console.log('error profile evnts-->', error)
      })
  };

  const getFollowValue = profileId => {
    setFollowVisible(
      data?.profileDTO?.follow ? data?.profileDTO?.follow : true,
    );
    getNewFollowUnFollowById(profileId)
      .unwrap()
      .then(response => {
        setFollowVisible(false);
        setisFollow(response);
      }
      )
      .catch(error => {
        setFollowVisible(false);
        console.log('error in folllll-->', error)
      })
  };

  const followingCount = profileId => {
    getNewFollowCount(profileId)
      .unwrap()
      .then(response => {
        if (response) {
          setFollowCount(response);
        } else {
          setFollowCount(0);
        }
      }
      )
      .catch(error => {
        console.log('error in follow count-->', error)
      })
  };

  // const dontationValue = async id => {
  //   // setDonationLoader(true)
  //   try {
  //     let result = await getTopDonation(id, 0, 20);
  //     // console.log('top donation', result?.data);
  //     if (result) {
  //       // console.log('dontion ====>', result?.data?.data[0]);
  //       setDonationValue(result?.data?.data[0]);
  //       setDonationLoader(false);
  //     } else {
  //       setDonationValue([]);
  //       setDonationLoader(false);
  //     }
  //   } catch (error) {
  //     setDonationLoader(false);
  //     console.log('error in top donations api', error);
  //   }
  // };


  return (
    <>
      {mainLoader ? (
        <View>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <ScrollView
          style={{
            ...styles.maincontainer,
            backgroundColor: isDarkMode ? 'white' : 'white',
          }}>
          <Pressable>
            <View style={styles.footerBackground}>
              <BackgroundImageAClass />
              {trfData?.templeClass === 'c' && <BackgroundImageFlower />}
              <View style={styles.footerContainer}>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={{ backgroundColor: 'white', borderRadius: 28 / 2 }}
                    onPress={() => {
                      navigation.goBack();
                      route?.params?.onSelect({
                        selected: isFollow,
                        selectedId: !isFollow ? trfData?.jtProfile : '',
                      });
                    }}>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => {
                        navigation.goBack();
                        route?.params?.onSelect({
                          selected: isFollow,
                          selectedId: !isFollow ? trfData?.jtProfile : '',
                        });
                      }}>
                      <Ionicons name='arrow-back-circle' size={39} color="orange" style={{ marginLeft: 2, marginTop: -1 }} />
                    </TouchableOpacity>

                    {/* )} */}
                  </TouchableOpacity>
                  <View style={styles.menuAndAlert}>
                    {/* <TouchableOpacity
                  style={styles.bell}
                  onPress={() =>
                    navigation.navigate(allTexts.screenNames.notification)
                  }>
                  <FontAwesome
                    name="bell-o"
                    size={24}
                    color={isDarkMode ? 'black' : 'black'}
                  />
                </TouchableOpacity> */}
                    {roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN' ? (
                      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                        <View style={styles.menu}>
                          <Feather name="menu" size={28} color={colors.black} />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
                <View style={{ alignSelf: 'center', marginTop: -15 }}>
                  <ProfileImage profileImg={trfData} />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%',
                  }}>
                  {tempProfileData?.communityDTO?.name && (
                    <Text style={{ fontSize: 15, color: isDarkMode ? 'black' : 'black' }}>
                      {tempProfileData?.communityDTO?.name}
                    </Text>
                  )}

                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: '5%',
                    }}>
                    <View
                      style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: '#FFF3E5',
                        borderRadius: 8,
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.titleHeader}>
                        {trfData?.name}
                      </Text>
                    </View>
                  </View>
                </View>
                {templeaddress?.locality && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                    <EvilIcons
                      style={{ color: colors.orangeColor, backgroundColor: 'white' }}
                      name="location"
                      size={15}
                      color="white"
                    />
                    <Text style={{ fontSize: 12, color: 'gray' }}>
                      {templeaddress?.locality},{' '}
                      {
                        templeaddress?.postalCodeDTO?.city
                          ?.name
                      }
                    </Text>
                  </View>
                )}
                <View style={{ marginTop: 1 }}>
                  {/* {tempProfileData?.seasonal ? (
                <TouchableOpacity
                  style={styles.seasonal}
                  onPress={() =>
                    navigation.navigate('TempleCrew', {
                      id: trfData?.jtProfile,
                    })
                  }>
                  <Text style={styles.seasonalText}>Temple Members</Text>
                </TouchableOpacity>
              ) : ( */}
                  {!trfData?.seasonal && (
                    <ProfileTimingTabs data={tempProfileData} />
                  )}
                  {/* )} */}
                </View>
                <View style={{ marginLeft: 15 }}>
                  <ProfileSeconTab nameData={trfData} title={trfData?.description} />
                  <View style={styles.firstTabView}>
                    <View style={styles.postsTab}>
                      <PostsComp
                        itemDetails={postsCount}
                        onPress={() => setPosts(!posts)}
                      />
                      <FollowersComp
                        followCount={followCount}
                        onPressFollowers={() =>
                          navigation.navigate(
                            allTexts.screenNames.followersmembership,
                            {
                              id: trfData?.jtProfile,
                              roleId: roleId,
                            },
                          )
                        }
                      />
                      <CommunityComp
                        itemCommunity={
                          events?.data?.length ? events?.data?.length : '0'
                        }
                        onPressmembership={() =>
                          navigation.navigate(allTexts.screenNames.profileEvents, {
                            id: trfData?.jtProfile,
                            data: events?.data,
                            role: roleId,
                            roleType: roleType,
                          })
                        }
                      />
                    </View>
                  </View>
                  <View horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        ...styles.followtab,
                        justifyContent: tempProfileData?.membershipsEnabled
                          ? 'space-evenly'
                          : 'space-evenly',
                      }}>
                      <FolloUnfollowComp
                        style={styles.followingContainer}
                        followBtnDisable={followBtnDisable}
                        followTemples={() => FOLLOW(trfData?.jtProfile)}
                        followVisible={followVisible}
                        isFollow={isFollow}
                        shadow={true}
                      />
                      {!trfData?.seasonal && (
                        <ContactTabcomp onPressContact={() => navigation.navigate(allTexts.screenNames.abouttemple, {
                          jtProfile: trfData?.jtProfile,
                          name: trfData?.name,
                        })} />
                      )}
                      {trfData?.seasonal ? (
                        <TempleCrewTabComp onPressContact={() =>
                          navigation.navigate('TempleCrew', {
                            id: trfData?.jtProfile,
                          })
                        } />
                      ) : ''}
                      {/* {tempProfileData?.membershipsEnabled && (
                    <DirectionsTabComp
                      role={
                        roleId === 'ROLE_ITEM_ADMIN' ||
                        roleType === 'ROLE_ADMIN'
                      }
                      onPress={() => {
                        navigation.navigate(
                          allTexts.screenNames.profilememberships,
                          {
                            trfdata: trfData,
                            roleId: roleId,
                          },
                        );
                      }}
                    />
                  )} */}
                      {!trfData?.seasonal && (
                        <NearByTempleComp
                          onPress={() =>
                            navigation.navigate(
                              allTexts.screenNames.profilenearbytemples, {
                              jtProfile: trfData?.jtProfile
                            }
                            )
                          }
                        />
                      )}
                      {/* <TouchableOpacity onPress={() =>navigation.navigate(allTexts.screenNames.templeProfileToDoList)}>
                  <Entypo
                  name="add-to-list"
                  size={25}
                  style={{marginTop:10}}
                />
                  </TouchableOpacity> */}
                    </View>
                  </View>
                  {donationLoader ? (
                    <Loader size={'small'} color={colors.orangeColor} />
                  ) : roleType === 'ROLE_ADMIN' || roleId === 'ROLE_ITEM_ADMIN' ? (

                    <Danation_Add_Card
                      onPress={() =>
                        navigation.navigate(allTexts?.screenNames?.donationslist, {
                          data: trfData,
                        })
                      }
                      id={donationValue?.email}
                      text={
                        donationValue?.donorName
                          ? `Top donation by ${donationValue?.donorName
                            ? donationValue?.donorName
                            : donationValue?.name
                          }`
                          : 'No Donations Yet'
                      }
                      roleId={
                        roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN'
                      }
                    />
                  ) : (
                    ''
                  )}
                </View>

                <ProfileFourthTab
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  templeDetails={trfData}
                />
              </View>
            </View>
            {currentIndex === 1 && (
              <View
                showsVerticalScrollIndicator={false}
                style={styles.contentDisplay}>
                {!postImages?.length > 0 ? (
                  <View>
                    {loader ? (
                      <Loader size={'small'} color={colors.orangeColor} />
                    ) : (
                      <View>
                        <Feather
                          name="camera-off"
                          size={40}
                          color={'black'}
                          style={styles.noPosts}
                        />
                        <Text style={styles.noPosts.text}>No Posts Yet</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <FlatList
                    numColumns={3}
                    data={postImages}
                    keyExtractor={({ item, index }) => index}
                    style={styles.ImagesContainer}
                    renderItem={({ item, index }) => (
                      <TempleProfile_PostsCard nav={navigation} item={item} role={roleId} />
                    )}
                  />
                )}
              </View>
            )}
            {/* {currentIndex === 2 && (
            <View>
              <Feather name="camera-off" size={40} style={styles.noPosts} />
              <Text style={styles.noPosts.text}>No Reels Yet</Text>
            </View>
          )} */}
            {currentIndex === 3 && (
              // <EventCard />
              <View>
                <Feather name="camera-off" size={40} style={styles.noPosts} />
                <Text style={styles.noPosts.text}>No Services Yet</Text>
              </View>
            )}
            {currentIndex === 4 && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.contentDisplay}>
                {eventsLoader && (
                  <View style={{ flex: 1 }}>
                    <Loader color={colors.orangeColor} size={30} />
                  </View>
                )}
                {!eventsData?.length > 0 ? (
                  <View>
                    <Feather name="camera-off" size={40} style={styles.noPosts} />
                    <Text style={styles.noPosts.text}>No Events Yet</Text>
                  </View>
                ) : (
                  <EventCard navigation={navigation} data={eventsData} />
                )}
              </ScrollView>
            )}
            {isModal && (
              <ContactModal isModal={isModal} setIsModal={setIsModal} />
            )}
          </Pressable>
          <Modal
            // animationType={'slide'}
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
              setIsVisible(!isVisible);
            }}>
            <Pressable
              onPress={() => setIsVisible(!isVisible)}
              style={styles.model}>
              <View style={styles.modalView}>
                <View style={styles.line} />

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(allTexts.screenNames.createfeed, {
                      data: data,
                      classType: tempProfileData?.templeClass,
                    });
                    setIsVisible(!isVisible);
                  }}
                  style={styles.modalContent}>
                  <Icon color={colors.black} name="create-outline" size={22} />
                  <Text style={styles.modalContentText}>Create a Post</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate(allTexts.screenNames.reelupload, {
                    id: trfData?.jtProfile
                  }); setIsVisible(!isVisible);
                }} style={styles.modalContent}>
                  <Icon color={colors.black} name="people-outline" size={22} />
                  <Text style={styles.modalContentText}>Create Spirituals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(allTexts.screenNames.profilememberships, {
                      trfdata: trfData,
                      roleId: roleId,
                    });
                    setIsVisible(!isVisible);
                  }}>
                  <View style={styles.modalContent}>
                    <MaterialIcons
                      color={colors.black}
                      name="account-box-outline"
                      size={22}
                    />

                    <Text style={styles.modalContentText}>Manage Memberships</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </ScrollView>
      )}
    </>
  );
};
export default ViewTempleProfile;
