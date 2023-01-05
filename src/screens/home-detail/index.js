/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import React, {useContext, useEffect, useState} from 'react';
import {
  InfoHeader,
  PrimaryButton,
  Loader,
  SweetAlert,
  ImageLoader,
} from '../../components';
import {colors} from '../../common';
import {styles} from './styles';
import {allTexts} from '../../common';
import {
  TicketBooking,
  DonationSVG,
  PojaTicketBooking,
  Accomodation,
} from '../../utils/svgs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  followUnfollowTemple,
  getFeedList,
  getTempleDetails,
} from '../../utils/api';
import Snackbar from 'react-native-snackbar';
import ApplicationContext from '../../utils/context-api/Context';
const HomeDetail = ({navigation, route}) => {
  const [loader, setloader] = useState(true);
  const {userDetails, donationId} = useContext(ApplicationContext);
  const [followLoader, setFollowLoader] = useState(false);
  const [isFollow, setisFollow] = useState(false);
  const [alertVible, setAlertVible] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [nameData, setNameData] = useState();
  const [services, setServices] = useState();
  const [data, setData] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [details, setDetails] = useState({
    discription: '',
  });
  const {
    params: {id, title},
  } = route || {};
  // console.log('id from services', id);

  const Visible = () => {
    if (donationId == id && services?.serviceCategory[2]?.active == true) {
      setData(true);
    } else if (donationId == !id) {
      setData(false);
      return false;
    }
    return true;
  };
  const getData = async () => {
    try {
      let result = await getTempleDetails(id);
      // console.log('feedlist', result);
      let feedList = await getFeedList(0, 20, id);
      // console.log('feedlist', feedList.data);
      if (result && result.status === 200 && feedList.status === 200) {
        setloader(false);
        const {
          data: {discription},
        } = result || {};
        setFeedListData(feedList?.data);
        // console.log('getdatafeed result', feedList.data);
        console.log('getdata result', result?.data);
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
  // console.log('namedata', services?.serviceCategory);
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
        // console.log('results', results.json());
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

  const serviceCategories = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer c476912a-3e59-421f-87ac-93606319cafc',
    );
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'JSESSIONID=F6BE527D4E59FA851C1D2528317015C3; JSESSIONID=954C6808E1E19996F5BCA052E3F802E0',
    );

    var raw = JSON.stringify({
      jtItem: {
        id: 1200,
      },
      serviceCategory: [
        {
          id: 1474,
          active: true,
        },
        {
          id: 1470,
          active: true,
        },
        {
          id: 1469,
        },
        {
          id: 1473,
        },
      ],
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://20.255.59.150:8082/api/v1/jtitemservicecategorytoitem/save',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setServices(result);
        }
      })
      .catch(error => console.log('error', error));
  };
  // console.log('servicessss', services?.serviceCategory[2]?.active);

  useEffect(() => {
    getData();
    Visible();
    serviceCategories();
  }, []);

  const renderItem = item => {
    return (
      <View style={styles.listItemContainer}>
        <ImageLoader
          imageStyle={styles.listItem}
          url={item.item.mediaList[0].url}
          resizeMode={'cover'}
        />
      </View>
    );
  };
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
          <View style={styles.todoView}>
            <View style={styles.postView}>
              <Icon name="plus" color={'black'} size={20} />
              <Text style={styles.todoText}>{'Post'} </Text>
            </View>
            <View style={styles.postView}>
              <Icon name="plus" color={'black'} size={20} />
              <Text style={styles.todoText}>{'Story'} </Text>
            </View>
            <View style={styles.postView}>
              <Icon name="plus" color={'black'} size={20} />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.manage, {
                    id: id,
                    title: title,
                    name: nameData,
                  })
                }>
                <Text style={styles.todoText}>{'Manage'} </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {loader ? (
        <View style={styles.loaderContainer}>
          <Loader />
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
          <View style={styles.svgsOrientation}>
            {/* {data == true && (
              <CategoryIcons
                Svg={<DonationSVG style={styles.bell} />}
                text={allTexts.homeDetail.donation}
              />
            )} */}

            {/* <CategoryIcons
              Svg={<TicketBooking style={styles.bell} />}
              text={allTexts.homeDetail.ticketBooking}
            />
            <CategoryIcons
              Svg={<PojaTicketBooking style={styles.bell} />}
              text={allTexts.homeDetail.poojaTicketBooking}
            />
            <CategoryIcons
              Svg={<Accomodation style={styles.bell} />}
              text={allTexts.homeDetail.accmodation}
            /> */}
          </View>
          {/* <View style={styles.imgTableContainer}>
            <FlatList
              data={feedListData}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View> */}
          <SweetAlert
            visible={alertVible}
            onBackDrop={() => {
              setAlertVible(false);
            }}>
            {/* <View style={styles.popitemContainer}>
              {(userDetails.role === allTexts.constants.roleTypes.admin ||
                userDetails.role === allTexts.constants.roleTypes.cms) && (
                <PopupItem
                  onItemPress={() => {
                    navigation.navigate(allTexts.screenNames.createPost, {
                      id: id,
                    });
                    setAlertVible(false);
                  }}
                  txt={'Post'}
                />
              )}
              {userDetails.role === allTexts.constants.roleTypes.admin && (
                <PopupItem txt={'Manage'} />
              )}
              {userDetails.role === allTexts.constants.roleTypes.admin && (
                <PopupItem txt={'Services'} />
              )}
            </View> */}
          </SweetAlert>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const PopupItem = ({txt, onItemPress}) => {
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.popupItem}>
      <AntDesign name={'pluscircleo'} size={20} color={colors.black} />
      <Text style={styles.popItemTxt}>{txt}</Text>
    </TouchableOpacity>
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
