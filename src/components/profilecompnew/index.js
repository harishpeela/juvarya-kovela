import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import {styles} from './styles';
import {Loader} from '../loader';
import {allTexts, colors} from '../../common';
import {PrimaryButton1} from '../profilecomp';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const FollowersComp = ({followCount, onPressFollowers}) => {
  return (
    <TouchableOpacity onPress={onPressFollowers} style={styles.followersView}>
      <Text style={styles.postText}>{followCount}</Text>
      <Text style={styles.postText}>followers</Text>
    </TouchableOpacity>
  );
};
export const CommunityComp = ({itemCommunity, onPressmembership}) => {
  return (
    <TouchableOpacity onPress={onPressmembership} style={styles.followersView}>
      <Text>{itemCommunity}</Text>
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
          padding={11}
          width={100}
          onPress={followTemples}
          textColor={isFollow ? colors.white : colors.black}
          // borderWidth={isFollow ? 0 : 1}
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
