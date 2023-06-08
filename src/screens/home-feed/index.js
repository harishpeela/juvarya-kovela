/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage} from '../../components';
import {
  getHomeFeedList,
  getFavoritesList,
  getUserInfo,
  getUserInfoNew,
} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from '@react-native-material/core';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
const UserFeedScreen = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [id, setId] = useState();
  const USERINFO = async () => {
    let info = await getUserInfoNew();
    // console.log('info', info);
    if (info) {
      setId(info?.data?.id);
    }
  };
  const getFollowedTempleList = async () => {
    try {
      let response = await getFavoritesList(0, 100);
      console.log('responce of get temple list', response);
      // if (response && response.status === 200) {
      //   // console.log('response', response);
      //   const {
      //     data: {followingObjects},
      //   } = response;
      //   setloading(false);
      //   if (followingObjects.length > 0) {
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const createFeedAccess = () => {
    let Token = getAuthTokenDetails();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://20.255.59.150:9096/jtprofile/admin/verify?profileId=1&customerId=2',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log('result----> api', result))
      .catch(error => console.log('error', error));
  };
  const getHomeResponse = async () => {
    try {
      // setloader(true);
      let response = await getHomeFeedList(0, 200, 25);
      console.log('log data', response);

      // console.log('log res', response);
      // if (response && response.status === 200) {
      //   const {
      //     data: {feeds},
      //   } = response || {};
      //   setHomeFeedList(feeds);
      //   setloader(false);
      //   setRefrsh(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    USERINFO();
    // getHomeResponse();
    // getFollowedTempleList();
    createFeedAccess();
  }, []);
  // console.log('home', homeFeedList);
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
        <Button
          title="click"
          onPress={() => {
            createFeedAccess();
          }}
        />
        {/* {tab === 1 && ( */}
        <>
          {loader && (
            <View style={{flex: 1}}>
              <Loader color={colors.green2} size={30} />
            </View>
          )}
          <ScrollView>
            <FlatList
              data={homeFeedList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refrsh}
                  onRefresh={() => {
                    setRefrsh(true);
                    getHomeResponse();
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
                  saveid={item.id}
                  likes={item?.likesCount}
                  isLikeTrue={item?.like}
                  onPressTitle={() =>
                    navigation.navigate(allTexts.screenNames.viewProfile, {
                      id: item?.itemDetails?.id,
                      title: item?.itemDetails?.name,
                      profileImg: item?.itemDetails?.profilePicture,
                      data: item,
                    })
                  }
                />
              )}
            />
          </ScrollView>
        </>
      </View>
    </ScrollView>
  );
};

export default UserFeedScreen;
