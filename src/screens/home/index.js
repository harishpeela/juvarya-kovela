import {View, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {allTexts, colors} from '../../common';
import {HomeCard, HomeHeader, HomeTabs, Loader} from '../../components';
import {styles} from './style';
import ApplicationContext from '../../utils/context-api/Context';
import {getHomeFeedList, getFavoritesList} from '../../utils/api';

const Home = ({navigation}) => {
  const {userDetails, favoriteList} = useContext(ApplicationContext);
  const [favoriteTemplesList, setfavoriteTemplesList] = useState(favoriteList);
  const [filterFavTemple, setfilterFavTemple] = useState(favoriteList);
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [refrsh, setRefrsh] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);

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
        console.log('Home Response 786', feeds);
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
    console.log('num of favourates', favoriteTemplesList.length);
  },[]);
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <HomeHeader
          text={`${favoriteTemplesList.length}`}
          onPress={() => navigation.navigate(allTexts.tabNames.favorites)}
          img={require('../../utils/assets/images/avatar.png')}
          name={userDetails?.username}
          plusVisible={userDetails?.role === allTexts.constants.role.admin}
          onBellPress={() => navigation.navigate(allTexts.screenNames.events)}
        />
        {/* <HomeTabs /> */}
      </View>
      <View style={styles.cardContainer}>
        {loader ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.green2} />
          </View>
        ) : (
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
                // date={'Aug 31. 2022'}
                text={item.description}
                // hashTag={'#srinookambikatemple'}
                icon={item?.itemDetails?.profilePicture}
                img={item?.mediaList[0]?.url}
                likes={item?.likesCount}
                isLikeTrue={item?.like}
                id={item?.id}
                followId={item?.itemDetails?.id}
                // saved={'3.233'}
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
    </SafeAreaView>
  );
};

export default Home;
