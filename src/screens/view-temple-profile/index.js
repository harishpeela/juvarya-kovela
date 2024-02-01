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
import {styles} from './styles';
import React, {useState, useEffect, useContext} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {allTexts} from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Data} from '../home-feed/formateDetails';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {ProfileSeconTab, ProfileFourthTab} from '../../components';
import {
  CommunityComp,
  FollowersComp,
  ContactTabcomp,
  CreateFeedTabComp,
  FolloUnfollowComp,
  DirectionsTabComp,
  ProfileTimingTabs,
  Danation_Add_Card,
} from '../../components';
import {ProfileImage} from '../../components';
import {colors} from '../../common';
import {PostsComp} from '../../components/profilecompnew/postsComp';
import {SearchTempleRoleWithId} from '../../utils/api';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NearByTempleComp from '../../components/NearByTempleComp';
import {TEMPLE_ADDRESS} from '../../utils/api/api';

const ViewTempleProfile = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {userDetails} = useContext(ApplicationContext);
  const {data} = route.params || {};
  // console.log(
  //   '<=============================>',
  //   data,
  //   // '<==============',
  //   // userDetails,
  // );
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
  const [roleLoader, setRoleLoader] = useState(true);
  const [posts, setPosts] = useState(false);
  const [memberShip, setMemberShip] = useState(0);
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
  const FOLLOW = id => {
    if (isFollow) {
      followTemples(id);
    } else if (!isFollow) {
      followTemples(id);
      setisFollow(!isFollow);
    }
  };

  const CommunityTemple = async templeId => {
    try {
      let result = await TempleCommunity(templeId);
      if (result) {
        const dty = result?.data || [];
        setCommunityList(dty);
      }
    } catch (error) {
      console.log('error in popular temples', error);
    }
  };

  const TempleAddressDetails = async templeId => {
    try {
      let result = await TempleAddress(templeId);
      // console.log('templeAddress', result?.data);
      if (result) {
        const dty = result?.data || [];
        setTempleAddress(dty);
      }
    } catch (error) {
      console.log('error in popular temples', error);
    }
  };

  useEffect(() => {
    let result = Data(data);
    if (result) {
      setTrfData(result);
      console.log('trfdata', result);
      if (result?.jtProfile) {
        getFollowValue(result?.jtProfile);
        Posts(result?.jtProfile);
        CommunityTemple(result?.jtProfile);

        TempleRoleSearchWithId(result?.jtProfile);
        followingCount(result?.jtProfile);
        dontationValue(result.jtProfile);
        // MemberShip(result?.jtProfile);
        TempleAddressDetails(result?.jtProfile);
        eventList(result?.jtProfile);
      } else {
      }
    } else {
      setTrfData();
    }
  }, []);
  const eventList = async (id) => {
    let result = await getProfileEvents(0, 40, id);
    // console.log('result of events', result?.data);
    if(result?.data){
      setEvents(result?.data)
    }
  }
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
  const followingCount = async id => {
    try {
      let result = await NewFollowCount(id);
      if (result) {
        setFollowCount(result?.data);
      } else {
        setFollowCount(0);
      }
    } catch (error) {
      console.log('error in follow count', error);
    }
  };
  const followTemples = async id => {
    const payload = {
      jtProfile: id,
      following: !isFollow,
      // jtCustomer: userDetails?.id,
      // type: 'ITEM',
      // jtProfile: id,
      // following: !isFollow,
    };
    try {
      setFollowBtnDisable(true);
      let results = await FollowUnFollow(payload);
      console.log(
        'result of follow temple in view temple profile',
        results?.data,
      );
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        setFollowBtnDisable(false);
        FollowingCount();
        ToastAndroid.show(
          `Successfully you are ${
            !isFollow ? ' Following' : 'unFollwing'
          } the temple !`,
          ToastAndroid.SHORT,
        );
      } else {
        alert('some thing went wrong');
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
  const getFollowValue = async id => {
    setFollowVisible(true);
    let result = await NewGetFollowUmFollowById(id);
    if (result) {
      setFollowVisible(false);
      setisFollow(result?.data);
    }
  };

  const Posts = async id => {
    setloader(true);
    try {
      let result = await GetPosts(id, 0, 100);
      let postsData = result?.data?.data;
      let urls = postsData
        ?.filter(item => item)
        ?.map(({mediaList, id, jtProfile}) => ({mediaList, id, jtProfile}));
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
    } catch (error) {
      console.log('error in posts', error);
    }
  };
  const TempleRoleSearchWithId = async profileId => {
    let result = await SearchTempleRoleWithId(profileId);
    try {
      if (result) {
        setRoleLoader(true);
        let val = result?.data?.roles;
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
    } catch (error) {
      setRoleLoader(false);
      console.log('error in temple role api', error);
    }
  };
  useEffect(() => {
    Type();
  }, []);

  const dontationValue = async id => {
    setDonationLoader(true);
    try {
      let result = await getTopDonation(id, 0, 20);
      if (result) {
        setDonationValue(result?.data?.data);
        setDonationLoader(false);
      } else {
        setDonationValue([]);
        setDonationLoader(false);
      }
    } catch (error) {
      setDonationLoader(false);
      console.log('error in top donations api', error);
    }
  };
  return (
    <ScrollView
      style={{
        ...styles.maincontainer,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      <Pressable>
        <View style={styles.footerBackground}>
          <BackgroundImageAClass />
          {data?.jtProfileDTO?.templeClass === 'c' && <BackgroundImageFlower />}
          <View style={styles.footerContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                style={{backgroundColor: 'white', borderRadius: 28 / 2}}
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
                    console.log(
                      'isfollow',
                      isFollow,
                      'second',
                      trfData?.jtProfile,
                    );
                    navigation.goBack();
                    route?.params?.onSelect({
                      selected: isFollow,
                      selectedId: !isFollow ? trfData?.jtProfile : '',
                    });
                  }}>
                  <Ionicons name="caret-back" size={25} color={'#FFA001'} />
                </TouchableOpacity>

                {/* )} */}
              </TouchableOpacity>
              <View style={styles.menuAndAlert}>
                <TouchableOpacity
                  style={styles.bell}
                  onPress={() =>
                    navigation.navigate(allTexts.screenNames.notification)
                  }>
                  <FontAwesome
                    name="bell-o"
                    size={24}
                    color={isDarkMode ? 'black' : 'black'}
                  />
                  <View style={styles.notificationNum}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>2</Text>
                  </View>
                </TouchableOpacity>
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
            <View style={{alignSelf: 'center', marginTop: -15}}>
              <ProfileImage profileImg={trfData} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%',
              }}>
              <Text style={{fontSize: 15}}>
                {communityList?.communityDTO?.name
                  ? communityList?.communityDTO?.name
                  : 'God Name'}
              </Text>
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
                    {/* {trfData?.name?.length < 25
                      ? `${trfData?.name}`
                      : `${trfData?.name?.substring(0, 25)}...`} */}
                    {trfData?.name}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: '8%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', width: '55%'}}>
                <EvilIcons
                  style={{color: colors.orangeColor, backgroundColor: 'white'}}
                  name="location"
                  size={15}
                  color="white"
                />
                <Text style={{fontSize: 12}}>
                  {templeaddress?.locality},{' '}
                  {templeaddress?.postalCodeDTO?.city?.name}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              {data?.seasonal ? (
                <TouchableOpacity
                  style={styles.seasonal}
                  onPress={() =>
                    navigation.navigate('TempleCrew', {
                      id: trfData?.jtProfile,
                    })
                  }>
                  <Text style={styles.seasonalText}> View Temple Crew</Text>
                </TouchableOpacity>
              ) : (
                <ProfileTimingTabs data={trfData} />
              )}
            </View>
            <View style={{marginLeft: 15}}>
              <ProfileSeconTab nameData={trfData} title={trfData?.name} />
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
                    itemCommunity={events?.data?.length ? events?.data?.length : '0'}
                    onPressmembership={
                      () => 
                      navigation.navigate(
                        allTexts.screenNames.profileEvents,
                        {
                          id: trfData?.jtProfile,
                          data: events?.data,
                          role: roleId,
                          roleItemType: roleType
                        })
                    }
                  />
                </View>
              </View>
              <View
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{...styles.followtab, justifyContent: trfData?.membershipsEnabled ? 'space-evenly' : 'space-evenly'}}>
                  <FolloUnfollowComp
                    style={styles.followingContainer}
                    followBtnDisable={followBtnDisable}
                    followTemples={() => FOLLOW(trfData?.jtProfile)}
                    followVisible={followVisible}
                    isFollow={isFollow}
                    shadow={true}
                  />
                 {trfData?.membershipsEnabled  && (
                   <DirectionsTabComp
                   role={
                     roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN'
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
                 )}
                  <NearByTempleComp
                    onPress={() =>
                      navigation.navigate(
                        allTexts.screenNames.nearByTempleSeeAll,
                      )
                    }
                  />
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
                  text={
                    donationValue?.length
                      ? `Top donation by ${
                          donationValue[0]?.donorName
                            ? donationValue[0]?.donorName
                            : donationValue[0]?.name
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
                  keyExtractor={({item, index}) => index}
                  style={styles.ImagesContainer}
                  renderItem={({item, index}) => (
                    <TempleProfile_PostsCard nav={navigation} item={item} />
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
                <View style={{flex: 1}}>
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
        </View>
      </Pressable>
      <Modal
        animationType={'slide'}
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
                  classType: trfData?.templeClass,
                });
                setIsVisible(!isVisible);
              }}
              style={styles.modalContent}>
              <Icon color={colors.black} name="create-outline" size={22} />
              <Text style={styles.modalContentText}>Create a Post</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Icon color={colors.black} name="people-outline" size={22} />

              <Text style={styles.modalContentText}>User groups</Text>
            </View>
            <TouchableOpacity
               onPress={() => {
                navigation.navigate(
                  allTexts.screenNames.profilememberships,
                  {
                    trfdata: trfData,
                    roleId: roleId,
                  },
                );
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
  );
};
export default ViewTempleProfile;
