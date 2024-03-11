/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useMemo, useContext, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Animated,
  useColorScheme,
  Alert,
  Modal,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useFocusEffect } from '@react-navigation/native';
import ApplicationContext from '../../utils/context-api/Context';
import { colors } from '../../common';
import { styles } from './styles';
import { NewSaveFeed } from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  NewLikeOrUnlikeFeed,
  DeleteSavedFeed,
  DeleteFeedData,
} from '../../utils/api';
import { FlatList } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
import { DotsNation } from '../dotsNation';
import { Loader } from '../loader';
import HandsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

export const UserFeedCompList = ({
  post,
  isLikeTrue,
  likes,
  id,
  onPressTitle,
  saveid,
  onSharePress,
  savedFeed,
  onPressDelete,
  onPressDots,
  role_item_admin,
}) => {
  const [formattedCreationTime, setFormattedCreationTime] = useState('');
  const { userDetails } = useContext(ApplicationContext);
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
  const [saveFeed, setSaveFeed] = useState(savedFeed);
  const [dotIndex, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [roleType, setRoleType] = useState('');
  const [shortDescription, longDescription] = useState(false);


  const getImageSize = () => {
    if (post?.mediaList[0]?.url === ' ') {
      console.log('');
    } else {
      Image.getSize(post?.mediaList[0]?.url, (width, height) => {
        setHeight(height), setWidth(width);
      });
    }
  };

  useEffect(() => {
    getImageSize();
    calculateTimeDifference()
  }, [post]);


  const calculateTimeDifference = () => {
    const creationTime = moment(post?.creationTime);
    const currentTime = moment();
    const secondsDiff = currentTime.diff(creationTime, 'seconds');
    const minutesDiff = currentTime.diff(creationTime, 'minutes');
    const hoursDiff = currentTime.diff(creationTime, 'hours');
    const daysDiff = currentTime.diff(creationTime, 'days');
    if (secondsDiff === 1) {
      setFormattedCreationTime(`${secondsDiff} second ago`);
    } else if (secondsDiff < 60) {
      setFormattedCreationTime(`${secondsDiff} seconds ago`);
    } else if (minutesDiff === 1) {
      setFormattedCreationTime(`${minutesDiff} minute ago`);
    } else if (minutesDiff < 60) {
      setFormattedCreationTime(`${minutesDiff} minutes ago`);
    } else if (minutesDiff === 1) {
      setFormattedCreationTime(`${hoursDiff} hour ago`);
    } else if (hoursDiff < 24) {
      setFormattedCreationTime(`${hoursDiff} hours ago`);
    } else if (daysDiff === 1) {
      setFormattedCreationTime(`1 day ago`);
    } else if (daysDiff < 7) {
      setFormattedCreationTime(`${daysDiff} days ago`);
    } else {
      setFormattedCreationTime(creationTime.format('MMM DD, YYYY'));
    }
  };

  // Call calculateTimeDifference function on component mount and whenever post changes
  useEffect(() => {
    getImageSize();
    calculateTimeDifference();
  }, [post]);



  const likeUnLikeHandler = async () => {
    setIsLiked(!isLiked);
    const payloadLike = {
      jtFeedId: id,
      like: !isLiked,
    };
    try {
      let result = await NewLikeOrUnlikeFeed(payloadLike);
      if (result) {
        setLikeCount(result?.data?.totalCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (likes !== null) {
      setLikeCount(likes);
    }
  }, [likes]);

  const FeedStatus = () => {
    let status = !saveFeed;
    if (status) {
      SaveFeedApi();
      ToastAndroid.show('Saved', ToastAndroid.SHORT);
    } else {
      DeleteFeed();
      ToastAndroid.show('Unsaved', ToastAndroid.SHORT);
    }
  };

  const SaveFeedApi = async () => {
    let payload = {
      feedId: saveid,
    };
    let result = await NewSaveFeed(payload);
  };

  const DeleteFeed = async () => {
    let result = await DeleteSavedFeed(id);
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0]?.index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const downloadImageRemote = REMOTE_IMAGE_PATH => {
    console.log('REMOTE_IMAGE_PATH', REMOTE_IMAGE_PATH);

    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;
    console.log('imgurl', image_URL);
    let ext = getExtention(image_URL);
    console.log('ext', ext);
    ext = '.' + ext[0];

    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON?.stringify(res));
        // Alert.alert('Alert', 'Image Download Successfully');
        Snackbar.show({
          text: 'Image Download Successfully',
          backgroundColor: colors.orangeColor,
        });
      });
  };
  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    } else {
      setRoleType(null);
    }
  };

  useEffect(() => {
    Type();
  }, []);

  return (
    <View style={styles.postContainer} key={post?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity style={{ marginBottom: 5 }} onPress={onPressTitle}>
          <Image
            source={{
              uri:
                post?.jtProfileDTO?.logo ||
                'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTitle}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 10,
              textTransform: 'capitalize',
              color: isDarkMode ? 'black' : 'black',
            }}>
            {post?.jtProfileDTO?.name}
          </Text>
        </TouchableOpacity>
      </View>
      {(roleType || role_item_admin) && (
        <Entypo
          name="dots-three-vertical"
          size={20}
          color={colors.orangeColor}
          style={{ position: 'absolute', right: 10, top: 10 }}
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        />
      )}
      {isVisible && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 15,
            right: 25,
            backgroundColor: 'lightgrey',
            padding: 8,
            borderRadius: 10,
          }}
          onPress={onPressDelete}>
          <Text style={{ fontWeight: 'bold' }}> Delete</Text>
        </TouchableOpacity>
      )}
      <View>
        <FlatList
          data={post?.mediaList}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => {
            return (
              <View>
                {!item?.uri ? (
                  <View>
                    {width > height ? (
                      <Image
                        source={{ uri: item?.url }}
                        style={{
                          flex: 1,
                          width: Dimensions.get('window').width,
                          height: 300,
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: item?.url }}
                        style={{
                          flex: 1,
                          height: Dimensions.get('window').height / 2 + 60,
                          width: Dimensions.get('window').width,
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <Loader color={colors.orangeColor} size={'small'} />
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.postFooter}>
        <TouchableOpacity style={{ marginLeft: '-2.9%' }} onPress={() => likeUnLikeHandler()}>
          <HandsIcon
            name={'hands-pray'}
            size={24}
            color={isLiked ? colors.orangeColor : 'gray'}
          />
        </TouchableOpacity>
        {post?.mediaList?.length > 1 && (
          <DotsNation
            data={post?.mediaList}
            scrollX={scrollX}
            index={dotIndex}
          />
        )}
        <View style={styles.postFooterLeft}>
          <TouchableOpacity onPress={onSharePress}>
            <FeatherIcon name="send" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSaveFeed(!saveFeed);
              FeedStatus();
            }}
            style={styles.icon}>
            <Icon
              name={saveFeed ? 'bookmark' : 'bookmark-o'}
              color={saveFeed ? colors.orangeColor : colors.black}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => downloadImageRemote(post?.mediaList[0]?.url)}
            style={{ marginLeft: '5%' }}>
            <AntDesign name="download" size={20} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <Text
          style={{
            ...styles.likes,
            color: isDarkMode ? 'gray' : 'gray',
          }}>
          {likeCount} Likes
        </Text>
      </View>
      {post?.description && (
        <View>
          {shortDescription ? (
            <View style={{  }}>
              <Text style={{ ...styles.username, fontSize: 10, fontFamily: 'Poppins-Medium', color: isDarkMode ? 'black' : 'black', }}>
                {`${post?.description}` }
              </Text>
              <TouchableOpacity style={{marginLeft: 10}} onPress={() => longDescription(false)}>
                <Text style={{ fontSize: 10, color: colors.gray2, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}> show less</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...styles.username, fontSize: 14, fontFamily: 'Poppins-Medium', color: isDarkMode ? 'black' : 'black', }}>
                {
                  `${post?.description?.substring(0, 44)}`}
              </Text>
              {post?.description?.length > 44 && (
                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => longDescription(true)}>
                <Text style={{ fontSize: 10, color: colors.gray2, fontWeight: '600', fontFamily: 'Poppins-Medium' }}> show more</Text>
              </TouchableOpacity>
              )}
            </View>
          )}

        </View>
      )}
      <View style={{ marginLeft: 12 }}>
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 8 }}>{formattedCreationTime}</Text>
      </View>
    </View>
  );
};
