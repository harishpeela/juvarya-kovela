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
} from 'react-native';
import {
  Loader,
  ContactModal,
  TempleProfile_PostsCard,
  BackgroundImageAClass,
  BackgroundImageFlower,
} from '../../components';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState, useEffect, useContext} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import services from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {allTexts} from '../../common';
import {Data} from '../home-feed/formateDetails';
import {
  FollowUnFollow,
  NewGetFollowUmFollowById,
  NewFollowCount,
  GetPosts,
  MemberShipCount,
  EventList,
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
const ViewTempleProfile = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {userDetails} = useContext(ApplicationContext);
  const {data} = route.params || {};
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
  const [roleId, setRoleId] = useState(false);
  const [posts, setPosts] = useState(false);
  const [memberShip, setMemberShip] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [isModal, setIsModal] = useState(false);
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
  useEffect(() => {
    let result = Data(data);
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
      jtCustomer: userDetails?.id,
      type: 'ITEM',
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
        ToastAndroid.show(
          `Successfully you are ${
            !isFollow ? ' Following' : 'unFollwing'
          } the temple !`,
          ToastAndroid.SHORT,
        );
      } else {
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
      // console.log('================>', result?.data);
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
  // console.log('trfdata,', trfData);
  const TempleRoleSearchWithId = async profileId => {
    let result = await SearchTempleRoleWithId(profileId);
    try {
      if (result) {
        let val = result?.data?.roles;
        var roleAdmin = val?.indexOf('ROLE_ITEM_ADMIN') > -1;
        if (roleAdmin) {
          setRoleId('ROLE_ITEM_ADMIN');
        }
      } else {
        setRoleId(null);
      }
    } catch (error) {
      console.log('error in temple role api', error);
    }
  };
  useEffect(() => {
    EventsList();
  }, [route]);
  const EventsList = async () => {
    setEventsLoader(true);
    let result = await EventList(0, 100);
    // console.log('list of evengts', result?.data);
    if (result.status === 200) {
      setEventsLoader(false);
      console.log('true', eventsLoader);
      setEventsData(result?.data?.events);
    } else {
      setEventsLoader(false);
      console.log('false', eventsLoader);
    }
  };
  return (
    <ScrollView
      style={{
        ...styles.maincontainer,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
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
              <Feather name="arrow-left-circle" color={'black'} size={28} />
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={styles.bell}>
                <FontAwesome
                  name="bell-o"
                  size={24}
                  color={isDarkMode ? 'black' : 'black'}
                />
                <View style={styles.notificationNum}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>2</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignSelf: 'center', marginTop: -15}}>
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
          <View style={{marginTop: 10}}>
            <ProfileTimingTabs />
          </View>
          <View style={{marginLeft: 15}}>
            <ProfileSeconTab nameData={trfData} title={trfData?.name} />
            <View style={styles.firstTabView}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-around',
                  margin: 30,
                }}>
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
                      },
                    )
                  }
                />
                <CommunityComp
                  itemCommunity={memberShip?.membershipCount}
                  onPressmembership={() =>
                    navigation.navigate(
                      allTexts.screenNames.profilemembership,
                      {
                        id: trfData?.jtProfile,
                      },
                    )
                  }
                />
              </View>
            </View>
            <View style={styles.followtab}>
              <ScrollView
                alignSelf="center"
                // justifyContent="center"
                align
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalContainer}>
                <FolloUnfollowComp
                  style={styles.followingContainer}
                  followBtnDisable={followBtnDisable}
                  followTemples={() => FOLLOW(trfData?.jtProfile)}
                  followVisible={followVisible}
                  isFollow={isFollow}
                />
                <ContactTabcomp onPressContact={() => setIsModal(true)} />
                <DirectionsTabComp />
                <CreateFeedTabComp
                  roleId={roleId}
                  onPlusPress={() =>
                    navigation.navigate(allTexts?.screenNames.createfeed, {
                      data: data,
                    })
                  }
                />
              </ScrollView>
            </View>
            <Danation_Add_Card
              onPress={() =>
                navigation.navigate(allTexts?.screenNames?.donations)
              }
            />
            <ProfileFourthTab
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              templeDetails={trfData}
            />
          </View>
        </View>
        {currentIndex === 1 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentDisplay}>
            {/* {loader && (
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Loader color={colors.orangeColor} size={30} />
                </View>
              )} */}
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
          </ScrollView>
        )}
        {currentIndex === 2 && (
          <View>
            <Feather name="camera-off" size={40} style={styles.noPosts} />
            <Text style={styles.noPosts.text}>No Reels Yet</Text>
          </View>
        )}
        {currentIndex === 3 && (
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
              <View >
                <Feather name="camera-off" size={40} style={styles.noPosts} />
                <Text style={styles.noPosts.text}>No Events Yet</Text>
              </View>
            ) : (
              <FlatList
                data={eventsData}
                style={styles.ImagesContainer}
                keyExtractor={({item, index}) => index}
                renderItem={({item, index}) => (
                  <TouchableOpacity style={styles.eventsCard}>
                    <Text> Name: {item?.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </ScrollView>
        )}
        {isModal && <ContactModal isModal={isModal} setIsModal={setIsModal} />}
      </View>
    </ScrollView>
  );
};
export default ViewTempleProfile;
