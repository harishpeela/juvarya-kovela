/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage, NearBy, NearByMainTab, UpComingEvents} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import {getHomeFeedList, getFavoritesList} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import NearByProducts from '../nearByProducts';
import NearByServices from '../nearByServices';
const UserFeedScreen = ({navigation}) => {
  const {favoriteList} = useContext(ApplicationContext);
  const [loading, setloading] = useState(false);
  const [favoriteTemplesList, setfavoriteTemplesList] = useState(favoriteList);
  const [filterFavTemple, setfilterFavTemple] = useState(favoriteList);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [tab, setTab] = useState(1);
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
  const getHomeResponse = async () => {
    try {
      setloader(true);
      let response = await getHomeFeedList(0, 100);
      console.log('log', response?.data?.feed);
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
            <TouchableOpacity
              style={{
                ...styles.button,
                borderBottomWidth: tab === 1 ? 2 : 0,
                borderBottomColor: 'red',
              }}
              onPress={() => setTab(1)}>
              <Text
                style={{
                  color: tab === 1 ? 'red' : 'black',

                  fontSize: tab === 1 ? 20 : 18,
                }}>
                Feed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(2)}
              style={{
                ...styles.button,
                borderBottomWidth: tab === 2 ? 2 : 0,
                borderBottomColor: 'red',
              }}>
              <Text
                style={{

                  color: tab === 2 ? 'red' : 'black',

                  fontSize: tab === 2 ? 20 : 18,
                }}>
                Nearby
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.circle}>
            <FeatherIcon
              name="bell"
              size={14}
              color="#000"
              style={styles.bellIcon}
            />
          </View>
        </View>
        {tab === 1 && (
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
                    likes={item?.likesCount}
                    isLikeTrue={item?.like}
                    onPressTitle={() =>
                      navigation.navigate(
                        allTexts.screenNames.viewProfile,
                        {
                          id: item?.itemDetails?.id,
                          title: item?.itemDetails?.name,
                          profileImg: item?.itemDetails?.profilePicture,
                          data: item,
                        },
                        console.log(
                          'id: ',
                          item?.itemDetails?.id,
                          'title',
                          item?.itemDetails?.name,
                          'profileimg',
                          item?.itemDetails?.profilePicturel,
                          'count:',
                          item?.likesCount,
                          'det',
                          item,
                        ),
                      )
                    }
                  />
                )}
              />
            </ScrollView>
          </>
        )}
        {tab === 2 && (
          <SafeAreaView>
            <View>
              <NearBy />
            </View>
          </SafeAreaView>
        )}
      </View>
    </ScrollView>
  );
};

export default UserFeedScreen;
