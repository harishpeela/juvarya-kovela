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
import {getTempleList, FollowUnFollow} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {ProfileSeconTab} from '../../components';
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
  //   'userdetails',
  //   userDetails,
  // );
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState(false);
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
  const ROLE = () => {
    let USERROLE = userDetails?.role;
    console.log('role', USERROLE);
  };
  const followTemples = async () => {
    const payload = {
      itemId: data?.id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    try {
      setFollowBtnDisable(true);
      let results = await FollowUnFollow(payload);
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
  let token = getAuthTokenDetails();

  const getFeedLIsts = async (tempId, pgfrm, pgto) => {
    var myHeaders = new Headers();
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

  // const getTempleCommunities = async () => {
  //   try {
  //     let response = await getItemCommunities(id, 0, 100);
  //     console.log('res', response);
  //     const {
  //       status,
  //       data: {itemCommunities},
  //     } = response || {};
  //     console.log('community', itemCommunities);
  //     if (response && status === 200) {
  //       setItemCommunity(itemCommunities);
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
  let Token = getAuthTokenDetails();
  const createFeedAccess = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://20.255.59.150:9096/jtprofile/admin/verify?profileId=1&customerId=2',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log('result----> api', result))
      .catch(error => console.log('error', error));
  };
  const TempleRoleSearchWithId = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gIFwiaWRcIiA6IDM4LFxuICBcInVzZXJuYW1lXCIgOiBcInZhbXNpa05NMTIzNFwiLFxuICBcImVtYWlsXCIgOiBcInZhbXNpa05NMTIzNEBqdXZhcnlhLmNvbVwiLFxuICBcInBhc3N3b3JkXCIgOiBudWxsLFxuICBcImZpcnN0TmFtZVwiIDogXCJWYW1zaVwiLFxuICBcImxhc3ROYW1lXCIgOiBcIkNIXCIsXG4gIFwicm9sZXNcIiA6IFsgXCJST0xFX1VTRVJcIiwgXCJST0xFX0FETUlOXCIgXVxufSIsInJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwiaWF0IjoxNjg2MzA4NTM2LCJleHAiOjE2ODYzOTQ5MzZ9.gEQKUEvv4qoEhuo6-7p0zwSNAKbrl3LMlgeGpp6P4dfqi5AaoQkS7aW8bIQhaP0ggauevugWWJU6GvruHMpCfQ',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://fanfundev.eastasia.cloudapp.azure.com:9096/jtprofile/customer-roles?profileId=22',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setRoleId(result?.roles[0]);
        }
      })
      .catch(error => console.log('error', error));
  };
  console.log('roleid', roleId);
  useEffect(() => {
    // getData();
    // getFeedLIsts(id, 0, 100);
    // getTempleCommunities();
    nameData;
    // Role_Id();
    // getTemple();
    ROLE();
    TempleRoleSearchWithId();
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
            <ProfileComp profileImg={data?.mediaList?.url} />
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
          <ProfileSeconTab nameData={data} title={data?.description} />
          <View style={styles.followtab}>
            <FolloUnfollowComp
              followBtnDisable={followBtnDisable}
              followTemples={followTemples}
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
          {/* <ProfileFourthTab
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            templeDetails={templeDetails}
          /> */}
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
