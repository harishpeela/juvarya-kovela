/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, ScrollView} from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  Loader,
  UserFeedCompList,
} from '../../components';
import {Feed, GetPosts} from '../../utils/api';
import {colors} from '../../common';
const Feeds = ({route, navigation}) => {
  const {itemDetails} = route.params || {};
  const [feedData, setFeedData] = useState();
  const [loader, setLoader] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [liked, setLiked] = useState(false);
  // console.log('item =========>', itemDetails);
  const feedDetails = async () => {
    try {
      let result = await Feed(itemDetails.id);
      //   console.log('feed', result);
      if (result) {
        setFeedData(result?.data);
      }
    } catch (error) {
      console.log('error in feed details ==>', error);
    }
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
  useEffect(() => {
    feedDetails();
    tempProfilefeeddetails();
  }, [itemDetails]);
  console.log(feedData, '=============>');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{margin: '5%', marginVertical: '10%'}}>
        <BackHeaderNew txt={'Posts'} onPress={() => navigation.goBack()} />
      </View>
      {loader ? (
        <Loader size={'medium'} color={colors.orangeColor} />
      ) : (
        <ScrollView>
          <UserFeedCompList
            id={feedData?.id}
            post={feedData}
            likes={feedData?.likesCount}
            isLikeTrue={() => setLiked(!liked)}
          />
          <ScrollView>
            <FlatList
              data={postsData}
              keyExtractor={({item, index}) => index}
              renderItem={({item, index}) =>
                item?.mediaList && (
                  <UserFeedCompList
                    id={item?.id}
                    post={item}
                    likes={item?.likesCount}
                    isLikeTrue={() => setLiked(!liked)}
                  />
                )
              }
            />
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Feeds;
