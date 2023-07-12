/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, RefreshControl, Text} from 'react-native';
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
const UserFeedScreen = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loader, setloader] = useState(true);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [apiPageNo, setApiPageNo] = useState(0);
  const [loaderimg, setLoaderImg] = useState(false);
  // console.log('user', userDetails);
  const MyCustShare = async () => {
    const ShareOptions = {
      message: 'Hello Welcome to kovela App',
    };
    try {
      const shareResponce = await Share.open(ShareOptions);
    } catch (error) {
      console.log('error in share', error);
    }
  };
  let isFocused = useIsFocused();
  const listFeed = async () => {
    try {
      let result = await getHomeFeedList(0, 100);
      // console.log('feed list', result?.data);
      if (result && result?.status === 200) {
        setloader(false);
        let likesId = result?.data?.jtFeeds;
        likesId.map(d => {
          LikesStatus(d);
        });
      }
    } catch (error) {
      console.log('errorrrd', error);
    }
  };
  const LikesStatus = async d => {
    try {
      let result = await NewLikesCount(d?.id);
      let like = [result?.data];
      let likeStatus = [];
      like.map(likes => {
        likeStatus.push({like: likes?.like});
      });
      let responce = {...d, likeStatus};
      // console.log('res========>', responce);
      setHomeFeedList(res => [...res, responce]);
    } catch (error) {
      console.log('error in likes status and count api', error);
    }
  };
  useEffect(() => {
    listFeed();
  }, [userDetails, isFocused]);

  // console.log('home', homeFeedList);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
            // decelerationRate={0.7}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <UserFeedCompList
                id={item?.id}
                post={item}
                onSharePress={MyCustShare}
                saveid={item?.id}
                // loader={loaderimg}
                likes={item?.likesCount}
                isLikeTrue={item?.likeStatus[0]?.like}
                // mediaData={item?.mediaList}
                onPressTitle={() => {
                  navigation.navigate(allTexts.screenNames.viewProfile, {
                    data: item,
                  });
                }}
              />
            )}
            // onEndReached={() => setApiPageNo(pageNo => pageNo + 1)}
            // onEndReachedThreshold={0.5}
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
