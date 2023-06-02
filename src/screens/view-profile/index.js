/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ScrollView,
} from 'react-native';
import {BackgroundImage} from '../../components';
import {styles} from './styles';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {allTexts} from '../../common';
import {
  followUnfollowTemple,
  getTempleDetails,
  getFeedList,
  getItemCommunities,
  getUserInfo,
  getTempleList,
} from '../../utils/api';
import {
  ProfileFirstTab,
  ProfileSeconTab,
  ProfileThiredTab,
  ProfileFourthTab,
} from '../../components';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';

const ViewProfile = ({route, navigation}) => {
  const {id, title, profileImg, data} = route.params || {};
  // console.log('=============================>', profileImg);
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [followVisible, setFollowVisible] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [nameData, setNameData] = useState();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState('');
  const [itemCommunity, setItemCommunity] = useState([]);
  const [role, setRole] = useState('');
  const [followCount, setFollowCount] = useState();
  const [templeDetails, setTempleDetails] = useState('');
  const [roleId, setRoleId] = useState('');
  const [details, setDetails] = useState({
    discription: '',
  });
  const Role_Id = async () => {
    let Info = await getUserInfo();
    // console.log('infodata', Info?.data);
    let ROLES = await Info?.data?.roles?.customerItems;
    // console.log('roles111', ROLES);
    let ID = ROLES.find(itemId => itemId.id === id);
    //4330 example id //
    // console.log('iiiiiiiiidddddddddddddddddd', ID);
    if (ID) {
      setRoleId(ID.roles[0]?.roleName);
    } else {
      console.log('u r not admin to create a post');
    }
    // setRole(ROLES);
  };
  const getData = async () => {
    console.log('idid', id);
    // console.log('1');
    try {
      setFollowVisible(true);
      let result = await getTempleDetails(id);
      let feedList = await getFeedList(0, 20, id);
      if (result && result.status === 200 && feedList.status === 200) {
        setloader(false);
        setFollowVisible(false);
        const {
          data: {discription},
        } = result || {};
        setFeedListData(feedList?.data);
        setNameData(result?.data);
        setisFollow(result?.data?.following);
        setFollowCount(result?.data?.followersCount);
        setDetails({
          discription: discription,
          image: profileImg,
          id: id,
        });
      } else {
        setFollowVisible(false);
      }
    } catch (error) {
      setFollowVisible(false);
      console.log(error.message);
    }
  };
  const followTemples = async () => {
    const payload = {
      itemId: id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    try {
      setFollowBtnDisable(true);
      let results = await followUnfollowTemple(payload);
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
      setFollowCount(nameData?.followersCount - 1);
    }
  };
  const getFeedLIsts = async (tempId, pgfrm, pgto) => {
    var myHeaders = new Headers();
    let token = await getAuthTokenDetails();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `http://20.255.59.150:8082/api/v1/feed/item?itemId=${tempId}&page=${pgfrm}&pageSize=${pgto}&popular=true`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          // setItemDetails(result);
          let filteredFeedList = result
            .filter(item => item)
            .map(({mediaList, description}) => ({mediaList, description}));
          setItemDetails(filteredFeedList);
        }
      })
      .catch(error => console.log('error', error));
  };

  const getTempleCommunities = async () => {
    try {
      let response = await getItemCommunities(id, 0, 100);
      const {
        status,
        data: {itemCommunities},
      } = response || {};
      if (response && status === 200) {
        setItemCommunity(itemCommunities);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTemple = async () => {
    let result = await getTempleList(0, 400);
    // console.log('-------------->', result?.data?.items);
    let templeId = result.data.items.find(itemid => itemid?.id === id);
    // console.log('templeId', templeId);
    if (templeId) {
      setTempleDetails(templeId);
    } else {
      // console.log('templedetaile are ==>', templeId);
    }
  };
  useEffect(() => {
    getData();
    getFeedLIsts(id, 0, 100);
    getTempleCommunities();
    nameData;
    Role_Id();
    getTemple();
  }, [route]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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

          <ProfileFirstTab
            profileImg={profileImg}
            itemDetails={itemDetails}
            itemCommunity={itemCommunity}
            followCount={followCount}
          />
          <ProfileSeconTab nameData={nameData} title={title} />
          <ProfileThiredTab
            followBtnDisable={followBtnDisable}
            followTemples={followTemples}
            followVisible={followVisible}
            isFollow={isFollow}
            onPlusPress={() =>
              navigation.navigate(allTexts?.screenNames.createfeed, {
                id: id,
                title: title,
              })
            }
            roleId={roleId}
          />
          <ProfileFourthTab
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            templeDetails={templeDetails}
          />
          {currentIndex === 1 && (
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
                <ScrollView style={{height: '45%'}}>
                  <FlatList
                    numColumns={2}
                    // showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
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
                            height: 160,
                            width: 160,
                          }}
                        />
                      </View>
                    )}
                  />
                </ScrollView>
              )}
            </View>
          )}
          {currentIndex === 3 && (
            <>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: '25%',
                }}>
                <Text style={{fontSize: 16}}> page under development</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default ViewProfile;
