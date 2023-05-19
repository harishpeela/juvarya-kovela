/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import IconSimple from 'react-native-vector-icons/Feather';
import IconDots from 'react-native-vector-icons/Entypo';
import IconBookMark from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ImageLoader} from '..';
import {likeOrUnlikeFeed} from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
export const HomeCard = ({
  heading,
  date,
  text,
  hashTag,
  icon,
  img,
  likes,
  onCardPress,
  isLikeTrue,
  id,
}) => {
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
  const [isSaved, setIsSaved] = useState(false);

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
      // console.log('payloadLike', payloadLike);
      let result = await likeOrUnlikeFeed(payloadLike);
      if (result && result.status === 200 && result.data.statusCode === 200) {
        return;
      }
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCardPress} style={styles.iconSize}>
          <ImageLoader
            imageStyle={[styles.img, styles.borderRadiusIcon]}
            url={icon}
          />
        </TouchableOpacity>
        <View style={styles.headerItem2}>
          <TouchableOpacity
            onPress={onCardPress}
            style={styles.topTittleContainer}>
            <Text style={[styles.colorBlack, styles.boldText]}>{heading}</Text>
            <Text
              numberOfLines={2}
              style={[styles.colorBlack, styles.boldText]}>
              {text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followContainer}>
            <IconDots name="dots-three-horizontal" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentItem1}>
        {/* <Text numberOfLines={2} style={[styles.colorBlack, styles.boldText]}>
          {text}
        </Text> */}
        <Text style={[styles.boldText, styles.colorBlue]}>{hashTag}</Text>
      </View>
      <View style={styles.imgContainer}>
        <ImageLoader
          imageStyle={[styles.borderRadiusImg, styles.img]}
          url={img}
        />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={likeUnLikeHandler} style={styles.footerItem}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            color={isLiked ? colors.red1 : colors.black}
            size={20}
          />
          <Text style={[styles.iconText, {marginTop: 5}]}>
            {likeCount} Likes
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '85%',
            // marginBottom: 10,
            position: 'absolute',
          }}>
          <TouchableOpacity style={styles.footerItem1}>
            <IconSimple
              name="send"
              color={colors.black}
              style={{marginRight: 3}}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.footerItem1, marginLeft: 10}}
            onPress={() => setIsSaved(!isSaved)}>
            <IconBookMark
              name={isSaved ? 'bookmark' : 'bookmark-o'}
              color={isSaved ? colors.blue : colors.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const UserFeedCompList = ({
  bookmarkPress,
  data,
  getHomeResponse,
  post,
  isLikeTrue,
  likes,
  id,
  saveOnPress,
  onPressTitle,
  onDotsPress,
}) => {
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
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
      let result = await likeOrUnlikeFeed(payloadLike);
      if (result && result.status === 200 && result.data.statusCode === 200) {
        return;
      }
      // console.log(result);
    } catch (error) {
      console.log(error);
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
  const SaveFeed = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer a63cc4b9-a3f3-46c2-b3a6-57a3b3221e1e',
    );

    var formdata = new FormData();
    formdata.append('itemId', id);
    formdata.append('description', 'kovela');
    formdata.append('city', 'IN-AP');
    formdata.append('files', post?.itemDetails?.profilePicture);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://20.255.59.150:8082/api/v1/feed/post', requestOptions)
      .then(response => response.json())
      .then(result => console.log('result of save feed', result))
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.postContainer} key={post?.itemDetails?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={onPressTitle}>
          <Image
            source={{uri: post?.itemDetails?.profilePicture}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTitle}>
          <Text style={styles.username}>{post?.itemDetails?.name}</Text>
          <Text style={styles.sponsorNameText}>Sponsored</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postMenuButton} onPress={onDotsPress}>
          <MatrialIcon name="dots-horizontal" size={25} color="#919191" />
        </TouchableOpacity>
      </View>
      {renderImage(post)}
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
              SaveFeed();
              setSaveFeed(!saveFeed);
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
