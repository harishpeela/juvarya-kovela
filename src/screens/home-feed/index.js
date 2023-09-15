/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  Text,
  useColorScheme,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {BackgroundImage} from '../../components';
import {getHomeFeedList} from '../../utils/api';
import {UserFeedCompList} from '../../components';
import {Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import ApplicationContext from '../../utils/context-api/Context';
import Share from 'react-native-share';
const UserFeedScreen = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
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
      message: item?.jtProfileDTO?.name,
      URL: item?.jtProfileDTO?.logo,
      title: item?.jtProfileDTO?.desciption,
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
    // setIsLoading(true);
    try {
      let result = await getHomeFeedList(pgNo, pgSize);
      if (result && result?.status === 200) {
        setloader(false);
        let responce = result.data.jtFeeds;
        responce === null ? setNoData(true) : setNoData(false);
        responce && setHomeFeedList([...homeFeedList, ...responce]);
        setIsLoading(false);
        setRefrsh(false);
      } else {
        setloader(false);
        setRefrsh(false);
      }
    } catch (error) {
      console.log('errorrrd', error);
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
    setApiPageNo(apiPageNo + apiPageSize);
    setIsLoading(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      if (apiPageNo >= 0) {
        listFeed(apiPageNo, apiPageSize);
      }
      return () => {
        // alert('Screen was unfocused');
      };
    }, []),
  );
  // useEffect(() => {}, [userDetails]);
  // useEffect(() => {
  //   if (apiPageNo >= 0) {
  //     listFeed(apiPageNo, apiPageSize);
  //   }
  // }, [apiPageNo]);
  // console.log('homefeed', homeFeedList);
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
            color={colors.black2}
            style={styles.bellIcon}
          />
        </View>
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
                  navigation.navigate(allTexts.screenNames.viewProfile, {
                    data: item,
                    onSelect: onSelect,
                  });
                }}
              />
            )}
            ListFooterComponent={renderLoder}
            onEndReached={() => loadMoreItems()}
            onEndReachedThreshold={0.5}
          />
        ) : !loader && !homeFeedList?.length > 0 ? (
          <View style={styles.nodataView}>
            <Text style={styles.nodatatext}>no items to display</Text>
          </View>
        ) : (
          <View>
            <Loader size={30} color={colors.orangeColor} />
          </View>
        )}
      </>
    </View>
  );
};

export default UserFeedScreen;
