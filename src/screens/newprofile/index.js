/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Pressable,
  Image,
  Text,
  View,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Loader} from '../../components';
import {colors} from '../../common';
import {textStyles, style, styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState, useEffect, useContext} from 'react';
import ApplicationContext from '../../utils/context-api/Context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  followUnfollowTemple,
  getTempleDetails,
  getFeedList,
} from '../../utils/api';
import {allTexts} from '../../common';

const templeData = {
  name: 'Temple 123',
  rating: 4.8,
  followers: 181,
  city: 'Hudkeshwar',
  description:
    'Temple 123 is a wonderful temple situated in the heart of Nagpur. It was developed by...',
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
};

const TempleProfile = ({route, navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState(false);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [followVisible, setFollowVisible] = useState(false);
  const [nameData, setNameData] = useState();
  const [tab, setTab] = useState(false);
  const [viewIndex, setViewIndex] = useState(1);
  const [tabIndex, setTabIndex] = useState();
  const [itemDetails, setItemDetails] = useState([]);
  const [details, setDetails] = useState({
    discription: '',
  });
  const {id, title, profileImg, data} = route.params || {};
  const getData = async () => {
    try {
      setFollowVisible(true);
      let result = await getTempleDetails(id);
      // console.log('res', result?.data);
      let feedList = await getFeedList(0, 20, id);
      if (result && result.status === 200 && feedList.status === 200) {
        setloader(false);
        setFollowVisible(false);
        const {
          data: {discription},
        } = result || {};
        setFeedListData(feedList?.data);
        setNameData(result.data);
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
  const getFeedLIst = (tempId, pgfrm, pgto) => {
    // console.log(tempId, pgfrm, pgto);
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
  const {userDetails} = useContext(ApplicationContext);
  // console.log('role', userDetails);
  let feeddata = getFeedLIst(id, 0, 50);
  // console.log('feed :', feedListData);
  useEffect(() => {
    getData();
    // feeddata;
    if (viewIndex === 2) {
      setTabIndex(1);
      getFeedLIst(id, 0, 50);
    } else {
      setTabIndex(0);
    }
  }, []);
  return (
    <ImageBackground
      source={{uri: templeData.images[currentIndex].uri}}
      style={{...styles.backgroundImage, flex: viewIndex === 1 ? 1 : 0}}>
      <View style={styles.container} />
      <View style={styles.container} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: '5%'}}>
        <Feather
          name="arrow-left-circle"
          color={'#FFA001'}
          size={28}
          style={{marginLeft: '15%'}}
        />
      </TouchableOpacity>
      {viewIndex === 1 && (
        <View style={styles.container}>
          <View style={styles.imagePanel}>
            {templeData.images.map((image, index) => {
              return (
                <Pressable
                  style={styles.imagePanel.item}
                  onPress={() => setCurrentIndex(index)}>
                  <Image
                    source={{uri: image.uri}}
                    style={{
                      width: 50,
                      height: 50,
                      borderColor:
                        index == currentIndex ? '#FFA001' : 'transparent',
                      borderWidth: 2,
                      borderRadius: 10,
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {viewIndex == 1 && (
        <View style={styles.footerBackground}>
          <TouchableOpacity
            style={{width: 120, alignSelf: 'center'}}
            onPress={() => setViewIndex(2)}>
            <TouchableOpacity
              style={{
                ...styles.sliderTooltip,
                borderColor: tab ? '#FFA001' : 'black',
              }}
              onPress={() => setViewIndex(2)}
            />
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <View style={styles.footerHead}>
              <Text>
                <Text style={styles.boldText} numberOfLines={1}>
                  {title.length < 17
                    ? `${title}`
                    : `${title.substring(0, 17)}...`}
                  &nbsp;&nbsp;
                </Text>
                <Text style={styles.ratingText}>
                  <AntDesign name={'star'} color={'#FFA001'} size={14} />
                  <Text> {templeData.rating}</Text>
                </Text>
              </Text>

              <TouchableOpacity
                style={styles.circularButton}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                    id: id,
                    title: title,
                    profileImg: profileImg,
                  })
                }>
                <Text style={styles.circularButton.text}>View Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.subFooterHead}>
              <Text style={{fontWeight: '600'}}>
                {templeData.followers} &nbsp;
              </Text>
              <Text style={{color: '#FFA001', fontSize: 12}}>
                Followers &nbsp;
              </Text>
              <Text>
                <Feather name="map-pin" color={'#FFA001'} size={14} />

                <Text style={{color: 'grey'}}>&nbsp;{templeData.city}</Text>
              </Text>
            </View>

            <View style={styles.footerBody}>
              <Text>{data?.description} &nbsp;&nbsp;</Text>
            </View>

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
                <TouchableOpacity onPress={() => alert('under development')}>
                  <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.controlPanel}>
              <Pressable style={styles.controlPanel.item}>
                <Feather name="grid" color={'#585858'} size={24} />
                <Text style={styles.controlPanel.item.text}>Posts</Text>
              </Pressable>

              <Pressable style={styles.controlPanel.item}>
                <MaterialCommunityIcons
                  name="movie-open-outline"
                  color={'#585858'}
                  size={24}
                />
                <Text style={styles.controlPanel.item.text}>Reels</Text>
              </Pressable>

              <Pressable style={styles.controlPanel.item}>
                <Entypo name="shop" color={'#585858'} size={24} />
                <Text style={styles.controlPanel.item.text}>Services</Text>
              </Pressable>

              <Pressable style={styles.controlPanel.item}>
                <MaterialCommunityIcons
                  name="movie-open-outline"
                  color={'#585858'}
                  size={24}
                />
                <Text style={styles.controlPanel.item.text}>Events</Text>
              </Pressable>

              <Pressable style={styles.controlPanel.item}>
                <MaterialCommunityIcons
                  name="movie-open-outline"
                  color={'#585858'}
                  size={24}
                />
                <Text style={styles.controlPanel.item.text}>Donate</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      {viewIndex == 2 && (
        <View style={{...styles.footerBackground, height: '100%'}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', margin: '3%'}}>
            <TouchableOpacity onPress={() => setViewIndex(1)}>
              <Feather
                name="arrow-left-circle"
                color={'#FFA001'}
                size={28}
                style={{marginLeft: '15%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                borderColor: tab ? '#FFA001' : 'green',
                borderWidth: 2,
                marginLeft: '20%',
                backgroundColor: tab ? '#FFA001' : 'green',
              }}
              onPress={() => setTab(!tab)}
            />
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.footerHead}>
              <Text>
                <Text style={styles.boldText} numberOfLines={1}>
                  {title.length < 17
                    ? `${title}`
                    : `${title.substring(0, 17)}...`}
                  &nbsp;&nbsp;
                </Text>
                <Text style={styles.ratingText}>
                  <AntDesign name={'star'} color={'#FFA001'} size={14} />
                  <Text> {templeData.rating}</Text>
                </Text>
              </Text>

              <TouchableOpacity
                style={styles.circularButton}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                    id: id,
                    title: title,
                    profileImg: profileImg,
                  })
                }>
                <Text style={styles.circularButton.text}>View Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.subFooterHead}>
              <Text style={{fontWeight: '600'}}>
                {templeData.followers} &nbsp;
              </Text>
              <Text style={{color: '#FFA001', fontSize: 12}}>
                Followers &nbsp;
              </Text>
              <Text>
                <Feather name="map-pin" color={'#FFA001'} size={14} />

                <Text style={{color: 'grey'}}>&nbsp;{templeData.city}</Text>
              </Text>
            </View>

            <View style={styles.footerBody}>
              <Text>{data?.description} &nbsp;&nbsp;</Text>
            </View>

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
                <TouchableOpacity onPress={() => alert('under development')}>
                  <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.controlPanel}>
              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setTabIndex(1)}>
                <Feather
                  name="grid"
                  color={tabIndex == 1 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: tabIndex == 1 ? '#FFA001' : '#585858',
                  }}>
                  Posts
                </Text>
              </Pressable>

              <Pressable
                style={{...styles.controlPanel.item}}
                onPress={() => setTabIndex(2)}>
                <MaterialCommunityIcons
                  name="movie-open-outline"
                  color={tabIndex == 2 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: tabIndex == 2 ? '#FFA001' : '#585858',
                  }}>
                  Reels
                </Text>
              </Pressable>

              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setTabIndex(3)}>
                <Entypo
                  name="shop"
                  color={tabIndex == 3 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.selectedText,
                    color: tabIndex == 3 ? '#FFA001' : '#585858',
                  }}>
                  Services
                </Text>
              </Pressable>

              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setTabIndex(4)}>
                <FontAwesome
                  name="calendar-plus-o"
                  color={tabIndex == 4 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: tabIndex == 4 ? '#FFA001' : '#585858',
                  }}>
                  Events
                </Text>
              </Pressable>

              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setTabIndex(5)}>
                <FontAwesome5
                  name="hand-holding-heart"
                  color={tabIndex == 5 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: tabIndex == 5 ? '#FFA001' : '#585858',
                  }}>
                  Donate
                </Text>
              </Pressable>
            </View>
          </View>
          {tabIndex === 1 && (
            <View style={{...styles.contentDisplay, margin: 10}}>
              <View style={styles.contentDisplay.row}>
                <Text style={{fontSize: 20}}>Posts</Text>
                <TouchableOpacity>
                  <Text style={{color: '#FFA001', fontSize: 14}}>See all</Text>
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
                      {/* <Text style={{fontSize: 16, marginLeft: 5}}>
                        {item?.mediaList[0]?.id}
                      </Text> */}
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
        </View>
      )}
    </ImageBackground>
  );
};

export default TempleProfile;

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
