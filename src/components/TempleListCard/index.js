/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {styles} from './styles';
import {
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {allTexts} from '../../common';
import {colors} from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApplicationContext from '../../utils/context-api/Context';
import {FollowUnFollow} from '../../utils/api';

export const TempleListCard = ({
  name,
  post,
  pageNav,
  templeId,
  isFollowingTrue,
}) => {
  const {userDetails} = useContext(ApplicationContext);
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
      jtProfile:d,
      following:!isLiked
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
          `Successfully you are  ${
            results?.data?.message === 'Success: following'
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
      style={{marginLeft: 10}}
      onPress={() => {
        pageNav?.navigate(allTexts.screenNames.viewtempleprofile, {
          data: post,
          onSelect: onSelect,
        });
      }}>
      <ImageBackground
        source={{
          uri: post?.logo
            ? post?.logo
            : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17041996227071704199620350.jpg',
        }}
        style={{height: 200, width: 200, borderRadius: 60}}
        imageStyle={{borderRadius: 20}}>
           <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: '5%'}} onPress={() => FollowandUnFollow(templeId)}>
            <Icon
              name={isLiked ? 'heart' : 'heart-o'}
              size={20}
              color={isLiked ? colors.red1 : colors.orangeColor}
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        <View
          style={{
            marginTop: '65%'
          }}>
          <Text style={styles.textCard} numberOfLines={1}>
            {name.length < 15 ? `${name}` : `${name.substring(0, 15)}..`}
          </Text>
         
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
