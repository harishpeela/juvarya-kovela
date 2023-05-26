/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
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
} from '../../utils/api';
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
const Data = [
  {
    id: 1,
    name: 'pooja',
    cost: '250',
  },
  {
    id: 2,
    name: 'dharsanam',
    cost: '100',
  },
  {
    id: 3,
    name: 'alaya pravesam',
    cost: '50',
  },
  {
    id: 4,
    name: 'prasadam',
    cost: '20',
  },
  {
    id: 5,
    name: 'prasadam',
    cost: '20',
  },
  {
    id: 6,
    name: 'prasadam',
    cost: '20',
  },
];
const ViewProfile = ({route, navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {id, title, profileImg, data} = route.params || {};
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [followVisible, setFollowVisible] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [nameData, setNameData] = useState();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState('');
  const [community, setCommunity] = useState('');
  const [itemCommunity, setItemCommunity] = useState([]);
  const [details, setDetails] = useState({
    discription: '',
  });
  console.log('id', id, title, profileImg, data);
  const getData = async () => {
    console.log('idid', id);
    try {
      setFollowVisible(true);
      let result = await getTempleDetails(id);
      console.log('res', result);
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
  console.log('nameData', nameData);
  const followTemples = async () => {
    const payload = {
      itemId: id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    // console.log('pay', payload);
    try {
      setFollowBtnDisable(true);
      let results = await followUnfollowTemple(payload);
      // console.log('results', results?.data);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        // console.log('results', results.json());
        setFollowBtnDisable(false);

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
  const getFeedLIsts = (tempId, pgfrm, pgto) => {
    console.log(tempId, pgfrm, pgto);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer a63cc4b9-a3f3-46c2-b3a6-57a3b3221e1e',
    );

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
  //console.log('medialist', itemDetails);

  const getTempleCommunities = async itemId => {
    try {
      let response = await getItemCommunities(itemId, 0, 100);
      console.log('community', response?.data);
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

  console.log('Item Community', itemCommunity?.length);

  useEffect(() => {
    getData();
    getFeedLIsts(id, 0, 50);
    getTempleCommunities(id, 0, 100);
  }, [route]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}} >
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
              <Image
                source={{uri: profileImg}}
                style={{
                  width: 80,
                  height: 80,
                  borderColor: '#FFA001',
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              />

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
                  {nameData?.followersCount}
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
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 18,
                  textTransform: 'capitalize',
                }}>
                • {nameData?.desciption}
              </Text>
            </View>

            {/* <View style={styles.footerBody}>
              {templeData.points.map((item, index) => {
                return (
                  <Text key={index} style={{fontSize: 14, lineHeight: 18}}>
                    • {item}
                  </Text>
                );
              })}
            </View> */}

            <View style={styles.footerAction}>
              {followVisible ? (
                <View
                  style={{
                    width: 105,
                    padding: 10,
                    height: 38,
                    backgroundColor: '#FFA001',
                    borderRadius: 10,
                    marginRight: 4,
                  }}>
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
              {userDetails.role === 'ROLE_ADMIN' && (
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
            </View>
            {currentIndex === 1 && (
              <View style={styles.contentDisplay}>
                <View style={styles.contentDisplay.row}>
                  <Text style={{fontSize: 20}}>Posts</Text>
                  <TouchableOpacity>
                    <Text style={{color: '#FFA001', fontSize: 14}}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
                {itemDetails.length === 0 ? (
                  <View style={{alignItems: 'center', marginTop: '15%'}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      Posts not created for this temple
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={itemDetails}
                    keyExtractor={({item, index}) => index}
                    renderItem={({item, index}) => (
                      <View style={{marginRight: 20}}>
                        <Image
                          source={{
                            uri: item?.mediaList?.url
                              ? item?.mediaList?.url
                              : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1670905787229_shiva pic 2.png',
                          }}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100 / 3,
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            marginTop: 2,
                          }}>
                          {item?.description ? item?.description : 'Kovela'}{' '}
                        </Text>
                      </View>
                    )}
                  />
                )}
              </View>
            )}
            {currentIndex === 3 && (
              <>
                <View style={styles.contentDisplay}>
                  <View style={styles.contentDisplay.row}>
                    <Text style={{fontSize: 20}}>Services</Text>
                    <TouchableOpacity>
                      <Text style={{color: '#FFA001', fontSize: 14}}>
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={itemDetails}
                    keyExtractor={({item, index}) => index}
                    renderItem={({item, index}) => (
                      <View style={{marginRight: 20}}>
                        <Text style={{fontSize: 16, marginLeft: 5}}>
                          {item?.mediaList?.id}
                        </Text>
                        <Image
                          source={{
                            uri: item?.mediaList[0]?.url
                              ? item?.mediaList[0]?.url
                              : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1670905787229_shiva pic 2.png',
                          }}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100 / 2,
                          }}
                        />
                      </View>
                    )}
                  />
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
