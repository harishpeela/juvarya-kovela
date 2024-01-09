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
  ScrollView,
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
  console.log('homeFeedList', homeFeedList);
  const listFeed = async (pgNo, pgSize) => {
    setloader(true);
    try {
      let result = await getHomeFeedList(pgNo, pgSize);
      console.log('========>', result?.data);
      if (result && result?.status === 200) {
        setloader(false);
        setHomeFeedList(result?.data?.jtFeeds);
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
      <View style={{height: '15%'}}>
        <TopBarcard menu={true} txt={'Feeds'} isBell={true} />
      </View>
      <View style={{marginBottom: '35%'}}>
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
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // decelerationRate={0.3}
            // style={{bottom: 100}}
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
      </View>
    </View>
  );
};

export default UserFeedScreen;
