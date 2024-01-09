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
  Image,
  navBack,

} from 'react-native';
import {
  Loader,
  ContactModal,
  TempleProfile_PostsCard,
  BackgroundImageAClass,
  BackgroundImageFlower,
  BackHeaderNew,
  EventCard,

} from '../../components';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect, useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { allTexts } from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Data } from '../home-feed/formateDetails';
import {
  FollowUnFollow,
  NewGetFollowUmFollowById,
  NewFollowCount,
  GetPosts,
  MemberShipCount,
  EventList,
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
  Danation_Add_Card
} from '../../components';
import { ProfileImage } from '../../components';
import { colors } from '../../common';
import { PostsComp } from '../../components/profilecompnew/postsComp';
import { SearchTempleRoleWithId } from '../../utils/api';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { style } from '../newprofile/styles';
import EventsScreen from '../EventsScreen';
import UpdatePassword from '../update-password';

const ViewTempleProfile = ({ route, navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { userDetails } = useContext(ApplicationContext);
  const { data } = route.params || {};
  console.log(
    '<=============================>',
    data,
    // '<==============',
    // userDetails,
  );
  const [loader, setloader] = useState(false);
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
  const FOLLOW = id => {
    if (isFollow) {
      followTemples(id);
    } else if (!isFollow) {
      followTemples(id);
      setisFollow(!isFollow);
    }
  };
  const MemberShip = async id => {
    try {
      let result = await MemberShipCount(id);
      if (result) {
        setMemberShip(result?.data);
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      console.log('error in membership count', error);
    }
  };
  let result = Data(data);
  useEffect(() => {
    if (result) {
      setTrfData(result);
      if (result?.jtProfile) {
        getFollowValue(result?.jtProfile);
        Posts(result?.jtProfile);
        TempleRoleSearchWithId(result?.jtProfile);
        followingCount(result?.jtProfile);
        MemberShip(result?.jtProfile);
      } else {
      }
    } else {
      setTrfData();
    }
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
      console.log('result of follow temple in view temple profile', results?.data);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        setFollowBtnDisable(false);
        FollowingCount();
        ToastAndroid.show(
          `Successfully you are ${!isFollow ? ' Following' : 'unFollwing'
          } the temple !`,
          ToastAndroid.SHORT,
        );
      } else {
        alert('some thing went wrong')
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
        ?.map(({ mediaList, id, jtProfile }) => ({ mediaList, id, jtProfile }));
      if (urls) {
        let media = urls?.filter(item => item?.mediaList);
        setPostImages(media);
        console.log('media', media);
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
    EventsList();
    Type();
  }, []);
  const EventsList = async () => {
    setEventsLoader(true);
    let result = await EventList(0, 100, 85);
    // console.log('eventsdata', result?.data);
    if (result?.status === 200) {
      setEventsLoader(false);
      setEventsData(result?.data?.data);
    } else {
      setEventsLoader(false);
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
                style={{ backgroundColor: 'white', borderRadius: 28 / 2 }}
                onPress={() => {
                  navigation.goBack();
                  route?.params?.onSelect({
                    selected: isFollow,
                    selectedId: !isFollow ? trfData?.jtProfile : '',
                  });
                }}>
                {/* <BackHeaderNew
                  onPress={() => navigation.goBack()}
                /> */}
                {/* {back && ( */}

                <TouchableOpacity style={styles.iconContainer} onPress={() => {
                  console.log('isfollow', isFollow, 'second', trfData?.jtProfile);
                  navigation.goBack();
                  route?.params?.onSelect({
                    selected: isFollow,
                    selectedId: !isFollow ? trfData?.jtProfile : '',
                  });
                }} >
                  <Ionicons
                    name="caret-back"
                    size={25}
                    color={'#FFA001'}

                  />
                </TouchableOpacity>

                {/* )} */}
              </TouchableOpacity>
              <View style={styles.menuAndAlert}>
                <TouchableOpacity style={styles.bell}>
                  <FontAwesome
                    name="bell-o"
                    size={24}
                    color={isDarkMode ? 'black' : 'black'}
                  />
                  <View style={styles.notificationNum}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>2</Text>
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
            <View style={{ alignSelf: 'center', marginTop: -15 }}>
              <ProfileImage profileImg={trfData} />
            </View>
            <Text style={styles.titleHeader}>
              {trfData?.name?.length < 25
                ? `${trfData?.name}`
                : `${trfData?.name?.substring(0, 25)}...`}
            </Text>
            <Text style={styles.ratingText}>
              <AntDesign name={'star'} color={'#FFA001'} size={16} /> {'4.8'}{' '}
              {'(15.3k Ratings)'}
            </Text>
            <View style={{ marginTop: 10 }}>
              {data?.seasonal ? (
                <TouchableOpacity style={styles.seasonal} onPress={() => navigation.navigate('FollowersMembership')}>
                  <Text style={styles.seasonalText}> View Temple Crew</Text>
                </TouchableOpacity>
              ) : (
                <ProfileTimingTabs />
              )}
            </View>
            <View style={{ marginLeft: 15 }}>
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
                    itemCommunity={'0'}
                    onPressmembership={
                      () => alert('page under development')
                      // navigation.navigate(
                      //   allTexts.screenNames.profilemembership,
                      //   {
                      //     trfdata: trfData,
                      //   },
                      // )
                    }
                  />
                </View>
              </View>
              <View style={styles.followtab}>
                {/* <View
                  // alignSelf="center"
                  // align
                  style={styles.horizontalContainer}> */}
                <FolloUnfollowComp
                  style={styles.followingContainer}
                  followBtnDisable={followBtnDisable}
                  followTemples={() => FOLLOW(trfData?.jtProfile)}
                  followVisible={followVisible}
                  isFollow={isFollow}
                  shadow={true}
                />
                {/* <ContactTabcomp onPressContact={() => setIsModal(true)} /> */}
                <DirectionsTabComp
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
                {/* <CreateFeedTabComp
                    roleId={roleId}
                    onPlusPress={() =>
                      navigation.navigate(allTexts?.screenNames.createfeed, {
                        data: data,
                      })
                    }
                  /> */}
              </View>
              {/* </View> */}
              <TouchableOpacity  onPress={() =>
                    navigation.navigate(allTexts?.screenNames?.donationslist, {
                      data: trfData,
                    })
                  }>
                <Danation_Add_Card
                  roleId={roleId}
                 
                />
              </TouchableOpacity>
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
                  keyExtractor={({ item, index }) => index}
                  style={styles.ImagesContainer}
                  renderItem={({ item, index }) => (
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

            <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.createfeed, {
              data: data,
            })} style={styles.modalContent}>
              <Icon color={colors.black} name="create-outline" size={22} />
              <Text style={styles.modalContentText}>Create a Post</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Icon color={colors.black} name="people-outline" size={22} />

              <Text style={styles.modalContentText}>User groups</Text>
            </View>
            <TouchableOpacity
              onPress={() => alert('page under development')
                // navigation.navigate(allTexts.screenNames.profilemembership, {
                //   id: trfData?.jtProfile,
                // })
              }>
              <View style={styles.modalContent}>
                <MaterialIcons
                  color={colors.black}
                  name="account-box-outline"
                  size={22}
                />

                <Text style={styles.modalContentText}>Manage Memberships</Text>
              </View>
            </TouchableOpacity>
            {/* <View style={styles.modalContent}>
              <Feather color={colors.black} name="camera-off" size={20}  />

              <Text style={styles.modalContentText}>sdasdd</Text>
            </View>
            <View style={styles.modalContent}>
              <Feather  color={colors.black} name="camera-off" size={20}  />

              <Text style={styles.modalContentText}>sdasdd</Text>
            </View> */}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};
export default ViewTempleProfile;
