/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import {colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import {likeOrUnlikeFeed} from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
export const SaveFeedComp = ({post, isLikeTrue, likes, id, onPressTitle}) => {
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
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
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.postContainer} key={post?.id}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={onPressTitle}>
          <Text style={styles.username}>{post?.feedDTO?.description}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={post?.feedDTO?.mediaList}
        horizontal
        pagingEnabled
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <View style={styles.mediaContainer}>
            <Image
              source={{uri: item?.url}}
              style={styles.image}
              resizeMode="cover"
            />
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
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={{...styles.likes, color: isDarkMode ? 'gray' : 'gray'}}>
          {likeCount} Likes
        </Text>
      </View>
    </View>
  );
};
