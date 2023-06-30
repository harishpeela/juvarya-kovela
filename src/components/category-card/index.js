/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {colors} from '../../common';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {SaveFeed, NewSaveFeed} from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {NewLikeOrUnlikeFeed, NewLikesCount} from '../../utils/api';
import {RenderImage} from '../homeFeedCompImage/homeFeesCompRenderImage';
import {FlatList} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
export const UserFeedCompList = ({
  post,
  isLikeTrue,
  likes,
  id,
  saveOnPress,
  onPressTitle,
  onDotsPress,
  saveid,
  onSharePress,
  mediaData,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const [saveFeed, setSaveFeed] = useState(false);
  const likeUnLikeHandler = async () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);

    const payloadLike = {
      feedId: id,
      like: !isLiked,
    };
    try {
      console.log('payloadLike', payloadLike);
      let result = await NewLikeOrUnlikeFeed(payloadLike);
      if (result && result.status === 200 && result.data.statusCode === 200) {
        return;
      }
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = mediaList => {
    return (
      // <View style={{flex: 1, marginLeft: 8}}>
      <TouchableOpacity activeOpacity={1}>
        <Image source={{uri: mediaList?.url}} style={{height: 250, width}} />
      </TouchableOpacity>
      // </View>
    );
  };
  const FeedStatus = () => {
    let status = !saveFeed;
    if (status) {
      SaveFeedApi();
      ToastAndroid.show('Successfully saved the Post', ToastAndroid.SHORT);
    } else {
      // console.log('feed not saved');
      ToastAndroid.show('Successfully unsaved the Post', ToastAndroid.SHORT);
    }
  };
  const SaveFeedApi = async () => {
    let payload = {
      feedId: saveid,
    };
    // console.log('pay', payload);
    let result = await NewSaveFeed(payload);
    // console.log('result =====>', result?.data);
  };
  const likesCount = async () => {
    try {
      let result = await NewLikesCount(id);
      if (result) {
        setLikeCount(result?.data?.count);
      } else {
        setLikeCount(0);
      }
    } catch (error) {
      console.log('error in likes count', error);
    }
  };
  useEffect(() => {
    likesCount();
  }, []);
  return (
    <View style={styles.postContainer} key={post?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity style={{marginBottom: 5}} onPress={onPressTitle}>
          <Image
            source={{
              uri:
                post?.mediaList?.url ||
                'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686287797319img.jpg',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTitle}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            {'No Name'}
          </Text>
          {/* <Text style={styles.sponsorNameText}>Sponsored</Text> */}
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.postMenuButton} onPress={onDotsPress}>
          <MatrialIcon name="dots-horizontal" size={25} color="#919191" />
        </TouchableOpacity> */}
      </View>
      {/* <RenderImage post={post} /> */}
      <FlatList
        data={post?.mediaList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity activeOpacity={1}>
              <Image source={{uri: item?.url}} style={{height: 400, width}} />
            </TouchableOpacity>
            {/* <Text
              style={{
                fontSize: 12,
                color: 'black',
                marginBottom: 8,
                marginLeft: 8,
              }}
              onPress={() => {
                return (
                  <View>
                    <Image source={{uri: item.url}} style={{marginTop: 20}} />
                  </View>
                );
              }}>
              {index + 1} .
            </Text> */}
          </View>
        )}
      />
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={() => likeUnLikeHandler()}>
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? colors.orangeColor : 'black'}
          />
        </TouchableOpacity>
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
        <Text style={styles.likes}>{likeCount} Likes</Text>
      </View>
      <Text style={styles.username}>{post?.description}</Text>
    </View>
  );
};
