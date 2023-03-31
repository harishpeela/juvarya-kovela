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
} from 'react-native';
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
  // const handleLike = postId => {
  //   // console.log(`Liked post ${postId}`);
  // };

  // const handleShare = postId => {
  //   // console.log(`Shared post ${postId}`);
  // };

  // const handleSave = postId => {
  //   // console.log(`Saved post ${postId}`);
  // };

  // const renderMedia = post => {
  //   if (post?.mediaList?.url) {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Video
  //           source={{uri: post.video}}
  //           style={styles.video}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   } else if (post?.mediaList?.url) {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={{uri: post.image}}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // };
  // const renderImage = post => {
  //   if (!post?.mediaList === '') {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={{uri: post.image}}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   } else if (post?.itemDetails?.profilePicture) {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={{uri: post?.itemDetails?.profilePicture}}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={require('../../../assets/images/islamabad.jpg')}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   }
  // };
  useEffect(() => {
    getHomeResponse();
    getFollowedTempleList();
    favoriteTemplesList.length;
    // console.log('num of favourates', favoriteTemplesList.length);
  }, []);
  // console.log('homefeed', homeFeedList);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <BackgroundImage />
        {/* side bar port?ion  */}
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Feed</Text>
              <View style={styles.underline}>
                <Text style={styles.buttonText}>Feed</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText2}>Reels</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText2}>Nearby</Text>
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
                    allTexts.screenNames.templeProfile,
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
                    ),
                  )
                }
              />
            )}
          />
        </ScrollView>
        {/* feed portion  */}
      </View>
    </ScrollView>
  );
};

export default UserFeedScreen;
