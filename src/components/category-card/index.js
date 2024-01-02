/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Animated,
  useColorScheme,
} from 'react-native';
import {colors} from '../../common';
import React, {useState, useRef, useMemo} from 'react';
import {styles} from './styles';
import {NewSaveFeed} from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {NewLikeOrUnlikeFeed, DeleteSavedFeed} from '../../utils/api';
import {FlatList} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');
import {DotsNation} from '../dotsNation';
import {Loader} from '../loader';
import HandsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../../languages/language';

export const UserFeedCompList = ({
  post,
  isLikeTrue,
  likes,
  id,
  onPressTitle,
  saveid,
  onSharePress,
  savedFeed,
}) => {
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
  const [saveFeed, setSaveFeed] = useState(savedFeed);
  const [dotIndex, setIndex] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

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
      ToastAndroid.show(
        'Saved',
        ToastAndroid.SHORT,
      );
    } else {
      DeleteFeed();
      ToastAndroid.show(
        'Unsaved',
        ToastAndroid.SHORT,
      );
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
  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0]?.index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.postContainer} key={post?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity style={{marginBottom: 5}} onPress={onPressTitle}>
          <Image
            source={{
              uri:
                post?.jtProfileDTO?.logo ||
                'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686287797319img.jpg',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTitle}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 10,
              textTransform: 'capitalize',
              color: isDarkMode ? 'black' : 'black',
            }}>
            {post?.jtProfileDTO?.name}
          </Text>
        </TouchableOpacity>
      </View>
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
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => {
            return (
              <View>
                {!item?.uri ? (
                  <Image
                    source={{uri: item?.url}}
                    style={{
                      flex: 1,
                      height: 350,
                      width,
                      resizeMode: 'stretch',
                      backgroundColor: 'black',
                    }}
                  />
                ) : (
                  <Loader color={colors.orangeColor} size={'small'} />
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={() => likeUnLikeHandler()}>
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
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={{...styles.likes, color: isDarkMode ? 'gray' : 'gray'}}>
          {likeCount} Likes
        </Text>
      </View>
      <Text style={styles.username}>
        {post?.jtProfileDTO?.name}
        {''}
        {''}{' '}
        <Text style={{color: isDarkMode ? 'gray' : 'gray'}}>
          {post?.description}
        </Text>
      </Text>
    </View>
  );
};
