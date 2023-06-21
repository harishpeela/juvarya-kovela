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
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
const UserFeedScreen = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);
  const [refrsh, setRefrsh] = useState(false);
  const [id, setId] = useState(userDetails?.id);
  const [apiPageNo, setApiPageNo] = useState(0);
  console.log('user', userDetails);
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
      `http://fanfundev.eastasia.cloudapp.azure.com:9094/jtfeed/list?pageNo=${apiPageNo}&pageSize=${20}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setloader(false);
          console.log('data....');
          setHomeFeedList(result?.jtFeeds);
          // setHomeFeedList(existedFeedList => [
          //   ...existedFeedList,
          //   ...result?.jtFeeds,
          // ]);
        } else {
          setloader(false);
          console.log('no data');
        }
      })
      .catch(error => console.log('error ===>', error));
  };

  useEffect(() => {
    FeedInfo();
    FeedList();
  }, [userDetails]);

  useEffect(() => {
    if (apiPageNo) {
      FeedList();
    }
  }, [apiPageNo]);
  console.log('home', homeFeedList);
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
                saveid={item?.id}
                onPressTitle={() => {
                  navigation.navigate(allTexts.screenNames.viewProfile, {
                    data: item,
                  });
                }}
              />
            )}
            onEndReached={() => setApiPageNo(pageNo => pageNo + 1)}
            onEndReachedThreshold={0.5}
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
