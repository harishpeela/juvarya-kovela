import React, { useState, useContext } from 'react';
import { styles } from './styles';
import {
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import { allTexts } from '../../common';
import { colors } from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApplicationContext from '../../utils/context-api/Context';
import { FollowUnFollow } from '../../utils/api';


export const PopularTemplesVerticalList = ({
  name,
  post,
  pageNav,
  templeId,
  isFollowingTrue,
  description
}) => {
  const { userDetails } = useContext(ApplicationContext);
  const [isLiked, setIsLiked] = useState(isFollowingTrue);
  console.log('iiiiiiiiiiiiiiiiiiii',description)

  const FollowandUnFollow = d => {
    setIsLiked(!isLiked);
    followTemples(d);
  };

  const followTemples = async d => {
    const payload = {
      jtCustomer: userDetails?.id,
      type: 'ITEM',
      jtProfile: d,
      following: !isLiked,
    };
    try {
      let results = await FollowUnFollow(payload);
      if (results && results.status === 200) {
        setIsLiked(!isLiked);
        ToastAndroid.show(
          `Successfully you are ${
            !isLiked ? 'following' : 'unFollowing'
          } temple!`,
          ToastAndroid.SHORT,
        );
      } else {
        if (results === undefined) {
          ToastAndroid.show(
            `Successfully you are ${
              !isLiked ? 'following' : 'unFollowing'
            } temple!`,
            ToastAndroid.SHORT,
          );
          setIsLiked(!isLiked);
        }
      }
    } catch (error) {
      console.log('error followTemples', error);
    }
  };

  const onSelect = data => {};

  return (
    <View style={{flexDirection:'row'}}>
    <View >

   
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft:10
      }}
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
            : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
        }}
        style={{
          height:100,
          width: 100,
          borderRadius: 60,
          flexDirection: 'row', 
          alignItems: 'flex-end',
          marginBottom:20
          
        }}
        imageStyle={{
          borderRadius: 20,
          height: '100%',
          width: '100%',
          resizeMode: 'stretch',
        }}>
        <View>
          <Text style={styles.textCard} numberOfLines={1}>
            {name.length < 10 ? `${name}` : `${name.substring(0, 10)}...`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => FollowandUnFollow(templeId)}
          style={{ marginBottom:2, marginLeft:-2 }}>
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={10}
            color={isLiked ? colors.red1 : 'black'}
          />
        </TouchableOpacity>
      </ImageBackground>
      
    
        <View style={{width:220,marginTop:'5%',marginLeft:10,marginRight:10}}>
          <Text style={{color:'black',fontWeight:'bold'}}>
          {name}
          </Text>
          <Text>{description}</Text>
          </View>
      </TouchableOpacity>

    </View>
    </View>
  );
};
