/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage} from '../../components';
import {
  getHomeFeedList,
  getFavoritesList,
  getUserInfo,
  getUserInfoNew,
  NewFeedHome,
} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import {verifyAdminProfile} from '../../utils/api';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
const UserFeedScreen = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [id, setId] = useState(userDetails?.id);
  console.log('user', userDetails);
  // const USERINFO = async () => {
  //   let info = await getUserInfoNew();
  //   // console.log('info', info);
  //   if (info) {
  //     setId(info?.data?.id);
  //   }
  // };
  // const getFollowedTempleList = async () => {
  //   try {
  //     let response = await getFavoritesList(0, 100);
  //     console.log('responce of get temple list', response);
  //     // if (response && response.status === 200) {
  //     //   // console.log('response', response);
  //     //   const {
  //     //     data: {followingObjects},
  //     //   } = response;
  //     //   setloading(false);
  //     //   if (followingObjects.length > 0) {
  //     //   }
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getHomeResponse = async () => {
  //   try {
  //     // setloader(true);
  //     let response = await getHomeFeedList(0, 200, 25);
  //     console.log('log data', response);

  //     // console.log('log res', response);
  //     // if (response && response.status === 200) {
  //     //   const {
  //     //     data: {feeds},
  //     //   } = response || {};
  //     //   setHomeFeedList(feeds);
  //     //   setloader(false);
  //     //   setRefrsh(false);
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const FeedInfo = async () => {
    let responce = await NewFeedHome(id, 0, 20);
    console.log('res of axios ===========>', id, responce?.data);
    try {
      if (responce && responce?.statu === 200) {
        console.log('result', responce?.data?.data);
      } else {
        console.log('error in data');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FeedList = async () => {
    let Token = await getAuthTokenDetails();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setloader(true);
    fetch(
      `http://fanfundev.eastasia.cloudapp.azure.com:9094/jtfeed/feedsOfProfile?id=${id}&pageNo=${0}&pageSize=${20}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result of feed', result?.data);
        if (result) {
          setloader(false);
          setHomeFeedList(result?.data);
          console.log('data....');
        } else {
          setloader(false);
          console.log('no data');
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    FeedInfo();
    FeedList();
  }, [userDetails]);
  console.log('home', homeFeedList);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <BackgroundImage />
        <View style={styles.navBarContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(allTexts.screenNames.menu)}>
              <View style={styles.sidebarIcon}>
                <View style={[styles.bar, styles.shortestBar]} />
                <View style={[styles.bar, styles.mediumBar]} />
                <View style={[styles.bar, styles.longestBar]} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.circle}>
            <FeatherIcon
              name="bell"
              size={14}
              color={colors.orangeColor}
              style={styles.bellIcon}
            />
          </View>
        </View>
        {/* {tab === 1 && ( */}
        <>
          {loader && (
            <View style={{flex: 1}}>
              <Loader color={colors.green2} size={30} />
            </View>
          )}
          <ScrollView>
            {homeFeedList ? (
              <FlatList
                data={homeFeedList}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refrsh}
                    onRefresh={() => {
                      setRefrsh(true);
                    }}
                  />
                }
                contentContainerStyle={styles.flatListStyle}
                keyboardShouldPersistTaps="handled"
                decelerationRate={0.7}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                  <UserFeedCompList
                    id={item?.id}
                    post={item}
                    onPressTitle={() => {
                      navigation.navigate(allTexts.screenNames.viewProfile, {
                        data: item,
                      });
                    }}
                  />
                )}
              />
            ) : (
              <View style={styles.nodataView}>
                <Text style={styles.nodatatext}>no items to display</Text>
              </View>
            )}
          </ScrollView>
        </>
      </View>
    </ScrollView>
  );
};

export default UserFeedScreen;
