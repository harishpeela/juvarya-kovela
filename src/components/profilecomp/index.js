/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Loader} from '../loader';
import {styles, style, textStyles} from './styles';
import {allTexts} from '../../common';
import {colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
export const ProfileFirstTab = ({
  profileImg,
  itemDetails,
  itemCommunity,
  followCount,
}) => {
  return (
    <View style={styles.infoContainer}>
      <Image source={{uri: profileImg}} style={styles.profileView} />

      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: '600', fontSize: 16}}>
          {itemDetails?.length}
        </Text>
        <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
          Posts
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: '600', fontSize: 16}}>{followCount}</Text>
        <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
          Followers
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: '600', fontSize: 16}}>
          {itemCommunity?.length}
        </Text>
        <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
          Communities
        </Text>
      </View>
    </View>
  );
};
export const ProfileSeconTab = ({title, nameData}) => {
  return (
    <>
      <View style={styles.footerHead}>
        <Text>
          <Text style={styles.boldText} numberOfLines={1}>
            {title?.length < 17 ? `${title}` : `${title?.substring(0, 17)}...`}
          </Text>
          <Text style={styles.ratingText}>
            <AntDesign name={'star'} color={'#FFA001'} size={20} /> {'4.8'}
          </Text>
        </Text>
      </View>

      <View style={styles.subFooterHead}>
        <Text style={{color: '#FFA001', fontSize: 18}}>
          {/* {nameData?.feedType} */}
        </Text>
      </View>

      <View style={styles.footerBody}>
        <Text style={styles.desciption}>• {nameData?.description}</Text>
      </View>
    </>
  );
};

export const ProfileThiredTab = ({
  followVisible,
  followBtnDisable,
  followTemples,
  isFollow,
  roleId,
  onPress,
  onPlusPress,
}) => {
  return (
    <View style={styles.footerAction}>
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
          onPress={followTemples}
          text={
            isFollow
              ? allTexts.buttonTexts.unFollow
              : allTexts.buttonTexts.follow
          }
        />
      )}

      <Pressable style={styles.voidButton}>
        <Text style={styles.voidButton.text}>Contact</Text>
      </Pressable>

      <Pressable style={styles.voidButton}>
        <Text style={styles.voidButton.text}>Directions</Text>
      </Pressable>
      {roleId === 'ROLE_ITEM_ADMIN' && (
        <TouchableOpacity onPress={onPlusPress}>
          <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export const PrimaryButton1 = ({
  bgColor,
  textColor,
  radius,
  text,
  onPress,
  loading,
  padding,
  fontsize,
  width,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style(bgColor, radius, padding, width).wrapper}
      {...props}>
      <Text style={textStyles(textColor, fontsize).textTitle}>
        {loading == true ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  );
};
export const ProfileFourthTab = ({
  setCurrentIndex,
  currentIndex,
  templeDetails,
}) => {
  return (
    <View style={styles.controlPanel}>
      <Pressable
        style={styles.controlPanel.item}
        onPress={() => setCurrentIndex(1)}>
        <Feather
          name="grid"
          color={currentIndex === 1 ? '#FFA001' : '#585858'}
          size={24}
        />
        <Text
          style={{
            ...styles.controlPanel.item.text,
            color: currentIndex === 1 ? '#FFA001' : '#585858',
          }}>
          Posts
        </Text>
      </Pressable>
      {templeDetails?.ecommerceEnabled && (
        <Pressable
          style={styles.controlPanel.item}
          onPress={() => setCurrentIndex(4)}>
          <FontAwesome
            name="calendar-plus-o"
            color={currentIndex === 4 ? '#FFA001' : '#585858'}
            size={24}
          />
          <Text
            style={{
              ...styles.controlPanel.item.text,
              color: currentIndex === 4 ? '#FFA001' : '#585858',
            }}>
            Events
          </Text>
        </Pressable>
      )}
      {templeDetails?.reelsEnabled && (
        <Pressable
          style={{...styles.controlPanel.item}}
          onPress={() => setCurrentIndex(2)}>
          <MaterialCommunityIcons
            name="movie-open-outline"
            color={currentIndex === 2 ? '#FFA001' : '#585858'}
            size={24}
          />
          <Text
            style={{
              ...styles.controlPanel.item.text,
              color: currentIndex === 2 ? '#FFA001' : '#585858',
            }}>
            Reels
          </Text>
        </Pressable>
      )}
      {templeDetails?.servicesEnabled && (
        <Pressable
          style={styles.controlPanel.item}
          onPress={() => setCurrentIndex(3)}>
          <Entypo
            name="shop"
            color={currentIndex === 3 ? '#FFA001' : '#585858'}
            size={24}
          />
          <Text
            style={{
              ...styles.controlPanel.item.selectedText,
              color: currentIndex === 3 ? '#FFA001' : '#585858',
            }}>
            Services
          </Text>
        </Pressable>
      )}

      {templeDetails?.donationsEnabled && (
        <Pressable
          style={styles.controlPanel.item}
          onPress={() => setCurrentIndex(5)}>
          <FontAwesome5
            name="hand-holding-heart"
            color={currentIndex === 5 ? '#FFA001' : '#585858'}
            size={24}
          />
          <Text
            style={{
              ...styles.controlPanel.item.text,
              color: currentIndex === 5 ? '#FFA001' : '#585858',
            }}>
            Donate
          </Text>
        </Pressable>
      )}
    </View>
  );
};
