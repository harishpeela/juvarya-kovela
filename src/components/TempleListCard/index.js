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
import { useIsFocused } from '@react-navigation/native';
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
    console.log('ksj', d, isLiked);
    setIsLiked(!isLiked);
    if (!isLiked) {
      console.log('if');
      followTemples(d);
      // ToastAndroid.show(
      //   'successfully you are following the temple',
      //   ToastAndroid.SHORT,
      // );
    } else if (isLiked) {
      console.log('else');
      followTemples(d);
      // ToastAndroid.show(
      //   'successfully you are unfollowing the temple',
      //   ToastAndroid.SHORT,
      // );
    }
  };
  const onSelect = data => {
    setIsLiked(data?.selected);
    // FollowandUnFollow(data?.selectedId);
  };
  const followTemples = async d => {
    const payload = {
      jtCustomer: userDetails?.id,
      type: 'ITEM',
      jtProfile: d,
      following: !isLiked,
    };
    console.log('payload of follw', payload);
    try {
      let results = await FollowUnFollow(payload);
      console.log('77777777777', results?.data);
      if (results && results.status === 200) {
        // setIsLiked(!isLiked);
        ToastAndroid.show(
          `Successfully you are${
            !isFollow ? ' following' : ' unFollowing'
          } temple!`,
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
        pageNav?.navigate(allTexts.screenNames.viewProfile, {
          data: post,
          onSelect: onSelect,
        });
      }}>
      <ImageBackground
        source={{uri: post?.logo}}
        style={{height: 200, width: 200, borderRadius: 60}}
        imageStyle={{borderRadius: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '80%',
          }}>
          <Text style={styles.textCard} numberOfLines={1}>
            {name.length < 10 ? `${name}` : `${name.substring(0, 10)}...`}
          </Text>
          <TouchableOpacity onPress={() => FollowandUnFollow(templeId)}>
            <Icon
              name={isLiked ? 'heart' : 'heart-o'}
              size={20}
              color={isLiked ? colors.red1 : 'black'}
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
