import React from 'react';
import {View, SafeAreaView, Image, Text} from 'react-native';
import {styles} from './styles';
export const RenderImage = ({post}) => {
  const renderImage = () => {
    if (!post?.mediaList === '') {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{uri: post?.mediaList[0]?.url}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    } else if (post?.mediaList) {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{uri: post?.mediaList[0]?.url}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={require('../../../assets/images/noimg.png')}
            style={styles.image1}
            resizeMode="cover"
          />
        </View>
      );
    }
  };
  return <View>{renderImage(post)}</View>;
};
