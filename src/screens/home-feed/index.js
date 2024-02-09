/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, RefreshControl, Text, useColorScheme, Alert } from 'react-native';
import { TopBarcard } from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { getHomeFeedList, getNotifications, DeleteFeedData } from '../../utils/api';
import { UserFeedCompList } from '../../components';
import { Loader } from '../../components';
import { allTexts, colors } from '../../common';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Share from 'react-native-share';

const UserFeedScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [apiPageNo, setApiPageNo] = useState(0);
  const [apiPageSize, setApiPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const listFeed = async (pgNo, pgSize) => {
    setLoader(true);
    try {
      let result = await getHomeFeedList(pgNo, pgSize);
      if (result && result.status === 200) {
        setLoader(false);
        setHomeFeedList(result.data.jtFeeds);
        setIsLoading(false);
        setRefreshing(false);
      } else {
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      console.log('error in listFeed', error);
    }
  };

  const MyCustShare = async item => {
    const ShareOptions = {
      message: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      URL: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      title: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
    };
    const options = {
      message: item.jtProfileDTO?.name,
      URL: item.jtProfileDTO?.logo,
      title: item.jtProfileDTO?.desciption,
    };
    try {
      const shareResponce = await Share.open(ShareOptions, options);
      return shareResponce;
    } catch (error) {
      console.log('error in share', error);
    }
  };

  const DeleteFeedPost = async id => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const result = await DeleteFeedData(id);
              if (result && result.data) {
                console.log('Feed successfully deleted');
                // Refresh feed list after deletion
                listFeed(apiPageNo, apiPageSize);
              }
            } catch (error) {
              console.log('error in deleting feed', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // useEffect(() => {
  //   GetNotifications();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      if (apiPageNo >= 0) {
        listFeed(apiPageNo, apiPageSize);
      }
      return () => {};
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '15%' }}>
        <TopBarcard menu={true} txt={'Feeds'} isBell={true} navigation={navigation} />
      </View>
      <View style={{ marginBottom: '29%' }}>
        {homeFeedList?.length > 0 ? (
          <FlatList
            data={homeFeedList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  listFeed(apiPageNo, apiPageSize);
                }}
              />
            }
            contentContainerStyle={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <UserFeedCompList
                id={item.id}
                post={item}
                onSharePress={() => MyCustShare(item)}
                saveid={item.id}
                likes={item.likesCount}
                isLikeTrue={item.like}
                savedFeed={item.savedFeed}
                isVisible={isVisible}
                onPressDots={() => setIsVisible(!isVisible)}
                onPressDelete={() => DeleteFeedPost(item.id)}
                onPressTitle={() => {
                  navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                    data: item,
                    onSelect: onSelect,
                  });
                }}
              />
            )}
          />
        ) : !loader && !homeFeedList?.length > 0 ? (
          <View style={styles.nodataView}>
            <FontAwesome size={30} style={{ marginBottom: '5%' }} />
            <Text style={styles.nodatatext}>No items to display</Text>
          </View>
        ) : (
          <View style={{ marginTop: '70%' }}>
            <Loader size={'large'} color={colors.orangeColor} />
          </View>
        )}
      </View>
    </View>
  );
};

export default UserFeedScreen;
