import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import {styles} from './styles';
import {Loader} from '../loader';
import {allTexts} from '../../common';
import {PrimaryButton1} from '../profilecomp';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ProfileComp = ({profileImg}) => {
  const renderImage = () => {
    if (!profileImg?.url) {
      return (
        <Image
          source={{
            uri: 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg',
          }}
          style={styles.profileView}
        />
      );
    } else if (profileImg?.url) {
      return (
        <Image
          source={{
            uri: profileImg?.url,
          }}
          style={styles.profileView}
        />
      );
    }
  };
  return renderImage(profileImg);
};
export const PostsComp = ({itemDetails, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.postsView}>
      <Text>{itemDetails?.length}</Text>
      <Text style={styles.postText}>Posts </Text>
    </TouchableOpacity>
  );
};
export const FollowersComp = ({followCount, onPressFollowers}) => {
  return (
    <TouchableOpacity onPress={onPressFollowers} style={styles.followersView}>
      <Text>{followCount}</Text>
      <Text style={styles.postText}>followers</Text>
    </TouchableOpacity>
  );
};
export const CommunityComp = ({itemCommunity, onPressmembership}) => {
  return (
    <TouchableOpacity onPress={onPressmembership} style={styles.followersView}>
      <Text>{itemCommunity?.length}</Text>
      <Text style={styles.postText}> Membership </Text>
    </TouchableOpacity>
  );
};
export const FolloUnfollowComp = ({
  followVisible,
  followBtnDisable,
  followTemples,
  isFollow,
}) => {
  // const [isFollow, setIsFollow] = useState();
  return (
    <>
      {followVisible ? (
        <View style={styles.followLoader}>
          <Loader color={'white'} size={'small'} dynmicStyle={styles.loader} />
        </View>
      ) : (
        <PrimaryButton1
          bgColor={'#FFA001'}
          disabled={followBtnDisable}
          radius={10}
          padding={7}
          width={115}
          onPress={followTemples}
          text={
            isFollow
              ? allTexts.buttonTexts.unFollow
              : allTexts.buttonTexts.follow
          }
        />
      )}
    </>
  );
};
export const ContactTabcomp = ({}) => {
  return (
    <Pressable
      onPress={() => console.log('pressed contact')}
      style={styles.voidButton}>
      <Text style={styles.voidButton.text}>Contact</Text>
    </Pressable>
  );
};
export const DirectionsTabComp = () => {
  return (
    <Pressable
      onPress={() => console.log('pressed directions')}
      style={styles.voidButton}>
      <Text style={styles.voidButton.text}>Directions</Text>
    </Pressable>
  );
};
export const CreateFeedTabComp = ({roleId, onPlusPress}) => {
  return (
    <>
      {roleId === 'ROLE_ITEM_ADMIN' && (
        <TouchableOpacity onPress={onPlusPress}>
          <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
        </TouchableOpacity>
      )}
    </>
  );
};
