/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import {SaveFeed} from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {RenderImage} from '../homeFeedCompImage/homeFeesCompRenderImage';
export const UserFeedCompList = ({
  post,
  isLikeTrue,
  likes,
  id,
  saveOnPress,
  onPressTitle,
  onDotsPress,
  saveid,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saveFeed, setSaveFeed] = useState(false);
  const likeUnLikeHandler = async () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);

    // const payloadLike = {
    //   feedId: id,
    //   like: !isLiked,
    // };
    // try {
    //   console.log('payloadLike', payloadLike);
    //   let result = await likeOrUnlikeFeed(payloadLike);
    //   if (result && result.status === 200 && result.data.statusCode === 200) {
    //     return;
    //   }
    //   // console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // const renderImage = () => {
  //   if (!post?.mediaList === '') {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={{uri: post?.mediaList[0]?.url}}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   } else if (post?.mediaList) {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={{uri: post?.mediaList[0]?.url}}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={styles.mediaContainer}>
  //         <Image
  //           source={require('../../../assets/images/noimg.png')}
  //           style={styles.image1}
  //           resizeMode="cover"
  //         />
  //       </View>
  //     );
  //   }
  // };
  const FeedStatus = () => {
    let status = !saveFeed;
    if (status) {
      SaveFeedApi();
    } else {
      console.log('feed not saved');
    }
  };
  const SaveFeedApi = async () => {
    let payload = {
      feedId: saveid,
    };
    let result = await SaveFeed(payload);
    console.log('result', result?.data);
  };
  return (
    <View style={styles.postContainer} key={post?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={onPressTitle}>
          <Image
            source={{uri: post?.mediaList?.url}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTitle}>
          <Text style={styles.username}>{post?.description}</Text>
          <Text style={styles.sponsorNameText}>Sponsored</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.postMenuButton} onPress={onDotsPress}>
          <MatrialIcon name="dots-horizontal" size={25} color="#919191" />
        </TouchableOpacity> */}
      </View>
      <RenderImage post={post} />
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={() => likeUnLikeHandler()}>
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? colors.orangeColor : 'black'}
          />
        </TouchableOpacity>
        <View style={styles.postFooterLeft}>
          <TouchableOpacity onPress={saveOnPress}>
            <FeatherIcon name="send" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSaveFeed(isFeed => !isFeed);
              // FeedStatus();
            }}
            style={styles.icon}>
            <Icon
              name={saveFeed ? 'bookmark' : 'bookmark-o'}
              // color={saveFeed ? colors.orangeColor : colors.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.likes}>{likeCount} Likes</Text>
      </View>
    </View>
  );
};
