/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {BackgroundImage} from '../../components';
import {styles} from './styles';
import React, {useState, useEffect, useContext} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {allTexts} from '../../common';
import {Data} from '../home-feed/formateDetails';
import {
  FollowUnFollow,
  NewGetFollowUmFollowById,
  NewFollowCount,
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
  console.log(
    '=============================>',
    data,
    '<==============',
    userDetails,
  );
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState();
  const [trfData, setTrfData] = useState();
  const [isFollowValue, setIsFollowValue] = useState();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [followVisible, setFollowVisible] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [nameData, setNameData] = useState();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState('');
  const [itemCommunity, setItemCommunity] = useState([]);
  const [followCount, setFollowCount] = useState(0);
  const [templeDetails, setTempleDetails] = useState('');
  const [roleId, setRoleId] = useState(false);
  const [posts, setPosts] = useState(false);
  const FOLLOW = () => {
    if (isFollow) {
      followTemples();
    } else if (!isFollow) {
      console.log('jasx');
      followTemples();
      setisFollow(!isFollow);
    }
  };
  useEffect(async () => {
    if (data) {
      let result = Data(data);
      // console.log('restttsyysys', result);
      if (result) {
        setTrfData(result);
      }
    }
  }, [data]);
  console.log('trfdata', trfData);
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
        console.log('res odf role id', result);
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
  }, [route]);
  return (
    <ScrollView style={styles.maincontainer}>
      <View style={styles.footerBackground}>
        <BackgroundImage />
        <View style={styles.footerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
            </TouchableOpacity>
            <Text
              style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
              Profile
            </Text>
          </View>
          <View style={styles.firstTabView}>
            <ProfileComp profileImg={trfData} />
            <PostsComp
              itemDetails={itemDetails}
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
              // onPressmembership={() =>
              //   navigation.navigate(allTexts.screenNames.followersmembership, {
              //     id: id,
              //   })
              // }
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
          {/* {currentIndex === 1 && (
            <View style={styles.contentDisplay}>
              <View style={styles.contentDisplay.row}>
                <Text style={{fontSize: 20}}>Posts</Text>
              </View>
              {itemDetails.length === 0 ? (
                <View style={{alignItems: 'center', marginTop: '15%'}}>
                  <Text style={styles.noposttext}>
                    no posts for this temple
                  </Text>
                </View>
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{height: '45%'}}>
                  <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={itemDetails}
                    keyExtractor={({item, index}) => index}
                    renderItem={({item, index}) => (
                      <View style={{marginRight: '2%', marginTop: '2%'}}>
                        <Image
                          source={{
                            uri: item?.mediaList[0]?.url
                              ? item?.mediaList[0]?.url
                              : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1670905787229_shiva pic 2.png',
                          }}
                          style={{
                            height: 110,
                            width: 110,
                          }}
                        />
                      </View>
                    )}
                  />
                </ScrollView>
              )}
            </View>
          )} */}
          {/* {currentIndex === 3 && (
            <>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: '25%',
                }}>
                <Text style={{fontSize: 16}}> page under development</Text>
              </View>
            </>
          )} */}
        </View>
      </View>
    </ScrollView>
  );
};
export default ViewProfile;
