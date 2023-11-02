/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {BackgroundSmallFlower} from '../backgroundFlower';
import LinearGradient from 'react-native-linear-gradient';
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
  return (
    <>
      <View style={styles.subFooterHead}>
        <Text style={{color: '#FFA001', fontSize: 18}}>
          {/* {nameData?.feedType} */}
        </Text>
      </View>

      <View style={styles.footerBody}>
        <Text style={styles.desciption}>{nameData?.description}</Text>
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
  ...props
}) => {
  return (
    <LinearGradient
      colors={['#CC4501', '#CC4501']}
      style={{
        height: 40,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        marginRight: 10,
      }}>
      <TouchableOpacity
        onPress={onPress}
        // style={style(bgColor, radius, padding, width, borderWidth).wrapper}
        {...props}>
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
// export const ProfileFourthTab = ({
//   setCurrentIndex,
//   currentIndex,
//   templeDetails,
// }) => {
//   return (
//     <View style={styles.controlPanel}>
//       <Pressable
//         style={{
//           ...styles.controlPanel.item,
//           borderBottomWidth: currentIndex === 1 ? 1 : 0,
//           borderColor: currentIndex === 1 ? colors.orangeColor : null,
//         }}
//         onPress={() => setCurrentIndex(1)}>
//         <Feather
//           name="grid"
//           color={currentIndex === 1 ? '#FFA001' : '#585858'}
//           size={24}
//         />
//         <Text
//           style={{
//             ...styles.controlPanel.item.text,
//             color: currentIndex === 1 ? '#FFA001' : '#585858',
//           }}>
//           Posts
//         </Text>
//       </Pressable>
//       {templeDetails?.ecommerceEnabled && (
//         <Pressable
//           style={{
//             ...styles.controlPanel.item,
//             borderBottomWidth: currentIndex === 4 ? 1 : 0,
//             borderColor: currentIndex === 4 ? colors.orangeColor : null,
//           }}
//           onPress={() => setCurrentIndex(4)}>
//           <FontAwesome
//             name="calendar-plus-o"
//             color={currentIndex === 4 ? '#FFA001' : '#585858'}
//             size={24}
//           />
//           <Text
//             style={{
//               ...styles.controlPanel.item.text,
//               color: currentIndex === 4 ? '#FFA001' : '#585858',
//             }}>
//             Events
//           </Text>
//         </Pressable>
//       )}
//       {templeDetails?.reelsEnabled && (
//         <Pressable
//           style={{
//             ...styles.controlPanel.item,
//             borderBottomWidth: currentIndex === 2 ? 1 : 0,
//             borderColor: currentIndex === 2 ? colors.orangeColor : null,
//           }}>
//           <MaterialCommunityIcons
//             name="movie-open-outline"
//             color={currentIndex === 2 ? '#FFA001' : '#585858'}
//             size={24}
//           />
//           <Text
//             style={{
//               ...styles.controlPanel.item.text,
//               color: currentIndex === 2 ? '#FFA001' : '#585858',
//             }}>
//             Reels
//           </Text>
//         </Pressable>
//       )}
//       {templeDetails?.servicesEnabled && (
//         <Pressable
//           style={{
//             ...styles.controlPanel.item,
//             borderBottomWidth: currentIndex === 3 ? 1 : 0,
//             borderColor: currentIndex === 3 ? colors.orangeColor : null,
//           }}
//           onPress={() => setCurrentIndex(3)}>
//           <Entypo
//             name="shop"
//             color={currentIndex === 3 ? '#FFA001' : '#585858'}
//             size={24}
//           />
//           <Text
//             style={{
//               ...styles.controlPanel.item.selectedText,
//               color: currentIndex === 3 ? '#FFA001' : '#585858',
//             }}>
//             Services
//           </Text>
//         </Pressable>
//       )}

//       {templeDetails?.donationsEnabled && (
//         <Pressable
//           style={{
//             ...styles.controlPanel.item,
//             borderBottomWidth: currentIndex === 5 ? 1 : 0,
//             borderColor: currentIndex === 5 ? colors.orangeColor : null,
//           }}>
//           <FontAwesome5
//             name="hand-holding-heart"
//             color={currentIndex === 5 ? '#FFA001' : '#585858'}
//             size={24}
//           />
//           <Text
//             style={{
//               ...styles.controlPanel.item.text,
//               color: currentIndex === 5 ? '#FFA001' : '#585858',
//             }}>
//             Donate
//           </Text>
//         </Pressable>
//       )}
//     </View>
//   );
// };

export const ProfileFourthTab = ({
  setCurrentIndex,
  currentIndex,
  templeDetails,
}) => {
  return (
    <View style={styles.controlPanel}>
      <Pressable
        style={{
          ...styles.controlPanel.item,
          borderBottomWidth: currentIndex === 1 ? 5 : 0,
          borderColor: currentIndex === 1 ? '#CC4501' : null,
        }}
        onPress={() => setCurrentIndex(1)}>
        <Feather
          name="grid"
          color={currentIndex === 1 ? '#CC4501' : '#585858'}
          size={24}
        />
        <Text
          style={{
            ...styles.controlPanel.item.text,
            color: currentIndex === 1 ? '#CC4501' : '#585858',
            // textDecorationLine: 'red',
          }}>
          POSTS
        </Text>
      </Pressable>
      {templeDetails && (
        <Pressable
          style={{
            ...styles.controlPanel.item,
            borderBottomWidth: currentIndex === 4 ? 3 : 0,
            borderColor: currentIndex === 4 ? '#CC4501' : null,
          }}
          onPress={() => setCurrentIndex(4)}>
          <Ionicons
            name="location-outline"
            color={currentIndex === 4 ? '#CC4501' : '#585858'}
            size={24}
          />
          {/* <Image
            source={require('../../../assets/images/location.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: currentIndex === 4 ? '#CC4501' : '#585858',
            }}
          /> */}
          {/* <Text
            style={{
              ...styles.controlPanel.item.text,
              color: currentIndex === 4 ? '#CC4501' : '#585858',
            }}>
            Events
          </Text> */}
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
            name="movie-open-outline"
            color={currentIndex === 2 ? '#CC4501' : '#585858'}
            size={24}
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
      {templeDetails?.servicesEnabled && (
        <Pressable
          style={{
            ...styles.controlPanel.item,
            borderBottomWidth: currentIndex === 3 ? 5 : 0,
            borderColor: currentIndex === 3 ? '#CC4501' : null,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCurrentIndex(3)}>
          <AntDesign
            name="clockcircleo"
            color={currentIndex === 3 ? '#CC4501' : '#585858'}
            size={24}
          />
          {/* <Text
            style={{
              ...styles.controlPanel.item.text,
              color: currentIndex === 2 ? '#CC4501' : '#585858',
            }}>
            Reels
          </Text> */}
        </Pressable>
      )}

      {/* {templeDetails?.donationsEnabled && ( */}
      {templeDetails && (
        <Pressable
          style={{
            ...styles.controlPanel.item,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: currentIndex === 5 ? 5 : 0,
            borderColor: currentIndex === 5 ? '#CC4501' : null,
          }}
          onPress={() => setCurrentIndex(5)}>
          <Feather
            name="users"
            color={currentIndex === 5 ? '#CC4501' : '#585858'}
            size={24}
          />
          {/* <Text
            style={{
              ...styles.controlPanel.item.text,
              color: currentIndex === 5 ? '#CC4501' : '#585858',
            }}>
            Donate
          </Text> */}
        </Pressable>
      )}
    </View>
  );
};
