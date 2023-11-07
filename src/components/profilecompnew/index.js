/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import {styles} from './styles';
import {Loader} from '../loader';
import {allTexts, colors, fontSize} from '../../common';
import {PrimaryButton1} from '../profilecomp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BackgroundSmallFlowerCall,
  BackgroundSmallFlowerUser,
} from '../backgroundFlower';
export const FollowersComp = ({followCount, onPressFollowers}) => {
  return (
    <TouchableOpacity onPress={onPressFollowers} style={styles.followersView}>
      <Text style={styles.postText1}>{followCount}</Text>
      <Text style={styles.postText}>Followers</Text>
    </TouchableOpacity>
  );
};
export const CommunityComp = ({itemCommunity, onPressmembership}) => {
  return (
    <TouchableOpacity onPress={onPressmembership} style={styles.followersView}>
      <Text style={styles.postText1}>{itemCommunity} 0</Text>
      <Text style={styles.postText}> Members </Text>
    </TouchableOpacity>
  );
};
export const FolloUnfollowComp = ({
  followVisible,
  followBtnDisable,
  followTemples,
  isFollow,
}) => {
  return (
    <>
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
          // borderWidth={isFollow ? 0 : 1}
          fontSize={12}
          isFollow={!isFollow}
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
// export const ContactTabcomp = ({onPressContact}) => {
//   return (
//     <Pressable onPress={onPressContact} style={styles.voidButton}>
//       <Text style={styles.voidButton.text}>Contact</Text>
//     </Pressable>
//   );
// };
export const ContactTabcomp = ({onPressContact}) => {
  return (
    // <LinearGradient colors={['#CC4501', '#CC4501']} style={styles.voidButton}>
    <TouchableOpacity style={styles.voidButton}>
      <BackgroundSmallFlowerCall />
      <Text
        style={{
          marginLeft: '40%',
          color: '#CC4501',
          fontSize: 14,
          fontWeight: '600',
        }}>
        {' '}
        Call
      </Text>
    </TouchableOpacity>
    // </LinearGradient>
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
export const DirectionsTabComp = () => {
  return (
    // <LinearGradient colors={['#CC4501', '#CC4501']} style={styles.voidButton1}>
    <TouchableOpacity style={styles.voidButton1}>
      <BackgroundSmallFlowerUser />
      <Text
        style={{
          color: '#CC4501',
          marginLeft: '24%',
          fontSize: 14,
          fontWeight: '600',
        }}>
        {' '}
        Become a Mentor
      </Text>
    </TouchableOpacity>
    // </LinearGradient>
  );
};
export const CreateFeedTabComp = ({roleId, onPlusPress}) => {
  return (
    <>
      {roleId === 'ROLE_ITEM_ADMIN' && (
        <TouchableOpacity onPress={onPlusPress}>
          <AntDesign style={{margin:'1%', textAlign:'center', alignSelf:'center',  justifyContent:'center',alignItems:"center"}} name="pluscircleo" size={30} color={'#FFA001'} />
        </TouchableOpacity>
      )}
    </>
  );
};
