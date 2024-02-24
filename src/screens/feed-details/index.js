/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, ScrollView} from 'react-native';
import {Loader, UserFeedCompList, TopBarcard} from '../../components';
import {Feed, GetPosts} from '../../utils/api';
import {allTexts, colors} from '../../common';
const Feeds = ({route, navigation}) => {
  const {itemDetails} = route.params || {};
  console.log('itemdetails', itemDetails);
  const [feedData, setFeedData] = useState();
  const [loader, setLoader] = useState();
  const [postsData, setPostsData] = useState([]);
  const feedDetails = async () => {
    console.log(itemDetails?.id, '----');
    // setLoader(true);
    try {
      let result = await Feed(itemDetails.id);
      console.log('nab xa', result?.data);
      if (result) {
        setFeedData(result?.data);
      } else {
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
  useEffect(() => {
    feedDetails();
    tempProfilefeeddetails();
  }, [itemDetails]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 100}}>
        <TopBarcard
          back={true}
          txt={'Feeds'}
          navigation={navigation}
          navBack={() => navigation.goBack()}
        />
      </View>

      {loader ? (
        <Loader size={'medium'} color={colors.orangeColor} />
      ) : (
        <ScrollView>
          {console.log('feedsdata.like', feedData)}
          <UserFeedCompList
            id={feedData?.id}
            post={feedData}
            likes={feedData?.likesCount}
            isLikeTrue={feedData?.like}
            savedFeed={feedData?.savedFeed}
            saveid={feedData?.id}
            onPressTitle={() =>
              navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                data: feedData,
                onSelect: onSelect,
              })
            }
          />
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
      )}
    </SafeAreaView>
  );
};
export default Feeds;
