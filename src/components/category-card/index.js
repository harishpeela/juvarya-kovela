/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import {SaveFeed, NewSaveFeed} from '../../utils/api';
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
      ToastAndroid.show('Successfully saved the Post', ToastAndroid.SHORT);
    } else {
      console.log('feed not saved');
      ToastAndroid.show('Successfully unsaved the Post', ToastAndroid.SHORT);
    }
  };
  const SaveFeedApi = async () => {
    let payload = {
      feedId: saveid,
    };
    console.log('pay', payload);
    let result = await NewSaveFeed(payload);
    console.log('result =====>', result?.data);
  };
  return (
    <View style={styles.postContainer} key={post?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={onPressTitle}>
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
          <Text style={styles.username}>{post?.description}</Text>
          {/* <Text style={styles.sponsorNameText}>Sponsored</Text> */}
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
    </View>
  );
};
