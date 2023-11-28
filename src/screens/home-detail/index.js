/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import PostIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StoryIcon from 'react-native-vector-icons/MaterialIcons';
import GoBackIcon from 'react-native-vector-icons/AntDesign';
import React, {useContext, useEffect, useState} from 'react';
import {InfoHeader, PrimaryButton, Loader, SweetAlert} from '../../components';
import {colors} from '../../common';
import {styles} from './styles';
import {allTexts} from '../../common';
import {
  followUnfollowTemple,
  getFeedList,
  getTempleDetails,
} from '../../utils/api';
import Snackbar from 'react-native-snackbar';
import ApplicationContext from '../../utils/context-api/Context';
const HomeDetail = ({navigation, route}) => {
  const [loader, setloader] = useState(true);
  const {userDetails} = useContext(ApplicationContext);
  const [isFollow, setisFollow] = useState(false);
  const [alertVible, setAlertVible] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [nameData, setNameData] = useState();
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(true);

  const [details, setDetails] = useState({
    discription: '',
  });
  const {
    params: {id, title},
  } = route || {};
  const getData = async () => {
    try {
      let result = await getTempleDetails(id);
      let feedList = await getFeedList(0, 20, id);
      if (result && result.status === 200 && feedList.status === 200) {
        setloader(false);
        const {
          data: {discription},
        } = result || {};
        setFeedListData(feedList?.data);
        setNameData(result.data);
        setisFollow(data?.following);
        setDetails({
          discription: discription,
          image: data?.profilePicture?.url,
          id: data?.id,
        });
      } else {
        Snackbar.show({
          text: allTexts.constants.noInternet,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'Try again',
            textColor: 'green',
            onPress: () => {
              getData();
            },
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const followTemples = async () => {
    const payload = {
      itemId: id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    try {
      setFollowBtnDisable(true);
      let results = await followUnfollowTemple(payload);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        if (results && results.status === 200) {
          setFollowBtnDisable(false);

          ToastAndroid.show(
            `Successfully${
              !isFollow ? ' added to' : ' removed from '
            } favorites!`,
            ToastAndroid.SHORT,
          );
        }
      } else {
        Snackbar.show({
          text: allTexts.constants.noInternet,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'Try again',
            textColor: 'green',
            onPress: () => {
              followTemples();
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const CategoryIcons = ({pServiceCategories}) =>
    pServiceCategories?.serviceCategories?.map(services => {
      if (services?.active) {
        return (
          <TouchableOpacity style={styles.bellContainer}>
            <Image
              source={{uri: services?.icon?.url}}
              style={{height: 50, width: 50, borderRadius: 50}}
            />
            <Text style={styles.iconText}>{services?.name}</Text>
          </TouchableOpacity>
        );
      }
    });
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding:
            userDetails.role !== allTexts.constants.roleTypes.admin ||
            userDetails.role !== allTexts.constants.roleTypes.cms
              ? 8
              : 0,
        }}>
        <BackHeader1
          isOption={
            userDetails.role === allTexts.constants.roleTypes.admin ||
            userDetails.role === allTexts.constants.roleTypes.cms
          }
          onBackPress={() => {
            navigation.goBack();
          }}
          onDotsPress={() => setIsVisible(!isVisible)}
          txt={title}
        />
        {isVisible && (
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={open}
            onRequestClose={() => setOpen(!open)}>
            <View style={styles.model}>
              <View style={styles.modelview}>
                <View style={styles.postView}>
                  <PostIcon name="post" color={'white'} size={30} />
                  <TouchableOpacity>
                    <Text style={[styles.todoText, {marginLeft: 28}]}>
                      {'Post'}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.border} />
                <View style={styles.postView}>
                  <StoryIcon name="auto-stories" color={'white'} size={30} />
                  <TouchableOpacity>
                    <Text style={[styles.todoText, {marginLeft: 28}]}>
                      {'Story'}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.border} />
                <View style={styles.postView}>
                  <EntypoIcon name="yelp" color={'white'} size={30} />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(allTexts.screenNames.manage, {
                        id: id,
                        title: title,
                        name: nameData,
                      })
                    }>
                    <Text style={[styles.todoText, {marginLeft: 28}]}>
                      {'Manage'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.border} />
                <TouchableOpacity
                  onPress={() => setOpen(!open)}
                  style={{alignSelf: 'flex-end'}}>
                  <GoBackIcon name="back" color={'red'} size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>

      {loader ? (
        <View style={styles.loaderContainer}>
          <Loader size={'small'} color={colors.orangeColor} />
        </View>
      ) : (
        <ScrollView decelerationRate={0.8} showsVerticalScrollIndicator={false}>
          <InfoHeader img={details.image} description={details.discription} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <PrimaryButton
                bgColor={colors.blue2}
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
            </View>
            <View style={styles.button}>
              <PrimaryButton
                textColor={colors.black}
                bgColor={colors.gray3}
                radius={10}
                padding={7}
                text={allTexts.buttonTexts.contactUs}
              />
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {nameData && <CategoryIcons pServiceCategories={nameData} />}
          </View>
          <View style={styles.svgsOrientation} />

          <SweetAlert
            visible={alertVible}
            onBackDrop={() => {
              setAlertVible(false);
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const BackHeader1 = ({
  txt,
  onBackPress,
  isOption,
  plusButton,
  onPlusPress,
  onDotsPress,
  visible,
}) => {
  return (
    <View style={[styles.continer1, {margin: !isOption ? 0 : 10}]}>
      <View style={styles.iconContainer}>
        <Icon
          onPress={onBackPress}
          name="arrow-left-circle"
          color={colors.green2}
          size={35}
        />
        <Text style={[styles.title, {marginLeft: !isOption ? 30 : 15}]}>
          {txt}
        </Text>
      </View>
      <EntypoIcon
        name="dots-two-vertical"
        color={colors.black}
        size={22}
        onPress={onDotsPress}
      />
      {visible && (
        <View>
          <EntypoIcon name="dots-two-vertical" color={colors.black} size={22} />
        </View>
      )}
    </View>
  );
};
export default HomeDetail;
