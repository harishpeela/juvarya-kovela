/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import {BackgroundImage} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useContext, useState, useEffect} from 'react';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import {PrimaryButton, ProfileInfo} from '../../components';
import {UploadPhoto} from '../../utils/svgs';
import {AccountIcon1, AccountIcon2, AccountIcon4, Demo} from '../../utils/svgs';
import {allTexts, colors} from '../../common';
import {useTranslation} from 'react-i18next';
import i18next, {resources} from '../../../languages/language';
import lan from '../../../languages/lan.json';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {GetProfilePic, PostProfilePic} from '../../utils/api';

const Profile = ({navigation}) => {
  const {userDetails, setLoginDetails, loginDetails} =
    useContext(ApplicationContext);
  const {t} = useTranslation();
  const {
    constants: {role},
  } = allTexts;
  // console.log('details', userDetails);
  const [roleType, setRoleType] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [profPic, setProfPic] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isCross, setIsCross] = useState(true);
  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    var roleAgent = ROLES?.indexOf('ROLE_AGENT') > -1;
    console.log('role', roleAdmin, roleAgent);
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    } else if (roleAgent) {
      setRoleType('ROLE_AGENT');
    }
  };
  useEffect(() => {
    Type();
    GetCustProfilePic();
  }, []);
  const updateProfilePicture = async () => {
    let img = getImageObj(image);
    console.log('img =====', img);
    let formdata = new FormData();
    formdata.append('profilePicture', img);
    console.log('form', formdata);
    let result = await PostProfilePic(formdata);
    // console.log('result of image update', result);
    if (result) {
      setIsCross(false);
    }
  };
  const GetCustProfilePic = async () => {
    try {
      let result = await GetProfilePic();
      console.log('data pic', result?.data);
      if (result) {
        setProfPic(result?.data?.url);
      }
    } catch (error) {
      console.log('error in get profile picture', error);
    }
  };
  const uploadPhoto = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
        },
        res => {
          if (!res.didCancel && !res.errorCode) {
            setImage(res.assets[0]);
            setimageUploaded(false);
            setIsModal(true);
          } else {
            console.log(res.errorMessage);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getImageObj = img => {
    let newUri =
      Platform.OS === 'ios' ? img.uri : img.uri.replace('file://', 'file:');
    let imageObj = {
      uri: newUri,
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    return imageObj;
  };
  const changelan = lang => {
    i18next.changeLanguage(lang);
    setIsVisible(false);
  };
  console.log('roletype', roleType);
  return (
    <SafeAreaView style={styles.wrapper}>
      <BackgroundImage />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
        </TouchableOpacity>
        <Text
          // numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: '500',
            textTransform: 'capitalize',
            marginRight: '50%',
          }}>
          {t('account')}
        </Text>
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={{alignSelf: 'flex-end'}}>
          <Image
            source={require('../../../assets/images/lan.webp')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
              {isCross && (
                <View style={styles.crossIconContainer}>
                  <Icon
                    onPress={() => {
                      setImage(null);
                    }}
                    name="closecircle"
                    color={colors.orangeColor}
                    size={25}
                  />
                </View>
              )}
              <Image
                resizeMode="cover"
                style={styles.preViewImage}
                source={{uri: image?.uri}}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPic}
              onPress={() => {
                uploadPhoto();
              }}>
              {profPic ? (
                <Image
                  source={{uri: profPic}}
                  style={{height: 100, width: 100, borderRadius: 100 / 2}}
                />
              ) : (
                <UploadPhoto />
              )}
            </TouchableOpacity>
          )}
        </View>
        <ProfileInfo
          name={userDetails?.username}
          email={userDetails?.email}
          // img={require('../../utils/assets/images/avatar.png')}
        />
      </View>
      <View style={styles.profileItemsContainer}>
        {/* <Item svg={<Demo />} text={bookings} />
        <Item svg={<AccountIcon2 />} text={donations} /> */}
        {(roleType === role.admin || roleType === role.agent) && (
          <Item
            svg={<AccountIcon4 />}
            text={t('myTemple')}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.myTamples);
            }}
          />
        )}

        <Item
          svg={<AccountIcon1 />}
          text={t('updatepassword')}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.updatePassword);
          }}
        />
        <Item
          svg={<AccountIcon1 />}
          text={t('posts')}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.mySavedPosts);
          }}
        />
        {(roleType === role.admin || roleType === role.agent) && (
          <Item1
            svg={require('../../../assets/images/priest.webp')}
            text={t('poojari')}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.poojari);
            }}
          />
        )}
      </View>
      <View style={styles.logoutbtnContainer}>
        <PrimaryButton
          onPress={async () => {
            await removeLoginSessionDetails();
            setLoginDetails(null);
            console.log('logindetails', loginDetails);
          }}
          bgColor={colors.orangeColor}
          radius={25}
          text={'Log Out'}
        />
      </View>
      <Modal
        visible={isVisible}
        transparent={true}
        style={{position: 'absolute', left: 20}}
        onRequestClose={() => setIsVisible(false)}>
        <View
          style={{
            position: 'absolute',
            right: 50,
            top: 20,
            backgroundColor: colors.orangeColor,
            padding: 10,
            borderTopLeftRadius: 20,
          }}>
          <FlatList
            data={Object.keys(resources)}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => changelan(item)}>
                <Text style={{fontSize: 12, margin: 5}}>{lan[item]?.lan} </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Modal
        visible={isModal}
        transparent={true}
        onRequestClose={() => setIsModal(false)}>
        <View style={styles.editPic}>
          <TouchableOpacity
            onPress={() => {
              updateProfilePicture(), setIsModal(false);
            }}>
            <Text style={{color: 'white'}}> update profile Pictue</Text>
          </TouchableOpacity>
          <View style={{borderWidth: 0.5, width: '100%', margin: 5}} />
          <TouchableOpacity
            onPress={() => {
              setImage(null), setIsModal(false), setIsCross(false);
            }}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const Item = ({text, svg, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.iconContainer}>{svg}</View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
const Item1 = ({text, svg, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View
      style={{
        borderWidth: 2,
        borderRadius: 20,
        padding: 2,
        borderColor: colors.orangeColor,
      }}>
      <Image
        source={svg}
        style={{height: 20, width: 20, tintColor: colors.orangeColor}}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText1}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Profile;
