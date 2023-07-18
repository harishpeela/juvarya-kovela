/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  Text,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage} from '../../components';
import {getHomeFeedList, NewLikesCount} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import ApplicationContext from '../../utils/context-api/Context';
import Share from 'react-native-share';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const UserFeedScreen = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loader, setloader] = useState(true);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [apiPageNo, setApiPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  // console.log('user', userDetails);
  const MyCustShare = async item => {
    const ShareOptions = {
      message: item?.jtProfileDTO?.name,
      URL: item?.jtProfileDTO?.logo,
      title: item?.jtProfileDTO?.desciption,
    };
    const options = {
      message: item?.jtProfileDTO?.name,
      URL: item?.jtProfileDTO?.logo,
      title: item?.jtProfileDTO?.desciption,
    };
    console.log('jhjjhbmjn ,jm n,m , , ,========>', ShareOptions);
    try {
      const shareResponce = await Share.open(ShareOptions, options);
      return shareResponce;
    } catch (error) {
      console.log('error in share', error);
    }
  };
  let isFocused = useIsFocused();
  const listFeed = async (pgNo, pgSize) => {
    try {
      let result = await getHomeFeedList(pgNo, pgSize);
      // console.log('feed list', result?.data);
      if (result && result?.status === 200) {
        setloader(false);
        let responce = result.data.jtFeeds;
        // console.log('res', responce);
        setHomeFeedList([...homeFeedList, ...responce]);
        // let likesId = result?.data?.jtFeeds;
        // likesId.map(d => {
        //   LikesStatus(d);
        // });
      }
    } catch (error) {
      console.log('errorrrd', error);
    }
  };
  // const LikesStatus = async d => {
  //   try {
  //     let result = await NewLikesCount(d?.id);
  //     let like = [result?.data];
  //     let likeStatus = [];
  //     like.map(likes => {
  //       likeStatus.push({like: likes?.like});
  //     });
  //     let responce = {...d, likeStatus};
  //     // console.log('res========>', responce);
  //     setHomeFeedList(res => [...res, responce]);
  //   } catch (error) {
  //     console.log('error in likes status and count api', error);
  //   }
  // };

  const renderLoder = () => {
    if (isLoading) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator size={'large'} color={colors.orangeColor} />
      </View>
    );
  };
  const loadMoreItems = () => {
    setApiPageNo(apiPageNo + 1);
    setIsLoading(false);
  };
  useEffect(() => {
    // listFeed();
  }, [userDetails]);
  useEffect(() => {
    if (apiPageNo > 0) {
      listFeed(apiPageNo, 20);
      console.log(apiPageNo);
    }
  }, [apiPageNo]);
  // console.log('home ======>', homeFeedList);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
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
      <>
        {loader && (
          <View style={{flex: 1}}>
            <Loader color={colors.orangeColor} size={30} />
          </View>
        )}
        {homeFeedList?.length > 0 ? (
          <FlatList
            data={homeFeedList}
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
            // decelerationRate={0.5}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <UserFeedCompList
                id={item?.id}
                post={item}
                onSharePress={() => MyCustShare(item)}
                saveid={item?.id}
                likes={item?.likesCount}
                // isLikeTrue={item?.likeStatus[0]?.like}
                // mediaData={item?.mediaList}
                onPressTitle={() => {
                  navigation.navigate(allTexts.screenNames.viewProfile, {
                    data: item,
                  });
                }}
              />
            )}
            ListFooterComponent={renderLoder}
            onEndReached={() => loadMoreItems()}
            onEndReachedThreshold={0.5}
          />
        ) : homeFeedList?.length > 0 ? (
          <View style={styles.nodataView}>
            <Text style={styles.nodatatext}>no items to display</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Loader color={colors.orangeColor} size={30} />
          </View>
        )}
      </>
    </View>
  );
};

export default UserFeedScreen;
