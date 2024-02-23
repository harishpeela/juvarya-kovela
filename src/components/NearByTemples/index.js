/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { allTexts } from '../../common';
import { colors } from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FollowUnFollow } from '../../utils/api';

export const NearByTemple = ({
  name,
  post,
  pageNav,
  templeId,
  isFollowingTrue,
}) => {
  // console.log('NearByTemple component rendered at:', new Date().toLocaleTimeString());
  const [isLiked, setIsLiked] = useState(isFollowingTrue);
  const [isFollow, setisFollow] = useState();
  const isFocused = useIsFocused();

  const FollowandUnFollow = d => {
    setIsLiked(!isLiked);
    followTemples(d);
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
    console.log('payload of follow', payload);
    try {
      const results = await FollowUnFollow(payload);
      console.log('77777777777', results?.data);
      if (results && results.status === 200) {
        ToastAndroid.show(
          `Successfully you are  ${
            results?.data?.message === 'Success: following'
              ? 'Following'
              : 'UnFollowing'
          } the temple`,
          ToastAndroid.SHORT,
        );
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
      style={{
        borderRadius: 20,
        margin: 5,
        backgroundColor: 'white',
        height: 165,
        width: 190,
        elevation: 4,
        shadowOpacity: 5,
        padding: 4,
      }}
      onPress={() => {
        pageNav?.navigate(allTexts.screenNames.viewtempleprofile, {
          data: post,
          onSelect: onSelect,
        });
      }}>
         {/* <TouchableOpacity style={{ position:'absolute',top:7,right:10}} onPress={() => FollowandUnFollow(templeId)}>
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={14}
            color={isLiked ? colors.red1 : colors.orangeColor}
            style={{ marginLeft:5}}
          />
        </TouchableOpacity> */}
      <View style={{  alignItems: 'center', marginTop: 10, height: '70%',backgroundColor:'white'}}>
        <Image
          source={{
            uri: post?.profileDTO?.logo
              ? post?.profileDTO?.logo
              : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
          }}
          style={{ height: '100%', width: '90%', borderRadius: 15, resizeMode: 'cover' }}
          imageStyle={{ borderRadius: 20 }} />
      </View>

      <View style={{ marginLeft: '5%', marginTop: '2%'}}>
        <Text style={{color: colors.black, fontWeight: 'bold'}}>
          {name?.length < 20 ? `${name}` : `${name?.substring(0, 20)}..`}
          {/* {name} */}
        </Text>
        <Text style={{fontSize: 9, color: 'gray', fontWeight: 'bold'}}>{post?.locality}, {post?.postalCodeDTO?.city?.name} </Text>
      </View>
    </TouchableOpacity>
  );
};
