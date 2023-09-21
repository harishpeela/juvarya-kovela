/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {BackgroundImage, Loader} from '../../components';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {getSavedPostsList, Feed} from '../../utils/api';
import {SaveFeedComp} from '../../components';
import {allTexts, colors} from '../../common';
const MySavedPosts = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const getPostsList = async () => {
    try {
      let result = await getSavedPostsList();
      if (result?.status === 200) {
        setLoading(false);
        // setfilteredArray(result?.data?.feeds);
        result?.data?.feeds?.map(id => {
          FeedDetails(id);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error in api', error);
    }
  };
  const onSelect = data => {
    // setIsLiked(data?.selected);
  };
  const FeedDetails = async id => {
    let result = await Feed(id?.feedId);
    let data = result?.data || {};
    let savefFeeds = {...id, ...data};
    if (result) {
      setfilteredArray(array => [...array, savefFeeds]);
    } else {
    }
  };
  // console.log('filter', filteredArray);

  useEffect(() => {
    getPostsList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={styles.footerBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" color={colors.black2} size={28} />
          </TouchableOpacity>
          <Text style={{fontSize: 20, fontWeight: '500', marginHorizontal: 10}}>
            Saved Posts
          </Text>
        </View>
        <View style={{height: '85%'}}>
          {loading ? (
            <View>
              <Loader color={colors.orangeColor} />
            </View>
          ) : filteredArray?.length > 0 ? (
            <FlatList
              data={filteredArray}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListStyle}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item, index) => item?.id}
              renderItem={({item, index}) => (
                <SaveFeedComp
                  post={item}
                  likes={item?.feedDTO?.likesCount}
                  isLikeTrue={item?.feedDTO?.like}
                  id={item?.id}
                  onPressTitle={() =>
                    navigation.navigate(allTexts.screenNames.viewProfile, {
                      data: item,
                      onSelect: onSelect,
                    })
                  }
                />
              )}
            />
          ) : (
            <View style={{alignItems: 'center', marginTop: '65%'}}>
              <Text style={{color: colors.orangeColor}}>
                {' '}
                Yet Not saved any post ...!
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MySavedPosts;
