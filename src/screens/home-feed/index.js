/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, RefreshControl, Text} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage} from '../../components';
import {NewFeedHome, NewLikesCount, getHomeFeedList} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import Share from 'react-native-share';
const UserFeedScreen = ({navigation}) => {
  const {userDetails, setHomeFeedListData} = useContext(ApplicationContext);
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [id, setId] = useState(userDetails?.id);
  const [apiPageNo, setApiPageNo] = useState(0);
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
  const listFeed = async () => {
    try {
      let result = await getHomeFeedList(apiPageNo, 20);
      console.log('feed list', result?.data);
      if (result && result?.status === 200) {
        setloader(false);
        setHomeFeedList(result?.data?.jtFeeds);
        // setHomeFeedList(existedFeedList => [
        //   ...existedFeedList,
        //   ...result?.data?.jtFeeds,
        // ]);
        setHomeFeedListData(result?.data?.jtFeeds);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    listFeed();
  }, [userDetails]);

  useEffect(() => {
    if (apiPageNo) {
      listFeed();
    }
  }, [apiPageNo]);
  console.log('home', homeFeedList?.lenght);
  return (
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
        {homeFeedList?.length > 0 ? (
          <FlatList
            data={homeFeedList}
            // horizontal
            // showsVerticalScrollIndicator={false}
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
                onSharePress={MyCustShare}
                saveid={item?.id}
                mediaData={item?.mediaList}
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
        ) : (
          <View style={styles.nodataView}>
            <Text style={styles.nodatatext}>no items to display</Text>
          </View>
        )}
      </>
    </View>
  );
};

export default UserFeedScreen;
