/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  Text,
  useColorScheme,
} from 'react-native';
import {TopBarcard} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {getHomeFeedList, getNotifications} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import Share from 'react-native-share';

const UserFeedScreen = ({navigation}) => {
  const [loader, setloader] = useState();
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(true);
  const [apiPageNo, setApiPageNo] = useState(0);
  const [apiPageSize, setApiPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const MyCustShare = async item => {
    const ShareOptions = {
      message: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      URL: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      title: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      // message: 'https://play.google.com/apps/test/com.kovela/4004',
      // URL: 'https://play.google.com/apps/test/com.kovela/4004',
      // title: item?.jtProfileDTO?.desciption,
    };
    const options = {
      message: item?.jtProfileDTO?.name,
      URL: item?.jtProfileDTO?.logo,
      title: item?.jtProfileDTO?.desciption,
    };
    try {
      const shareResponce = await Share.open(ShareOptions, options);
      return shareResponce;
    } catch (error) {
      console.log('error in share', error);
    }
  };
  const listFeed = async (pgNo, pgSize) => {
    setloader(true);
    try {
      let result = await getHomeFeedList(pgNo, pgSize);
      // console.log('========>', result?.data);
      if (result && result?.status === 200) {
        setloader(false);
        setHomeFeedList(result?.data?.jtFeeds);
        console.log('=============>', result?.data?.jtFeeds[0]?.jtProfileDTO);
        // let responce = result?.data?.jtFeeds;
        // responce === null ? setNoData(true) : setNoData(false);
        // responce && setHomeFeedList([...homeFeedList, ...responce]);
        setIsLoading(false);
        setRefrsh(false);
      } else {
        setloader(false);
        setRefrsh(false);
      }
    } catch (error) {
      console.log('error in listFeed', error);
    }
  };

  const renderLoder = () => {
    return isLoading ? (
      <View>
        <Loader size={'large'} color={colors.orangeColor} />
      </View>
    ) : noData ? (
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: '5%',
          color: colors.orangeColor,
        }}>
        {' '}
        No Items to display
      </Text>
    ) : null;
  };
  const onSelect = data => {
    // setIsLiked(data?.selected);
  };
  const loadMoreItems = () => {
    setApiPageNo(apiPageNo + 20);
    setApiPageSize(apiPageSize + 20);
    listFeed(apiPageNo, apiPageSize);
    setIsLoading(false);
  };
  const GetNotifications = async () => {
    try {
      let result = await getNotifications();
    } catch (error) {
      console.log('error in notifications', error);
    }
  };
  useEffect(() => {
    GetNotifications();
  }, []);
  useFocusEffect(
    useCallback(() => {
      if (apiPageNo >= 0) {
        listFeed(apiPageNo, apiPageSize);
      }
      return () => {};
    }, []),
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      <View style={{height: 90}}>
        <TopBarcard userIcon={true}>
          <View style={styles.navBarContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.tabNames.profile)
                }
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 1,
                  backgroundColor: 'white',
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name="user"
                  size={25}
                  color={colors.black}
                  style={{
                    marginLeft: 10,
                    right: 7,
                    top: 10,
                  }}
                />
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    padding: 1,
                    backgroundColor: 'white',
                    height: 20,
                    width: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 18,
                    padding: 1,
                  }}>
                  <Feather
                    name="menu"
                    size={15}
                    color={colors.black}
                    style={{}}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.circle}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.notification)
              }>
              <FontAwesome
                name="bell-o"
                size={24}
                color={isDarkMode ? 'black' : 'black'}
                style={styles.bellIcon}
              />
              {/* <View style={styles.notificationDot} /> */}
            </TouchableOpacity>
          </View>
        </TopBarcard>
      </View>
      <>
        {homeFeedList?.length > 0 ? (
          <FlatList
            data={homeFeedList}
            refreshControl={
              <RefreshControl
                refreshing={refrsh}
                onRefresh={() => {
                  setRefrsh(true);
                  listFeed(apiPageNo, apiPageSize);
                }}
              />
            }
            contentContainerStyle={styles.flatListStyle}
            keyboardShouldPersistTaps="handled"
            // decelerationRate={0.3}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <UserFeedCompList
                id={item?.id}
                post={item}
                onSharePress={() => MyCustShare(item)}
                saveid={item?.id}
                likes={item?.likesCount}
                isLikeTrue={item?.like}
                savedFeed={item?.savedFeed}
                onPressTitle={() => {
                  navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                    data: item,
                    onSelect: onSelect,
                  });
                }}
              />
            )}
            // ListFooterComponent={renderLoder}
            // onEndReached={() => loadMoreItems()}
            // onEndReachedThreshold={0.5}
          />
        ) : !loader && !homeFeedList?.length > 0 ? (
          <View style={styles.nodataView}>
            <Text style={styles.nodatatext}>No items to display</Text>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Loader size={'large'} color={colors.orangeColor} />
          </View>
        )}
      </>
    </View>
  );
};

export default UserFeedScreen;
