/* eslint-disable no-alert */
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
  useColorScheme,
  ScrollView,
} from 'react-native';
import {BackgroundImageAClass, Terms_And_Conditions} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useContext, useState, useEffect} from 'react';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import {
  PrimaryButton,
  ProfileInfo,
  Loader,
  Item,
} from '../../components';
import {allTexts, colors} from '../../common';
import {useTranslation} from 'react-i18next';
import i18next, {resources} from '../../../languages/language';
import lan from '../../../languages/lan.json';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  GetProfilePic,
  PostProfilePic,
  AdminTemples,
  MyMemberships,
  MyDonations,
  getUserInfoNew,
} from '../../utils/api';
const Profile = ({navigation}) => {
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const {t} = useTranslation();
  // console.log('userdetails', userDetails);
  const {
    constants: {role},
  } = allTexts;
  const [roleType, setRoleType] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [profPic, setProfPic] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isCross, setIsCross] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [tcModal, setTcModal] = useState(false);
  const [Admin, setAdmin] = useState([]);
  const [loader, setLoader] = useState(false);
  const [myMemberships, setMyMemberships] = useState([]);
  const [MyDonationsList, setMyDonationsList] = useState([]);
  const [custDetails, setCustDetails] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    var roleAgent = ROLES?.indexOf('ROLE_AGENT') > -1;
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    } else if (roleAgent) {
      setRoleType('ROLE_AGENT');
    }
  };
  useEffect(() => {
    Type();
    // GetCustProfilePic();
  }, []);
  const updateProfilePicture = async () => {
    let img = getImageObj(image);
    let formdata = new FormData();
    console.log('img===>', img)
    formdata.append('profilePicture', img);
    let result = await PostProfilePic(formdata);
    console.log('updated', result?.data);
    if (result) {
      setIsCross(true);
      currentCust();
    } else {
      console.log('something went wrong', result)
    }
  };
  // const GetCustProfilePic = async () => {
  //   setIsLoading(true);
  //   try {
  //     let result = await GetProfilePic(userDetails?.email);
  //     // console.log('profilepic ===>', result?.data);
  //     if (result) {
  //       setProfPic(result?.data);
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log('error in get profile picture', error);
  //   }
  // };
const currentCust = async () => {
  let result = await getUserInfoNew();
  console.log('res of profile', result?.data);
  setCustDetails(result?.data);
}
 
  const uploadPhoto = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          // maxHeight: 1080,
          // maxWidth: 1080,
        },
        res => {
          if (!res?.didCancel && !res?.errorCode) {
            setImage(res?.assets[0]);
            setimageUploaded(false);
            setIsModal(true);
          } else {
            console.log(res?.errorMessage);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getImageObj = img => {
    let newUri =
      Platform.OS === 'ios' ? img?.uri : img?.uri?.replace('file://', 'file:');
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
  const TC = () => {
    setClicked(true);
    if (clicked === true) {
      setTcModal(true);
    } else {
      setTcModal(true);
    }
  };
  const TempleAdmins = async () => {
    setLoader(true);
    console.log('loader first', loader);
    let result = await AdminTemples();
    console.log('admins temples', result?.data);
    if (result?.status === 200) {
      setAdmin(result?.data);
      setLoader(false);
      console.log('loader second', loader);
    } else {
      setAdmin([]);
      setLoader(false);
      console.log('loader third', loader);
    }
  };
  useEffect(() => {
    TempleAdmins();
    currentCust();
  }, []);
 
  const MyMembershipsData = async () => {
    setLoader(true);
    let result = await MyMemberships(1, 0, 20);
    // console.log('result.date ====>', result.data);
    if (result) {
      setMyMemberships(result?.data.data);
      setLoader(false);
    } else {
      setMyMemberships([]);
      setLoader(false);
    }
  };
  useEffect(() => {
    MyMembershipsData();
  }, []);
 
  const MyDonationsData = async () => {
    setLoader(true);
    let result = await MyDonations(35);
    // console.log('result.date ====kkk>', result?.data);
    if (result) {
      setMyDonationsList(result?.data.data);
      setLoader(false);
    } else {
      setMyDonationsList([]);
      setLoader(false);
    }
  };
  useEffect(() => {
    MyDonationsData();
  }, []);
 
  return (
    <SafeAreaView style={styles.wrapper}>
      <BackgroundImageAClass />
      <View style={styles.header} />
      <View style={styles.profileContainer}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
              {isCross && (
                <View style={styles.crossIconContainer}>
                  <EvilIcons
                    onPress={() => {
                      setImage(null);
                      uploadPhoto();
                    }}
                    name="pencil"
                    color={colors.black}
                    size={25}
                  />
                </View>
              )}
              <Image
                resizeMode="cover"
                style={styles.preViewImage}
                source={{uri: image?.uri ? image?.uri : custDetails?.media?.url}}
              />
            </View>
          ) : isLoading ? (
            <View style={styles.loader}>
              <Loader size={'small'} color={colors.orangeColor} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPic}
              onPress={() => {
                uploadPhoto();
              }}>
              {custDetails?.media ? (
                <Image
                  source={{uri: custDetails?.media?.url}}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImage}>
                  {/* <Icon name="camera" size={60} color={colors.orangeColor} /> */}
                  <Image
                    source={{
                      uri: 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
                    }}
                    style={styles.profileImage}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
        <ProfileInfo name={userDetails?.username} email={userDetails?.email} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileItemsHeader}>
          <View style={styles.profileItemsContainer}>
          {/* <Item
              svg={
                <AntDesign name="idcard" size={20} color={colors.black} />
              }
              text={t('ToDo List')}
              // onPress={() => {
              //   navigation.navigate(allTexts.screenNames.todoList);
              // }}
              onPress={() =>
                alert('Under Development')
              }
            /> */}
              <Item
              svg={
                <FontAwesome5
                  name="gopuram"
                  size={20}
                  color={isDarkMode ? 'black' : 'black'}
                />
              }
                text={t('Communities')}
                onPress={() => {
                  navigation.navigate(allTexts.screenNames.myTamples);
                }}
              />
            <Item
              svg={
                <Icon
                  name="unlock"
                  size={20}
                  color={isDarkMode ? 'black' : 'black'}
                />
              }
              text={t('updatepassword')}
              onPress={() => {
                navigation.navigate(allTexts.screenNames.updatePassword);
              }}
            />
            <Item
              svg={
                <FontAwesome5
                  name="save"
                  size={20}
                  color={isDarkMode ? 'black' : 'black'}
                />
              }
              text={t('posts')}
              onPress={() => {
                navigation.navigate(allTexts.screenNames.mySavedPosts);
              }}
            />
            <Item
              svg={
                <FontAwesome5
                  name="user-edit"
                  size={16}
                  style={{marginLeft: 4}}
                  color={isDarkMode ? 'black' : 'black'}
                />
              }
              text={t('update Profile')}
              onPress={() => {
                navigation.navigate(allTexts.screenNames.updateProfile);
              }}
            />
 
            <Item
              svg={
                <AntDesign name="idcard" size={20} color={colors.black} />
              }
              text={t('My Memberships')}
              onPress={() => {
                navigation.navigate(allTexts.screenNames.profileMyMemberships);
              }}
            />
 
            {MyDonations && (
              <Item
                svg={
                  <FontAwesome5
                    name="donate"
                    size={18}
                    style={{marginLeft: 1}}
                    color={isDarkMode ? 'black' : 'black'}
                  />
                }
                text={t('My Donations')}
                onPress={() => {
                  navigation.navigate(allTexts.screenNames.profileDonations);
                }}
              />      
)}
 
            {/* {(roleType === role.admin || roleType === role.agent) && (
            <Item1
              svg={require('../../../assets/images/priest.webp')}
              text={t('poojari')}
              onPress={() => {
                navigation.navigate(allTexts.screenNames.poojari);
              }}
            />
          )} */}
          </View>
          <View style={styles.logoutbtnContainer}>
            <PrimaryButton
              onPress={async () => {
                await removeLoginSessionDetails();
                setLoginDetails(null);
              }}
              bgColor={colors.orangeColor}
              loading={false}
              radius={25}
              text={'Log out'}
              shadow={true}
              textColor={colors.white}
            />
            <Text style={styles.versionText}>
              Version&ensp;{allTexts.appVersion.version}
            </Text>
            <View>
              <TouchableOpacity onPress={() => TC()}>
                <Text
                  style={{
                    ...styles.tabs,
                    color: 'gray',
                    textDecorationLine: clicked === true ? 'underline' : 'none',
                    fontWeight: clicked === true ? 'bold' : '400',
                  }}>
                  Terms & Conditions{' '}
                </Text>
              </TouchableOpacity>
              {tcModal && (
                <Terms_And_Conditions
                  isModal={tcModal}
                  onPress={() => setTcModal(false)}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
 
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
            <Text style={{color: 'white',fontSize:12}}> Update Profile Picture</Text>
          </TouchableOpacity>
          <View style={{borderWidth: 0.5, width: '100%', margin: 5}} />
          <TouchableOpacity
            onPress={() => {
              setImage(null), setIsModal(false), setIsCross(false);
            }}>
            <Text style={{color: 'white',fontSize:12}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Profile;
 