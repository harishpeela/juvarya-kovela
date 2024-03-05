/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, ScrollView, Alert} from 'react-native';
import {Loader, UserFeedCompList, TopBarcard} from '../../components';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import {Feed, GetPosts, DeleteFeedData} from '../../utils/api';
import {allTexts, colors} from '../../common';
import Share from 'react-native-share';
const Feeds = ({route, navigation}) => {
  const {itemDetails, role} = route.params || {};
  console.log('itemdetails', itemDetails, 'role', role);
  const [feedData, setFeedData] = useState();
  const [loader, setLoader] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [dataLoader, setDataLoader] = useState(false)
  const feedDetails = async () => {
    // console.log(itemDetails?.id, '----');
    setLoader(true);
    setDataLoader(true);
    try {
      let result = await Feed(itemDetails.id);
      console.log('nab xa', result?.data);
      if (result?.status === 200) {
        setFeedData(result?.data);
        setLoader(false)
      } else {
        setLoader(false)
      }
    } catch (error) {
      console.log('error in feed details ==>', error);
    }
  };
  const onSelect = data => {
    // setIsLiked(data?.selected);
  };
  const tempProfilefeeddetails = async () => {
    try {
      let result = await GetPosts(itemDetails?.jtProfile, 0, 60);
      let Data = result.data.data;
      if (Data) {
        let fil = Data.filter(item => item.mediaList);
        let arey = await removeObjectWithId(fil, itemDetails.id);
        setPostsData(arey);
      }
    } catch (error) {
      console.log('error in getposts in feed details pagee', error);
    }
  };
  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex(obj => obj.id === id);
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    return arr;
  }

  const MyCustShare = async item => {
    console.log('1', item);
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
          text: 'Yes',
          onPress: async () => {
            try {
              const result = await DeleteFeedData(id);
              if (result && result.data) {
                console.log('Feed successfully deleted');
                // Refresh feed list after deletion
                tempProfilefeeddetails();
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
  useEffect(() => {
    feedDetails();
    tempProfilefeeddetails();
  }, [itemDetails]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 100}}>
        <TopBarCard2
          back={true}
          txt={'Feeds'}
          navigation={navigation}
          navBack={() => navigation.goBack()}
          marginLeft={'30%'}
        />
      </View>

      {/* {loader ? (
        <Loader size={'medium'} color={colors.orangeColor} />
      ) : ( */}
        <ScrollView>
          {loader ? (
            <Loader color={colors.orangeColor} />
          ) : (
            <UserFeedCompList
            id={feedData?.id}
            post={feedData}
            likes={feedData?.likesCount}
            onSharePress={() => MyCustShare(feedData)}
            isLikeTrue={feedData?.like}
            savedFeed={feedData?.savedFeed}
            role_item_admin={role}
            saveid={feedData?.id}
            onPressDelete={() => {DeleteFeedPost(feedData?.id); setFeedData('')}}
            onPressTitle={() =>
              navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                data: feedData,
                onSelect: onSelect,
              })
            }
          />
          )}
          <FlatList
            data={postsData}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) =>
              item?.mediaList && (
                <UserFeedCompList
                  id={item?.id}
                  post={item}
                  likes={item?.likesCount}
                  isLikeTrue={item?.like}
                  savedFeed={item?.savedFeed}
                  saveid={item?.id}
                  role_item_admin={role}
                  onPressDelete={() => DeleteFeedPost(item?.id)}
                  onPressTitle={() =>
                    navigation.navigate(
                      allTexts.screenNames.viewtempleprofile,
                      {
                        data: postsData,
                        onSelect: onSelect,
                      },
                    )
                  }
                />
              )
            }
          />
        </ScrollView>
      {/* )} */}
    </SafeAreaView>
  );
};
export default Feeds;
