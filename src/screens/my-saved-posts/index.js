/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {BackgroundImage, Loader} from '../../components';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {getSavedPostsList} from '../../utils/api';
import {SaveFeedComp} from '../../components';
import {colors} from '../../common';
const MySavedPosts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const getPostsList = async () => {
    try {
      let result = await getSavedPostsList();
      console.log('res of saved posts', result?.data?.feeds);
      if (result.status === 200) {
        setLoading(false);
        setfilteredArray(result?.data?.feeds);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error in api', error);
    }
  };

  console.log('filter', filteredArray);

  useEffect(() => {
    getPostsList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={styles.footerBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
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
              renderItem={({item, index}) => <SaveFeedComp post={item} />}
            />
          ) : (
            <View style={{alignItems: 'center', marginTop: '65%'}}>
              <Text> Yet Not saved any post ...!</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MySavedPosts;
