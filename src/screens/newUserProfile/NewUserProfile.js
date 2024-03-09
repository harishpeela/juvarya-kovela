import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { styles } from './styles';
import {
  ProfileFourthTab,
  Terms_And_Conditions,
} from '../../components';
import { BackgroundImageAClass, Loader } from '../../components';
import { useTranslation } from 'react-i18next';
import MaterialIconss from 'react-native-vector-icons/MaterialIcons';
import { allTexts } from '../../common';
import { useColorScheme } from 'react-native';
import { ProfileInfo } from '../../components';
import { PostProfilePic, ShowReels, getUserInfoNew } from '../../utils/api';
import { Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../common';
import { Item } from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MyDonations } from '../../utils/api';
import { removeLoginSessionDetails } from '../../utils/preferences/localStorage';
import { PrimaryButton } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import ApplicationContext from '../../utils/context-api/Context';
import Video from 'react-native-video';
import { createThumbnail } from 'react-native-create-thumbnail';
import { Video_Player } from '../../components/video-thumbnail';
const NewUserProfile = ({ navigation }) => {
  const { userDetails, setLoginDetails } = useContext(ApplicationContext);
  const [height, setHeight] = useState('');
  const [widthh, setWidth] = useState('');
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const onBuffer = buffer => {
  };

  const onError = error => {
  };

  // console.log('userdetails', userDetails);
  const {
    constants: { role },
  } = allTexts;
  const [roleType, setRoleType] = useState();
  const [mute, setMute] = useState(true);
  const [modalMute, setModalMute] = useState(true)
  const [like, setLike] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVIsibleModal, setIsVisibleModal] = useState(false);
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [userReels, setUserReels] = useState('');
  const [currentFrame, setCurrentFrame] = useState('0');
  const [isLoader, setIsLoader] = useState(false);
  const [url, setUrl] = useState();
  const [thumbnails, setThumbnails] = useState([]);
  const [mediaLoader, setMediaLoader] = useState(false);
 
 
useEffect(() => {

    const fetchThumbnails = async () => {

      const thumbnailData = [];

      for (const [index, item] of userReels.entries()) {

        try {

          const thumbnail = await createThumbnail({

            url: item?.mediaList[0]?.url,

            timeStamp: 10000,

          });

          thumbnailData[index] = { path: thumbnail.path, loaded: false };

          setThumbnails([...thumbnailData]);

        } catch (error) {

          console.error('Error generating thumbnail:', error);
          thumbnailData[index] = { path: null, loaded: false };
          setThumbnails([...thumbnailData]);
        }
      }
    };
 
    fetchThumbnails();

  }, [userReels]);



console.log('thumbnails ==>', thumbnails);
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
  }, []);

  const updateProfilePicture = async () => {
    let img = getImageObj(image);
    let formdata = new FormData();
    console.log('img===>', img);
    formdata.append('profilePicture', img);
    let result = await PostProfilePic(formdata);
    console.log('updated', result?.data);
    if (result) {
      setIsCross(true);
      currentCust();
    } else {
      console.log('something went wrong', result);
    }
  };

  const UserReels = async (pgNo, pgSize, bool) => {
    setMediaLoader(true);
    const response = await ShowReels(pgNo, pgSize, bool);
    if (response?.status === 200) {
      setUserReels(response?.data?.data);
      setLoader(false);
      setMediaLoader(false);
    } else {
      setLoader(false);
      setMediaLoader(false);
    }
  };

  useEffect(() => {
    UserReels(0, 30, true);
  }, []);
  console.log('userReels', userReels);
  const currentCust = async () => {
    setIsLoading(true)
    let result = await getUserInfoNew();
    // console.log('res of profile', result?.data);
    if (result?.status === 200) {
      setCustDetails(result?.data);
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  };

  const uploadPhoto = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          // maxHeight: 1080,A
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
    // console.log('admins temples', result?.data);
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
  const modal = (url) => {
    setIsLoader(!isLoader)
    setModalMute(false)
    setUrl(url);
  }

  return (
    <View style={styles.mainContainer}>
      <BackgroundImageAClass />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ borderRadius: 28 / 2, marginTop: 12 }}
          onPress={() => {
            navigation.goBack();
            route?.params?.onSelect({
              selected: isFollow,
              selectedId: !isFollow ? trfData?.jtProfile : '',
            });
          }}>
          <TouchableOpacity
            style={styles.e}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="arrow-back-circle"
              size={39}
              color="orange"
              style={{ marginLeft: 2, marginTop: -1 }}
            />
          </TouchableOpacity>

        </TouchableOpacity>
        <View style={styles.menuAndAlert}>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <View style={styles.menu}>
              <Feather name="menu" size={28} color={colors.black} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
              {isCross && (
                <View style={styles.crossIconContainer}>
                  <EvilIcons
                    onPress={() => {
                      setImage(null);
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
                source={{
                  uri: image?.uri ? image?.uri : custDetails?.media?.url,
                }}
              />
            </View>
          ) : isLoading ? (
            <View style={styles.loader}>
              <Loader size={'small'} color={colors.orangeColor} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPic}
              onPress={() => uploadPhoto()}>
              {custDetails?.media ? (
                <Image
                  source={{ uri: custDetails?.media?.url }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImage}>
                  <Icon name="camera" size={60} color={colors.orangeColor} />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
        <ProfileInfo name={userDetails?.username} email={userDetails?.email} />
      </View>
      <View>
        <ProfileFourthTab
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        {currentIndex === 1 || userReels?.length > 0 ? (
         <ScrollView style={{ marginBottom: 10, height: '60%' }}>
           {mediaLoader ? (
            <View style={{}}>
              <Loader size={'small'} color={colors.orangeColor} />
            </View>
           ) : (
           userReels?.length ? (
            <FlatList
            numColumns={3}
            data={userReels}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => modal(item?.mediaList[0]?.url)}>
                <Image
                  source={{ uri: thumbnails[index]?.path }}
                  style={{
                    height: Dimensions.get('window').height / 6 + 60,
                    width: Dimensions.get('window').width / 3,
                    margin: 2,
                  }}
                />
              </TouchableOpacity>
            )}
          />
           ) : (
            <View style={{alignItems: 'center', marginTop: '30%'}}>
              <Text style={{color: colors.orangeColor, fontFamily: 'semi-bold'}}> No Data to Display</Text>
            </View>
           )
           )}
         </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20%',
            }}>
            <Feather name="camera-off" size={40} style={styles.noPosts} />
            <Text style={styles.noPosts}>No Reels Yet</Text>
          </View>
        )}
      </View>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}>
        <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={styles.model}>
          <View style={styles.modalView}>
            <View style={styles.line} />
            <ScrollView>
              <View style={styles.profileItemsHeader}>
                <View style={styles.profileItemsContainer}>
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
                      <FontAwesome5
                        name="lock"
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
                    text={'posts'}
                    onPress={() => {
                      navigation.navigate(allTexts.screenNames.mySavedPosts);
                    }}
                  />
                  <Item
                    svg={
                      <FontAwesome5
                        name="user-edit"
                        size={16}
                        style={{ marginLeft: 4 }}
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
                      navigation.navigate(
                        allTexts.screenNames.profileMyMemberships,
                      );
                    }}
                  />

                  {MyDonations && (
                    <Item
                      svg={
                        <FontAwesome5
                          name="donate"
                          size={18}
                          style={{ marginLeft: 1 }}
                          color={isDarkMode ? 'black' : 'black'}
                        />
                      }
                      text={t('My Donations')}
                      onPress={() => {
                        navigation.navigate(
                          allTexts.screenNames.profileDonations,
                        );
                      }}
                    />
                  )}
                  <Item
                    svg={
                      <AntDesign name="idcard" size={20} color={colors.black} />
                    }
                    text={t('Favourites')}
                    onPress={() => {
                      navigation.navigate(allTexts.screenNames.favlist);
                    }}
                  />
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
                          textDecorationLine:
                            clicked === true ? 'underline' : 'none',
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
          </View>
        </Pressable>
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
            <Text style={{ color: 'white', fontSize: 12 }}>
              {' '}
              Update Profile Picture
            </Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5, width: '100%', margin: 5 }} />
          <TouchableOpacity
            onPress={() => {
              setImage(null), setIsModal(false), setIsCross(false);
            }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={isLoader} transparent={true}>
        <View style={{ marginTop: '40%', marginVertical: '5%', marginHorizontal: '2%', borderRadius: 10, height: '60%' }}>
          <MaterialIconss name='cancel' size={24} color={'black'} style={{ alignSelf: 'flex-end' }} onPress={() => { setIsLoader(false); setModalMute(true) }} />
          <Video
            videoRef={videoRef}
            onBuffer={() => onBuffer()}
            onError={onError}
            repeat={false}
            resizeMode='cover'
            source={{ uri: url }}
            muted={modalMute}
            seek={40}
            paused={false}
            style={{
              height: '100%',
              width: '100%',
              margin: 2,
              alignSelf: 'center',
              borderRadius: 10
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default NewUserProfile;