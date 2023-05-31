/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {styles, textStyles, style} from './styles';
import React, {useState, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts} from '../../common';
import {Loader} from '../../components';
import {
  followUnfollowTemple,
  getTempleDetails,
  getFeedList,
  getItemCommunities,
  getUserInfo,
  getTempleList,
} from '../../utils/api';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
const templeData = {
  name: 'Temple 123',
  rating: 4.8,
  followers: '2.2m',
  city: 'Hudkeshwar',
  description:
    'Temple 123 is a wonderful temple situated in the heart of Nagpur. It was developed by...',
  posts: 100,
  products: 25,
  points: [
    'Temple 123 is a wonderful temple',
    'It is situated in the heart of Nagpur.',
    'It was developed under the guidance of Adishakti',
    'Visit us and feel the cosmic energy.',
  ],
  images: [
    {
      uri: 'https://thumbs.dreamstime.com/b/indian-temple-3396438.jpg',
    },
    {
      uri: 'https://i.pinimg.com/736x/5b/a7/36/5ba736a47ea684c03ffc261c56d5da40.jpg',
    },
    {
      uri: 'https://i.pinimg.com/736x/70/10/c5/7010c580e3d009134fcddde0cc4afdd9.jpg',
    },
    {
      uri: 'https://w0.peakpx.com/wallpaper/133/250/HD-wallpaper-hindu-temple.jpg',
    },
  ],
  petalImage: 'https://www.linkpicture.com/q/hello.png',
};

const ViewProfile = ({route, navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {id, title, profileImg, data} = route.params || {};
  console.log('=============================>', id);
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
    console.log('roles111', ROLES);
    let ID = ROLES.find(itemId => itemId.id === id);
    //4330 example id //
    console.log('iiiiiiiiidddddddddddddddddd', ID);
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
        <ImageBackground
          source={{uri: templeData.petalImage}}
          style={{height: 400}}>
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

            <View style={styles.infoContainer}>
              <Image source={{uri: profileImg}} style={styles.profileView} />

              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  {itemDetails?.length}
                </Text>
                <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
                  Posts
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  {followCount}
                </Text>
                <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
                  Followers
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  {itemCommunity?.length}
                </Text>
                <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
                  Communities
                </Text>
              </View>
            </View>

            <View style={styles.footerHead}>
              <Text>
                <Text style={styles.boldText} numberOfLines={1}>
                  {title.length < 17
                    ? `${title}`
                    : `${title.substring(0, 17)}...`}{' '}
                  &nbsp;&nbsp;
                </Text>
                <Text style={styles.ratingText}>
                  <AntDesign name={'star'} color={'#FFA001'} size={20} />{' '}
                  {templeData.rating}
                </Text>
              </Text>
            </View>

            <View style={styles.subFooterHead}>
              <Text style={{color: '#FFA001', fontSize: 18}}>
                {templeData.city}
              </Text>
            </View>

            <View style={styles.footerBody}>
              <Text style={styles.desciption}>• {nameData?.desciption}</Text>
            </View>
            <View style={styles.footerAction}>
              {followVisible ? (
                <View style={styles.followLoader}>
                  <Loader
                    color={'white'}
                    size={'small'}
                    dynmicStyle={styles.loader}
                  />
                </View>
              ) : (
                <PrimaryButton1
                  bgColor={'#FFA001'}
                  disabled={followBtnDisable}
                  radius={10}
                  padding={7}
                  onPress={followTemples}
                  text={
                    isFollow
                      ? allTexts.buttonTexts.unFollow
                      : allTexts.buttonTexts.follow
                  }
                />
              )}

              <Pressable style={styles.voidButton}>
                <Text style={styles.voidButton.text}>Contact</Text>
              </Pressable>

              <Pressable style={styles.voidButton}>
                <Text style={styles.voidButton.text}>Directions</Text>
              </Pressable>
              {roleId === 'ROLE_ITEM_ADMIN' && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(allTexts?.screenNames.createfeed, {
                      id: id,
                      title: title,
                    })
                  }>
                  <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.controlPanel}>
              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setCurrentIndex(1)}>
                <Feather
                  name="grid"
                  color={currentIndex == 1 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: currentIndex == 1 ? '#FFA001' : '#585858',
                  }}>
                  Posts
                </Text>
              </Pressable>

              {templeDetails?.reelsEnabled && (
                <Pressable
                  style={{...styles.controlPanel.item}}
                  onPress={() => setCurrentIndex(2)}>
                  <MaterialCommunityIcons
                    name="movie-open-outline"
                    color={currentIndex == 2 ? '#FFA001' : '#585858'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.controlPanel.item.text,
                      color: currentIndex == 2 ? '#FFA001' : '#585858',
                    }}>
                    Reels
                  </Text>
                </Pressable>
              )}
              {templeDetails?.servicesEnabled && (
                <Pressable
                  style={styles.controlPanel.item}
                  onPress={() => setCurrentIndex(3)}>
                  <Entypo
                    name="shop"
                    color={currentIndex == 3 ? '#FFA001' : '#585858'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.controlPanel.item.selectedText,
                      color: currentIndex == 3 ? '#FFA001' : '#585858',
                    }}>
                    Services
                  </Text>
                </Pressable>
              )}
              {templeDetails?.ecommerceEnabled && (
                <Pressable
                  style={styles.controlPanel.item}
                  onPress={() => setCurrentIndex(4)}>
                  <FontAwesome
                    name="calendar-plus-o"
                    color={currentIndex == 4 ? '#FFA001' : '#585858'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.controlPanel.item.text,
                      color: currentIndex == 4 ? '#FFA001' : '#585858',
                    }}>
                    Events
                  </Text>
                </Pressable>
              )}

              {templeDetails?.donationsEnabled && (
                <Pressable
                  style={styles.controlPanel.item}
                  onPress={() => setCurrentIndex(5)}>
                  <FontAwesome5
                    name="hand-holding-heart"
                    color={currentIndex == 5 ? '#FFA001' : '#585858'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.controlPanel.item.text,
                      color: currentIndex == 5 ? '#FFA001' : '#585858',
                    }}>
                    Donate
                  </Text>
                </Pressable>
              )}
            </View>
            {currentIndex === 1 && (
              <View style={styles.contentDisplay}>
                <View style={styles.contentDisplay.row}>
                  <Text style={{fontSize: 20}}>Posts</Text>
                  {/* <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(allTexts.screenNames.posts, {
                        posts: itemDetails,
                      })
                    }>
                    <Text style={{color: '#FFA001', fontSize: 14}}>
                      See all
                    </Text>
                  </TouchableOpacity> */}
                </View>
                {itemDetails.length === 0 ? (
                  <View style={{alignItems: 'center', marginTop: '15%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textTransform: 'capitalize',
                      }}>
                      no posts for this temple
                    </Text>
                  </View>
                ) : (
                  <View style={{height: '75%'}}>
                    <FlatList
                      numColumns={2}
                      showsHorizontalScrollIndicator={false}
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
                          {/* <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            marginTop: 2,
                          }}>
                          {item?.description ? item?.description : 'Kovela'}{' '}
                        </Text> */}
                        </View>
                      )}
                    />
                  </View>
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
        </ImageBackground>
      </View>
    </View>
  );
};
export default ViewProfile;
const PrimaryButton1 = ({
  bgColor,
  textColor,
  radius,
  text,
  onPress,
  loading,
  padding,
  fontsize,
  width,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style(bgColor, radius, padding, width).wrapper}
      {...props}>
      <Text style={textStyles(textColor, fontsize).textTitle}>
        {loading == true ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  );
};
