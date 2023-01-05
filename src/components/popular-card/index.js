import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {allTexts, colors} from '../../common';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';
import {styles} from './styles';
import {followUnfollowTemple} from '../../utils/api';

export const PopularCard = ({
  title,
  location,
  img,
  review,
  onCardPress,
  isFollowTemple,
  id,
}) => {
  const [isFollow, setisFollow] = useState(isFollowTemple);

  const toggleHeart = async () => {
    setisFollow(!isFollow);
    const payload = {
      itemId: id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    try {
      // console.log(payload);
      let results = await followUnfollowTemple(payload);
      console.log('Follow unfollow API response ', results);
      if (results && results.status === 200) {
        ToastAndroid.show(
          `Successfully${
            !isFollow ? ' added to' : ' removed from '
          } favorites!`,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View style={styles.starContainer}>
          <EntypoIcon name="star" color={colors.green} size={19} />
          <Text style={styles.reviewText}>{review}</Text>
        </View>
        <TouchableOpacity onPress={onCardPress} style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://media.istockphoto.com/photos/hindu-temple-in-shimla-picture-id1039461530?k=20&m=1039461530&s=612x612&w=0&h=WlYTG7fB--xQfujeJhdTJZsHuQk9WMN_04vAxmfxJy8=',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.nameContainer} onPress={onCardPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        {isFollow ? (
          <TouchableOpacity onPress={toggleHeart} style={styles.heartContainer}>
            <AntDesignIcon name="heart" color={colors.red2} size={17} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleHeart} style={styles.heartContainer}>
            <AntDesignIcon name="hearto" color={colors.black} size={17} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.locationWrapper}>
        <View style={styles.locationContainer}>
          <EntypoIcon name="location-pin" color={colors.green} size={22} />
        </View>
        <Text style={styles.flex2}>{location}</Text>
      </View>
    </View>
  );
};
