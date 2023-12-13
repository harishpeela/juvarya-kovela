/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {Loader} from '../loader';
import {allTexts, colors} from '../../common';
import {PrimaryButton1} from '../profilecomp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BackgroundSmallFlowerCall,
  BackgroundSmallFlowerUser,
} from '../backgroundFlower';
export const FollowersComp = ({followCount, onPressFollowers}) => {
  return (
    <TouchableOpacity  style={styles.followersView}>
      <Text style={styles.postText1}>{followCount}</Text>
      <Text style={styles.postText}>Followers</Text>
    </TouchableOpacity>
  );
};

export const CommunityComp = ({navigation,roleId,itemCommunity}) => {
  return (
    <TouchableOpacity 
    onPress={() =>
        navigation.navigate(
          allTexts.screenNames.invitationScreen,{
            roleId:roleId
          }
        )
      }
    style={styles.followersView}>
      <Text style={styles.postText1}>{itemCommunity}</Text>
      <Text style={styles.postText}> Members </Text>
    </TouchableOpacity>
  );
};
export const FolloUnfollowComp = ({
  followVisible,
  followBtnDisable,
  followTemples,
  isFollow,
  shadow,
}) => {
  return (
    <View style={styles.followingContainer}>
      {followVisible ? (
        <View style={styles.followLoader}>
          <Loader
            color={colors.white}
            size={'small'}
            dynmicStyle={styles.loader}
          />
        </View>
      ) : (
        <PrimaryButton1
          bgColor={isFollow ? colors.orangeColor : colors.gray4}
          disabled={followBtnDisable}
          radius={10}
          padding={9}
          width={90}
          onPress={followTemples}
          textColor={colors.white}
          fontSize={12}
          isFollow={!isFollow}
          text={
            isFollow
              ? allTexts.buttonTexts.unFollow
              : allTexts.buttonTexts.follow
          }
          shadow={shadow}
        />
      )}
    </View>
  );
};
// export const ContactTabcomp = ({onPressContact}) => {
//   return (
//     <Pressable onPress={onPressContact} style={styles.voidButton}>
//       <Text style={styles.voidButton.text}>Contact</Text>
//     </Pressable>
//   );
// };
export const ContactTabcomp = ({onPressContact}) => {
  return (
    <TouchableOpacity style={[styles.voidButton, styles.button]}>
      <BackgroundSmallFlowerCall />
      <Text style={styles.voidButtonText}>Call</Text>
    </TouchableOpacity>
  );
};
// export const DirectionsTabComp = () => {
//   return (
//     <Pressable
//       onPress={() => console.log('pressed directions')}
//       style={styles.voidButton}>
//       <Text style={styles.voidButton.text}>Directions</Text>
//     </Pressable>
//   );
// };
export const DirectionsTabComp = ({role}) => {
  return (
    <TouchableOpacity style={[styles.voidButton1, styles.button]}>
      <BackgroundSmallFlowerUser />
      <Text style={styles.voidButton1Text}>
        {role ? 'Add a Member' : 'Become a member'}
      </Text>
    </TouchableOpacity>
  );
};
export const CreateFeedTabComp = ({roleId, onPlusPress}) => {
  return (
    <View style={styles.feedContainer}>
      {roleId === 'ROLE_ITEM_ADMIN' && (
        <TouchableOpacity onPress={onPlusPress}>
          <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
        </TouchableOpacity>
      )}
    </View>
  );
};
