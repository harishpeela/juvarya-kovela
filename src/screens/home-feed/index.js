/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { View, RefreshControl, Text, useColorScheme, Alert } from 'react-native';
import { TopBarcard } from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { DeleteFeedData } from '../../utils/api';
import { UserFeedCompList } from '../../components';
import { Loader } from '../../components';
import { allTexts, colors } from '../../common';
import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { statusBarHeight } from '../../utils/config/config';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { useLazyGetHomeFeedDataQuery } from '../../redux/services/homeFeedService';
import { homeFeedAction } from '../../redux/slices/homeFeedSlice';


const UserFeedScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState(null);
  const [refreshing, setRefreshing] = useState(true);
  const [apiPageNo, setApiPageNo] = useState(0);
  const [apiPageSize, setApiPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  //Redux hooks
  const homeFeed = useAppSelector(state => state.homeFeed) || null;
  const [getHomeFeed] = useLazyGetHomeFeedDataQuery()
  const dispatch = useAppDispatch();

  const getHomeFeedData = () => {
    if (homeFeed && homeFeed.homeFeedData) {
    setHomeFeedList(homeFeed && homeFeed.homeFeedData);
    setLoader(false);
    setIsLoading(false);
    setRefreshing(false);
    }else {
      setLoader(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    getHomeFeedData();
  }, [homeFeed]);


  const listFeed = async (pageNo = 0, pageSize =20) => {
    try {
      let data = {
        pageNo: pageNo,
        pageSize: pageSize,
      };
      getHomeFeed(data)
        .unwrap()
        .then(response => {
          if (response) {
            setHomeFeedList(response.jtFeeds);
            dispatch(homeFeedAction(response.jtFeeds));
          } else {
            console.log('Error: Response is undefined');
          }
        })
        .catch(error => {
          console.log('error--->', error);
        });
    } catch (error) {
      console.log('error1--->', error);
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
      const shareResponce = await Share?.open(ShareOptions, options);
      return shareResponce;
    } catch (error) {
      console.log('error in share', error);
    }
  };

  const onSelect = data => {
    // setIsLiked(data?.selected);
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
          text: 'Yes',
          onPress: async () => {
            try {
              const result = await DeleteFeedData(id);
              if (result && result.data) {
                console.log('Feed successfully deleted');
                listFeed(apiPageNo, apiPageSize);
              } else{
                alert('you are not a admin to delete this feed')
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

  return (
    <View style={{ flex: 1 ,backgroundColor:'white'}}>
      <View style={{ height: 60, marginTop: statusBarHeight }}>
        <TopBarcard menu={true} txt={'Feeds'} isBell={true} navigation={navigation} />
      </View>
      <View style={{ marginBottom: '29%' }}>
        {loader ? (
          <Loader size={'large'} color={colors.orangeColor} />
        ) : 
        homeFeedList?.length > 0 ? (
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
            renderItem={({ item }) => {
              return (
                <UserFeedCompList
                  id={item.id}
                  post={item}
                  onSharePress={() => MyCustShare(item)}
                  saveid={item.id}
                  likes={item.likesCount}
                  isLikeTrue={item.like}
                  savedFeed={item.savedFeed}
                  isVisible={isVisible}
                  onPressDelete={() => DeleteFeedPost(item.id)}
                  onPressTitle={() => {
                    navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                      data: item,
                      onSelect: onSelect,
                    });
                  }}
                >
                  <Text style={{ fontSize: 12, color: 'black', marginTop: 2 }}>
                    {item?.creationTime}
                  </Text>
                </UserFeedCompList>
              );
            }}
            
          />
        ) : !loader && !homeFeedList?.length > 0 ? (
          <View style={styles.nodataView}>
            <FontAwesome size={30} style={{ marginBottom: '5%' }} />
            <Text style={styles.nodatatext}>No Items To Display</Text>
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
