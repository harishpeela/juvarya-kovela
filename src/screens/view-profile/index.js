/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {BackgroundImage, Loader, BackHeaderNew} from '../../components';
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
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {ProfileSeconTab, ProfileFourthTab} from '../../components';
import {
  ProfileComp,
  CommunityComp,
  FollowersComp,
  PostsComp,
  ContactTabcomp,
  CreateFeedTabComp,
  FolloUnfollowComp,
  DirectionsTabComp,
} from '../../components';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
const ViewProfile = ({route, navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {data} = route.params || {};
  // console.log(
  //   '=============================>',
  //   data,
  //   // '<==============',
  //   // userDetails,
  // );
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState();
  const [trfData, setTrfData] = useState();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [followVisible, setFollowVisible] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [itemCommunity, setItemCommunity] = useState([]);
  const [followCount, setFollowCount] = useState(0);
  const [postImages, setPostImages] = useState([]);
  const [roleId, setRoleId] = useState(false);
  const [posts, setPosts] = useState(false);
  const FOLLOW = () => {
    if (isFollow) {
      followTemples();
    } else if (!isFollow) {
      followTemples();
      setisFollow(!isFollow);
    }
  };
  useEffect(() => {
    let result = Data(data);
    if (result) {
      setTrfData(result);
    } else {
      setTrfData();
    }
  }, [data]);
  // console.log('trfdata', trfData);
  const followingCount = async () => {
    try {
      let result = await NewFollowCount(data?.id);
      if (result) {
        setFollowCount(result?.data);
      } else {
        setFollowCount(0);
      }
      // console.log('res of follow count', result?.data);
    } catch (error) {
      console.log('error in follow count', error);
    }
  };
  const followTemples = async () => {
    const payload = {
      jtCustomer: userDetails?.id,
      type: 'ITEM',
      jtProfile: data?.id,
      following: !isFollow,
    };
    // console.log('pYLOfd', payload);
    try {
      setFollowBtnDisable(true);
      let results = await FollowUnFollow(payload);
      // console.log('========><------------', results?.data);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        setFollowBtnDisable(false);
        FollowingCount();
        ToastAndroid.show(
          `Successfully you are${
            !isFollow ? ' following' : ' unFollowing'
          } temple!`,
          ToastAndroid.SHORT,
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FollowingCount = () => {
    if (!isFollow === true) {
      setFollowCount(followCount + 1);
    } else if (isFollow) {
      setFollowCount(followCount - 1);
    }
  };

  const getFollowValue = async () => {
    let result = await NewGetFollowUmFollowById(data?.id);
    // console.log('res of follow', result?.data);
    if (result) {
      setisFollow(result?.data);
    }
  };

  const Posts = async () => {
    console.log('data?.id', data?.id);
    try {
      let result = await GetPosts(data?.id, 0, 20);
      // console.log('result', result?.data);
      let PostsArray = [];
      let postsData = result?.data?.data;
      let urls = postsData
        ?.filter(item => item?.mediaList)
        ?.map(({mediaList}) => ({mediaList}));
      urls?.map(({mediaList}) =>
        mediaList?.map(s => PostsArray?.push({image: s?.url})),
      );
      if (PostsArray?.length > 0) {
        setloader(false);
        setPostImages(PostsArray);
        console.log('array', PostsArray);
      } else {
        setPostImages([]);
        setloader(false);
      }
    } catch (error) {
      console.log('error in posts', error);
    }
  };
  const TempleRoleSearchWithId = async () => {
    let Token = await getAuthTokenDetails();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `http://fanfundev.eastasia.cloudapp.azure.com:9096/jtprofile/customer-roles?profileId=${data?.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('res odf role id', result);
        if (result) {
          setRoleId(result?.roles[0]);
        }
      })
      .catch(error => console.log('errorrr', error));
  };
  useEffect(() => {
    TempleRoleSearchWithId();
    getFollowValue();
    followingCount();
    Posts();
  }, [route]);
  return (
    <View style={styles.maincontainer}>
      <View style={styles.footerBackground}>
        <BackgroundImage />
        <View style={styles.footerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginHorizontal: '30%',
                alignSelf: 'center',
              }}>
              {trfData?.name?.length < 17
                ? `${trfData?.name}`
                : `${trfData?.name?.substring(0, 17)}...`}
            </Text>
          </View>
          <View style={styles.firstTabView}>
            <ProfileComp profileImg={trfData} />
            <PostsComp
              itemDetails={postImages}
              onPress={() => setPosts(!posts)}
            />
            <FollowersComp
              followCount={followCount}
              onPressFollowers={() =>
                navigation.navigate(allTexts.screenNames.followersmembership, {
                  id: data?.id,
                })
              }
            />
            <CommunityComp
              itemCommunity={itemCommunity}
              onPressmembership={() =>
                navigation.navigate(allTexts.screenNames.profilemembership)
              }
            />
          </View>
          <ProfileSeconTab nameData={trfData} title={trfData?.name} />
          <View style={styles.followtab}>
            <FolloUnfollowComp
              followBtnDisable={followBtnDisable}
              followTemples={FOLLOW}
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
          {currentIndex === 1 && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.contentDisplay}>
              {loader && (
                <View style={{flex: 1}}>
                  <Loader color={'green'} size={30} />
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
                    <TouchableOpacity>
                      <Image
                        source={{uri: item?.image}}
                        style={{
                          height: 120,
                          width: 120,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};
export default ViewProfile;
