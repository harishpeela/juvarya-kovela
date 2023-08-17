/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import {BackgroundImage, Loader} from '../../components';
import {styles} from './styles';
import React, {useState, useEffect, useContext} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {allTexts} from '../../common';
import {Data} from '../home-feed/formateDetails';
import {
  FollowUnFollow,
  NewGetFollowUmFollowById,
  NewFollowCount,
  GetPosts,
  MemberShipCount,
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
} from '../../components';
import {ProfileImage} from '../../components';
import {colors} from '../../common';
import {PostsComp} from '../../components/profilecompnew/postsComp';
import {SearchTempleRoleWithId} from '../../utils/api';
const ViewProfile = ({route, navigation}) => {
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
      // console.log('----------------------------------------------->', result);
      setTrfData(result);
      if (result?.jtProfile) {
        getFollowValue(result?.jtProfile);
        Posts(result?.jtProfile);
        TempleRoleSearchWithId(result?.jtProfile);
        followingCount(result?.jtProfile);
        MemberShip(result?.jtProfile);
      } else {
        console.log('nope');
      }
    } else {
      setTrfData();
    }
  }, [data]);

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
          `మీరు విజయవంతంగా ఆలయాన్ని ${
            !isFollow ? ' అనుసరిస్తున్నారు' : ' అనుసరించడం లేదు'
          } !`,
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
    try {
      let result = await GetPosts(id, 0, 40);
      let postsData = result?.data?.data;
      let urls = postsData
        ?.filter(item => item)
        ?.map(({mediaList, id, jtProfile}) => ({mediaList, id, jtProfile}));
      if (urls) {
        let media = urls?.filter(item => item?.mediaList);
        setPostImages(media);
        setloader(false);
      } else {
        setPostImages(null);
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
  console.log('trfdata,', trfData);
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
  useEffect(() => {}, [route]);
  return (
    <View
      style={{
        ...styles.maincontainer,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      <View style={styles.footerBackground}>
        <BackgroundImage />
        <View style={styles.footerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                console.log('route', route);
                navigation.goBack();
                route?.params?.onSelect({
                  // selectedId: trfData?.jtProfile,
                  selected: !isFollow ? trfData?.jtProfile : '',
                });
              }}>
              <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginHorizontal: '25%',
                alignSelf: 'center',
                textTransform: 'capitalize',
              }}>
              {trfData?.name?.length < 15
                ? `${trfData?.name}`
                : `${trfData?.name?.substring(0, 15)}...`}
            </Text>
          </View>
          <View style={styles.firstTabView}>
            <ProfileImage profileImg={trfData} />
            <PostsComp
              itemDetails={postsCount}
              onPress={() => setPosts(!posts)}
            />
            <FollowersComp
              followCount={followCount}
              onPressFollowers={() =>
                navigation.navigate(allTexts.screenNames.followersmembership, {
                  id: trfData?.jtProfile,
                })
              }
            />
            <CommunityComp
              itemCommunity={memberShip?.membershipCount}
              onPressmembership={() =>
                navigation.navigate(allTexts.screenNames.profilemembership, {
                  id: trfData?.jtProfile,
                })
              }
            />
          </View>
          <ProfileSeconTab nameData={trfData} title={trfData?.name} />
          <View style={styles.followtab}>
            <FolloUnfollowComp
              followBtnDisable={followBtnDisable}
              followTemples={() => FOLLOW(trfData?.jtProfile)}
              followVisible={followVisible}
              isFollow={isFollow}
            />
            <ContactTabcomp />
            <DirectionsTabComp />
            <CreateFeedTabComp
              roleId={roleId}
              onPlusPress={() =>
                navigation.navigate(allTexts?.screenNames.createfeed, {
                  data: data,
                })
              }
            />
          </View>
          <ProfileFourthTab
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            templeDetails={trfData}
          />
        </View>
        {currentIndex === 1 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentDisplay}>
            {loader && (
              <View style={{flex: 1}}>
                <Loader color={colors.orangeColor} size={30} />
              </View>
            )}
            {!postImages?.length > 0 ? (
              <View>
                <Feather name="camera-off" size={40} style={styles.noPosts} />
                <Text style={styles.noPosts.text}>No Posts Yet</Text>
              </View>
            ) : (
              <FlatList
                numColumns={3}
                data={postImages}
                keyExtractor={({item, index}) => index}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{height: '100%', width: '34%'}}
                    onPress={() =>
                      navigation.navigate(allTexts.screenNames.feeds, {
                        itemDetails: item,
                      })
                    }>
                    {item?.mediaList ? (
                      <Image
                        source={{uri: item?.mediaList[0]?.url}}
                        style={{
                          height: 140,
                          width: 140,
                          resizeMode: 'stretch',
                        }}
                      />
                    ) : null}
                  </TouchableOpacity>
                )}
              />
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default ViewProfile;
