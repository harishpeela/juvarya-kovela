/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import {getHomeFeedList, getFavoritesList} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
const UserFeedScreen = ({navigation}) => {
  const {favoriteList} = useContext(ApplicationContext);
  const [loading, setloading] = useState(false);
  const [favoriteTemplesList, setfavoriteTemplesList] = useState(favoriteList);
  const [filterFavTemple, setfilterFavTemple] = useState(favoriteList);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const getFollowedTempleList = async () => {
    try {
      let response = await getFavoritesList(0, 100);
      if (response && response.status === 200) {
        // console.log('response', response);
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
  const getHomeResponse = async () => {
    try {
      setloader(true);
      let response = await getHomeFeedList(0, 200);
      // console.log('log data', response?.data);

      // console.log('log res', response);
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
    getHomeResponse();
    getFollowedTempleList();
    favoriteTemplesList.length;
  }, []);
  // console.log('home', homeFeedList);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <BackgroundImage />
        <View style={styles.navBarContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(allTexts.screenNames.menu)}>
              <View style={styles.sidebarIcon}>
                <View style={[styles.bar, styles.shortestBar]} />
                <View style={[styles.bar, styles.mediumBar]} />
                <View style={[styles.bar, styles.longestBar]} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.circle}>
            <FeatherIcon
              name="bell"
              size={14}
              color={colors.orangeColor}
              style={styles.bellIcon}
            />
          </View>
        </View>

        {/* {tab === 1 && ( */}
        <>
          {loader && (
            <View style={{flex: 1}}>
              <Loader color={colors.green2} size={30} />
            </View>
          )}
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
                <UserFeedCompList
                  // id={item?.itemDetails?.id}
                  id={item?.id}
                  post={item}
                  saveid={item.id}
                  // onDotsPress={() => setModelVisible(true)}
                  likes={item?.likesCount}
                  isLikeTrue={item?.like}
                  // onDotsPress={() => setModelVisible(true)}
                  onPressTitle={() =>
                    navigation.navigate(
                      allTexts.screenNames.viewProfile,
                      {
                        id: item?.itemDetails?.id,
                        title: item?.itemDetails?.name,
                        profileImg: item?.itemDetails?.profilePicture,
                        data: item,
                      },
                      // console.log(
                      //   'id: ',
                      //   item?.itemDetails?.id,
                      //   'title',
                      //   item?.itemDetails?.name,
                      //   'profileimg',
                      //   item?.itemDetails?.profilePicturel,
                      //   'count:',
                      //   item?.likesCount,
                      //   'det',
                      //   item,
                      // ),
                    )
                  }
                />
              )}
            />
          </ScrollView>
        </>
      </View>
    </ScrollView>
  );
};

export default UserFeedScreen;
