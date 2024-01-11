/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { styles } from './styles';
import {
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  Image
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { allTexts } from '../../common';
import { colors } from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApplicationContext from '../../utils/context-api/Context';
import { FollowUnFollow } from '../../utils/api';

export const TempleListCard = ({
  name,
  post,
  pageNav,
  templeId,
  isFollowingTrue,
}) => {
  const [isLiked, setIsLiked] = useState(isFollowingTrue);
  const [isFollow, setisFollow] = useState();
  let isFocused = useIsFocused();
  const FollowandUnFollow = d => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      followTemples(d);
    } else if (isLiked) {
      followTemples(d);
    }
  };
  const onSelect = data => {
    setIsLiked(data?.selected);
    // FollowandUnFollow(data?.selectedId);
  };
  const followTemples = async d => {
    const payload = {
      jtProfile: d,
      following: !isLiked
      // jtCustomer: userDetails?.id,
      // type: 'ITEM',
      // jtProfile: d,
      // following: !isLiked,
    };
    console.log('payload of follw', payload);
    try {
      let results = await FollowUnFollow(payload);
      console.log('77777777777', results?.data);
      if (results && results.status === 200) {
        ToastAndroid.show(
          `Successfully you are  ${results?.data?.message === 'Success: following'
            ? 'Following'
            : 'UnFollowing'
          } the temple`,
          ToastAndroid.SHORT,
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setisFollow(isFollowingTrue);
  }, [isFollowingTrue, isFocused]);
  return (
    <TouchableOpacity
      style={{borderRadius: 20, margin: 5, backgroundColor: 'white', height: 150, width: 250, elevation: 4, shadowOpacity: 5}}
      onPress={() => {
        pageNav?.navigate(allTexts.screenNames.viewtempleprofile, {
          data: post,
          onSelect: onSelect,
        });
      }}>
      <View style={{  alignItems: 'center', marginTop: 5, height: '70%'}}>
        <Image
          source={{
            uri: post?.logo
              ? post?.logo
              : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
          }}
          style={{ height: '100%', width: 230, borderRadius: 20, resizeMode: 'cover' }}
          imageStyle={{ borderRadius: 20 }} />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 10}}>
        <Text style={styles.textCard} numberOfLines={1}>
          {name?.length < 15 ? `${name}` : `${name?.substring(0, 15)}..`}
        </Text>
        <TouchableOpacity style={{ }} onPress={() => FollowandUnFollow(templeId)}>
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? colors.red1 : colors.orangeColor}
            style={{ }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
