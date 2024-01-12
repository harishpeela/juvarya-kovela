/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {BackgroundSmallFlower} from '../backgroundFlower';
import LinearGradient from 'react-native-linear-gradient';
import {Loader} from '../loader';
import {styles, textStyles} from './styles';
import {allTexts} from '../../common';
import {colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <View style={styles.subFooterHead}>
        <Text style={{color: '#FFA001', fontSize: 18}} />
      </View>

      <View style={styles.footerBody}>
        <Text
          style={{...styles.desciption, color: isDarkMode ? 'gray' : 'gray',fontSize:13}}>
          {nameData?.description}
        </Text>
        {/* •  */}
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
  borderWidth,
  isFollow,
  shadow,
  ...props
}) => {
  return (
    <LinearGradient
      style={[
        styles.buttonContainer,
        shadow
          ? {
              elevation: 3,
              shadowColor: 'black',
              shadowOffset: {width: 6, height: 6},
            }
          : 0,
      ]}
      colors={['#CC4501', '#CC4501']}>
      <TouchableOpacity onPress={onPress} {...props}>
        <Text style={textStyles(textColor, fontsize).textTitle}>
          {loading == true ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : isFollow ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <BackgroundSmallFlower />
              <Text
                style={{
                  marginLeft: 20,
                  color: colors.white,
                  fontWeight: 'bold',
                }}>
                {text}{' '}
              </Text>
            </View>
          ) : (
            <Text style={{fontWeight: 'bold'}}> {text} </Text>
          )}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const ProfileFourthTab = ({
  setCurrentIndex,
  currentIndex,
  templeDetails,
}) => {
  return (
    <View style={styles.controlPanelContainer}>
      <View style={styles.controlPanel}>
        <Pressable
          style={{
            ...styles.controlPanel.item,
            borderBottomWidth: currentIndex === 1 ? 2 : 0,
            borderColor: currentIndex === 1 ? '#CC4501' : null,
          }}
          onPress={() => setCurrentIndex(1)}>
          <Feather
            name="grid"
            color={currentIndex === 1 ? '#CC4501' : colors.gray2}
            size={24}
            styles={styles.Icon}
          />
          {/* <Text
            style={{
              ...styles.controlPanel.item.postText,
              color: currentIndex === 1 ? '#CC4501' : colors.gray2,
            }}>
            POSTS
          </Text> */}
        </Pressable>
        {templeDetails && (
          <Pressable
            style={{
              ...styles.controlPanel.item,
              borderBottomWidth: currentIndex === 4 ? 2 : 0,
              borderColor: currentIndex === 4 ? '#CC4501' : null,
            }}
            onPress={() => setCurrentIndex(4)}>
            <MaterialCommunityIcons
              name="party-popper"
              color={currentIndex === 4 ? '#CC4501' : colors.gray2}
              size={24}
              style={styles.Icon}
            />
          </Pressable>
        )}
        {templeDetails?.reelsEnabled && (
          <Pressable
            style={{
              ...styles.controlPanel.item,
              borderBottomWidth: currentIndex === 2 ? 1 : 0,
              borderColor: currentIndex === 2 ? '#CC4501' : null,
            }}>
            <MaterialCommunityIcons
              name="party-popper"
              color={currentIndex === 3 ? '#CC4501' : colors.gray2}
              size={24}
              style={styles.Icon}
            />
            <Text
              style={{
                ...styles.controlPanel.item.text,
                color: currentIndex === 2 ? '#CC4501' : '#585858',
              }}>
              Reels
            </Text>
          </Pressable>
        )}
        {/* {templeDetails?.servicesEnabled && (
          <Pressable
            style={{
              ...styles.controlPanel.item,
              borderBottomWidth: currentIndex === 3 ? 2 : 0,
              borderColor: currentIndex === 3 ? '#CC4501' : null,
            }}
            onPress={() => setCurrentIndex(3)}>
            <MaterialCommunityIcons
              name="party-popper"
              color={currentIndex === 3 ? '#CC4501' : colors.gray2}
              size={24}
              style={styles.Icon}
            />
          </Pressable>
        )} */}
        {templeDetails && (
          <Pressable
            style={{
              ...styles.controlPanel.item,
              borderBottomWidth: currentIndex === 5 ? 2 : 0,
              borderColor: currentIndex === 5 ? '#CC4501' : null,
            }}
            onPress={() => setCurrentIndex(5)}>
            <Feather
              name="users"
              color={currentIndex === 5 ? '#CC4501' : colors.gray2}
              size={24}
              style={styles.Icon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};
