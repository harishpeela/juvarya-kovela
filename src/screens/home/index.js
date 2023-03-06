/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {allTexts, colors, fontFamily} from '../../common';
import {HomeCard, HomeHeader, HomeTabs, Loader} from '../../components';
import {styles} from './style';
import ApplicationContext from '../../utils/context-api/Context';
import {getHomeFeedList, getFavoritesList} from '../../utils/api';
import Icon from 'react-native-vector-icons/Entypo';
import BellIcon from 'react-native-vector-icons/FontAwesome5';
import {
  NearBy,
  UpComingEvents,
  NearByMainTab,
  NearByProducts,
  NearByServices,
} from '../../components/NearBy';
import {data, Data1} from '../../components/NearBy';
import {ScrollView} from 'react-native-gesture-handler';
const Home = ({navigation}) => {
  const {userDetails, favoriteList} = useContext(ApplicationContext);
  const [favoriteTemplesList, setfavoriteTemplesList] = useState(favoriteList);
  const [filterFavTemple, setfilterFavTemple] = useState(favoriteList);
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [refrsh, setRefrsh] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

  const getFollowedTempleList = async () => {
    try {
      let response = await getFavoritesList(0, 100);
      if (response && response.status === 200) {
        const {
          data: {followingObjects},
        } = response;
        setloading(false);
        if (followingObjects.length > 0) {
          setfavoriteTemplesList(followingObjects);
          setfilterFavTemple(followingObjects);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeResponse();
  }, []);
  console.log('my listsss', favoriteTemplesList.length);
  const getHomeResponse = async () => {
    try {
      setloader(true);
      let response = await getHomeFeedList(0, 100);
      if (response && response.status === 200) {
        const {
          data: {feeds},
        } = response || {};
        setHomeFeedList(feeds);
        setloader(false);
        setRefrsh(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowedTempleList();
    favoriteTemplesList.length;
    // console.log('num of favourates', favoriteTemplesList.length);
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* <ImageBackground
        source={require('../../utils/assets/images/homeBackGround.png')}
        style={{flex: 1, height: 400}}> */}
      {/* <View style={styles.topContainer}> */}
      {/* <View style={{position: 'absolute', top: 20}}>
          <Text style={{fontSize: 32}}>Kovela </Text>
        </View> */}
      {/* <HomeHeader
          text={`${favoriteTemplesList.length}`}
          onPress={() => navigation.navigate(allTexts.tabNames.favorites)}
          img={require('../../utils/assets/images/avatar.png')}

           name={userDetails?.username}
          plusVisible={userDetails?.role === allTexts.constants.role.admin}
          // onBellPress={() => navigation.navigate(allTexts.screenNames.events)}
          onBellPress={() => alert('page under development')}
        /> */}
      {/* <HomeTabs /> */}
      {/* </View> */}
      <View
        style={{
          borderRadius: 20,
          height: 50,
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontFamily: fontFamily.PoetsenOneRegular,
          }}>
          Kovela{' '}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        {loader ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.green2} />
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={homeFeedList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refrsh}
                  onRefresh={() => {
                    setRefrsh(true);
                    getHomeResponse();
                  }}
                />
              }
              contentContainerStyle={styles.flatListStyle}
              keyboardShouldPersistTaps="handled"
              decelerationRate={0.7}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <HomeCard
                  heading={item?.itemDetails?.name}
                  text={item.description}
                  icon={item?.itemDetails?.profilePicture}
                  img={item?.mediaList[0]?.url}
                  likes={item?.likesCount}
                  isLikeTrue={item?.like}
                  id={item?.id}
                  followId={item?.itemDetails?.id}
                  isFollowing={item?.itemDetails?.following}
                  onCardPress={() => {
                    navigation.navigate(allTexts.screenNames.homeDetails, {
                      id: item?.itemDetails?.id,
                      title: item?.itemDetails?.name,
                    });
                  }}
                />
              )}
            />
          </ScrollView>
        )}
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // margin: 10,
          marginTop: 30,
        }}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
      <TouchableOpacity>
            <Icon name="menu" size={30} />
          </TouchableOpacity>
      <Pressable
            style={{
              height: 35,
              width: '22%',
              // justifyContent: 'center',
            }}
            onPress={() => setTabIndex(1)}>
            <Text
              style={{
                ...styles.tabText,
                color: tabIndex == 1 ? 'black' : 'gray',
                borderBottomColor: tabIndex === 1 ? 'black' : 'white',
                borderBottomWidth: 3,
              }}>
              Feed
            </Text>
          </Pressable>
      <Pressable
            style={{
              height: 35,
              width: '23%',
              // justifyContent: 'center',
            }}
            onPress={() => setTabIndex(2)}>
            <Text
              style={{
                ...styles.tabText,
                color: tabIndex == 2 ? 'black' : 'gray',
                borderBottomColor: tabIndex === 2 ? 'black' : 'white',
                borderBottomWidth: 3,
              }}>
              Reels
            </Text>
          </Pressable>
      <Pressable
            style={{
              height: 35,
              width: '32%',
              // marginRight: 20,
              // justifyContent: 'center',
            }}
            onPress={() => setTabIndex(3)}>
            <Text
              style={{
                ...styles.tabText,
                color: tabIndex == 3 ? 'black' : 'gray',
                borderBottomColor: tabIndex === 3 ? 'black' : 'white',
                borderBottomWidth: 3,
              }}>
              NearBy
            </Text>
          </Pressable>
      </View>
      <View style={{marginRight: '3%'}}>
          <TouchableOpacity
            style={{borderWidth: 1, padding: 7, borderRadius: 35}}>
            <BellIcon name="bell" size={18} color={'black'} />
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <ScrollView>
        {tabIndex === 1 && (
          <View style={styles.cardContainer}>
            {loader ? (
              <View style={styles.loaderContainer}>
                <Loader color={colors.green2} />
              </View>
            ) : (
              <FlatList
                data={homeFeedList}
                showsVerticalScrollIndicator={false}
                scr
                refreshControl={
                  <RefreshControl
                    refreshing={refrsh}
                    onRefresh={() => {
                      setRefrsh(true);
                      getHomeResponse();
                    }}
                  />
                }
                contentContainerStyle={styles.flatListStyle}
                keyboardShouldPersistTaps="handled"
                decelerationRate={0.7}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                  <HomeCard
                    heading={item?.itemDetails?.name}
                    text={item.description}
                    icon={item?.itemDetails?.profilePicture}
                    img={item?.mediaList[0]?.url}
                    likes={item?.likesCount}
                    isLikeTrue={item?.like}
                    id={item?.id}
                    followId={item?.itemDetails?.id}
                    isFollowing={item?.itemDetails?.following}
                    onCardPress={() => {
                      navigation.navigate(allTexts.screenNames.homeDetails, {
                        id: item?.itemDetails?.id,
                        title: item?.itemDetails?.name,
                      });
                    }}
                  />
                )}
              />
            )}
          </View>
        )}
        {tabIndex === 2 && <View />}
        {tabIndex === 3 && (
          <View style={{flex: 1}}>
            <NearBy myData={Data1} />
            <ScrollView>
              <NearByMainTab ProductsData={data} />
              <UpComingEvents upcomingData={Data1} />
              <NearByProducts
                productsData={Data1}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.nearByProducts)
                }
              />
              <NearByServices
                servicesData={Data1}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.nearByServices)
                }
              />
            </ScrollView>
          </View>
          // </ScrollView>
        )}
      </ScrollView> */}
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default Home;
