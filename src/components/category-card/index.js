/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {allTexts, colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import IconSimple from 'react-native-vector-icons/Feather';
import IconDots from 'react-native-vector-icons/Entypo';
import IconBookMark from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ImageLoader} from '..';
import {followUnfollowTemple, likeOrUnlikeFeed} from '../../utils/api';
import Snackbar from 'react-native-snackbar';
export const HomeCard = ({
  heading,
  date,
  text,
  hashTag,
  icon,
  img,
  likes,
  saved,
  onCardPress,
  isLikeTrue,
  id,
  followId,
  isFollowing,
}) => {
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
  const [isFollow, setisFollow] = useState(isFollowing);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedCount, setSavedCount] = useState();

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

  const followTemples = async () => {
    const payload = {
      itemId: followId,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    try {
      setFollowBtnDisable(true);
      let results = await followUnfollowTemple(payload);
      console.log(results);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        if (results && results.status === 200) {
          setFollowBtnDisable(false);
          ToastAndroid.show(
            `Successfully${
              !isFollow ? ' added to' : ' removed from '
            } favorites!`,
            ToastAndroid.SHORT,
          );
        }
      } else {
        Snackbar.show({
          text: allTexts.constants.noInternet,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'Try again',
            textColor: 'green',
            onPress: () => {
              followTemples();
            },
          },
        });
      }
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
            {/* <Text style={styles.date}>{date}</Text> */}
          </TouchableOpacity>
          {/* <TouchableOpacity
            disabled={followBtnDisable}
            onPress={followTemples}
            style={styles.followContainer}>
            <Text style={[styles.greenColor, styles.boldText]}>
              {isFollow ? allTexts.other.unfollow : allTexts.other.follow}
            </Text>
               // follow un follow //
          </TouchableOpacity> */}
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
          // resizeMode={'contain'}
          imageStyle={[styles.borderRadiusImg, styles.img]}
          url={img}
        />
        {/* <Image
          resizeMode="contain"
          style={[styles.borderRadiusImg, styles.img]}
          source={img}
        /> */}
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
        {/* <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="bookmark-outline" color={colors.black} size={20} />
          <Text style={styles.iconText}>{saved} Saved</Text>
        </TouchableOpacity> */}
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
            {/* <Text style={styles.iconText}>Share</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.footerItem1, marginLeft: 10}}
            onPress={() => setIsSaved(!isSaved)}>
            <IconBookMark
              name={isSaved ? 'bookmark' : 'bookmark-o'}
              color={isSaved ? colors.blue : colors.black}
              size={20}
            />
            {/* <Text style={[styles.iconText, {marginTop: 5}]}>
              {likeCount} saved
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
