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

export const NearByTemple = ({
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
      style={{borderRadius: 20, margin: 5, backgroundColor: 'white', height: 120, width: 120, elevation: 4, shadowOpacity: 5,padding:8}}
      onPress={() => {
        pageNav?.navigate(allTexts.screenNames.viewtempleprofile, {
          data: post,
          onSelect: onSelect,
        });
      }}>
         <TouchableOpacity style={{ position:'absolute',top:7,right:10}} onPress={() => FollowandUnFollow(templeId)}>
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={14}
            color={isLiked ? colors.red1 : colors.orangeColor}
            style={{ marginLeft:5}}
          />
        </TouchableOpacity>
      <View style={{  alignItems: 'center', marginTop: 15, height: '70%',backgroundColor:'white'}}>
        <Image
          source={{
            uri: post?.logo
              ? post?.logojpg
              : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
          }}
          style={{ height: '100%', width: 90, borderRadius: 15, resizeMode: 'cover' }}
          imageStyle={{ borderRadius: 20 }} />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, marginVertical:5}}>
        <Text style={styles.textCard} numberOfLines={1}>
          {name?.length < 15 ? `${name}` : `${name?.substring(0, 15)}..`}
        </Text>
       
      </View>
    </TouchableOpacity>
  );
};
