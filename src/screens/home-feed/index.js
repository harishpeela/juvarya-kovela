/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import styles from './styles';
import {BackgroundImage} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import {getHomeFeedList, getFavoritesList} from '../../utils/api';
import {likeOrUnlikeFeed} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
const UserFeedScreen = ({navigation}) => {
  const {userDetails, favoriteList} = useContext(ApplicationContext);
  const [loading, setloading] = useState(false);
  const [favoriteTemplesList, setfavoriteTemplesList] = useState(favoriteList);
  const [filterFavTemple, setfilterFavTemple] = useState(favoriteList);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const posts = [
    {
      id: 1,
      name: 'temple123',
      type: 'image',
      image:
        'https://thumbs.dreamstime.com/b/hindu-temple-flag-trees-hindu-small-temple-flag-trees-151501180.jpg',
      liked: false,
      shared: false,
      sdt: '1 hour ago',
      likes: '4',
    },
    {
      id: 2,
      name: 'temple123',
      type: 'video',
      video:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      liked: false,
      shared: false,
      sdt: '2 hours ago',
      likes: '2',
    },
    {
      id: 3,
      name: 'temple123',
      type: 'image',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/47/Nadi_Sri_Siva_Subramaniya_Temple.jpg',
      liked: false,
      shared: false,
      sdt: '1 day ago',
      likes: '24',
    },
  ];

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
  const handleLike = postId => {
    // console.log(`Liked post ${postId}`);
  };

  const handleShare = postId => {
    // console.log(`Shared post ${postId}`);
  };

  const handleSave = postId => {
    // console.log(`Saved post ${postId}`);
  };

  const renderMedia = post => {
    if (post?.mediaList?.url) {
      return (
        <View style={styles.mediaContainer}>
          <Video
            source={{uri: post.video}}
            style={styles.video}
            resizeMode="cover"
          />
        </View>
      );
    } else if (post?.mediaList?.url) {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{uri: post.image}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return null;
    }
  };
  const renderImage = post => {
    if (!post?.mediaList === '') {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{uri: post.image}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    } else if (post?.itemDetails?.profilePicture) {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{uri: post?.itemDetails?.profilePicture}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={require('../../../assets/images/islamabad.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    }
  };
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
            <TouchableOpacity>
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
                  navigation.navigate(allTexts.screenNames.templeProfile, {
                    id: item?.itemDetails?.id,
                    title: item?.itemDetails?.name,
                    profileImg: item?.itemDetails?.profilePicture,
                    data: item,
                  })
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

{
  /* {homeFeedList.map(post => (
          <View style={styles.postContainer} key={post.id}>
            <View style={styles.postHeader}>
              <Image
                source={{uri: post?.itemDetails?.profilePicture}}
                style={styles.profileImage}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(allTexts.screenNames.templeProfile, {
                    // id: post?.itemDetails?.id,
                    // title: post?.itemDetails?.name,
                    // profileImg: post?.itemDetails?.profilePicture,
                    data: post,
                  });
                }}>
                <Text style={styles.username}>{post?.itemDetails?.name}</Text>
                <Text style={styles.sponsorNameText}>Sponsored</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postMenuButton}>
                <MatrialIcon name="dots-horizontal" size={25} color="#919191" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>{renderImage(post)}</TouchableOpacity>
            <View style={styles.postFooter}>
              <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-o'}
                  size={20}
                  color={isLiked ? 'blue' : 'black'}
                />
              </TouchableOpacity>
              <View style={styles.postFooterLeft}>
                <TouchableOpacity onPress={() => handleShare(post.id)}>
                  <FeatherIcon name="send" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleLike(post.id)}
                  style={styles.icon}>
                  <Icon name="bookmark-o" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.likes}>{post?.likesCount} Likes</Text>
              <Text style={styles.caption}>{post.sdt}</Text>
            </View>
          </View>
        ))} */
}
