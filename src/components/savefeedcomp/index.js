/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {Loader} from '../loader';
import {colors} from '../../common';
import React, {useState, useRef} from 'react';
import {styles} from './styles';
import {NewLikeOrUnlikeFeed} from '../../utils/api';
import {DotsNation} from '../dotsNation';
import HandsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export const SaveFeedComp = ({post, isLikeTrue, likes, id, onPressTitle}) => {
  const [isLiked, setIsLiked] = useState(isLikeTrue);
  const [likeCount, setLikeCount] = useState(likes);
  const [dotsIndex, setIndex] = useState(0);
  const {width} = Dimensions.get('window');
  const isDarkMode = useColorScheme() === 'dark';
  const likeUnLikeHandler = async () => {
    console.log('likes', likes);
    console.log('likes', likeCount);

    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);

    const payloadLike = {
      jtFeedId: id,
      like: !isLiked,
    };
    try {
      console.log('payloadLike  =====<>', payloadLike);
      let result = await NewLikeOrUnlikeFeed(payloadLike);
      console.log('result', result);
      if (result && result.status === 200) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
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
          data={post?.feedDTO?.mediaList}
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
              <View style={{backgroundColor: 'black'}}>
                {!item?.uri ? (
                  <Image
                    source={{uri: item?.url}}
                    style={{
                      height: 400,
                      width,
                      resizeMode: 'contain',
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
        <View style={{marginLeft: '30%'}}>
          {post?.feedDTO?.mediaList?.length > 1 && (
            <DotsNation
              data={post?.feedDTO?.mediaList}
              scrollX={scrollX}
              index={dotsIndex}
            />
          )}
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={{...styles.likes, color: isDarkMode ? 'gray' : 'gray'}}>
          {likeCount ? likeCount : likes} Likes
        </Text>
      </View>
      <View style={styles.postHeader}>
        <Text style={styles.username}>
          {post?.jtProfileDTO?.name}
          {''}
          {''}{' '}
          <Text style={{color: isDarkMode ? 'gray' : 'gray'}}>
            {post?.description}
          </Text>
        </Text>
      </View>
    </View>
  );
};
