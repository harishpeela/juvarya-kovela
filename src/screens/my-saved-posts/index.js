/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {BackgroundImage} from '../../components';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {getSavedPostsList} from '../../utils/api';
import {SaveFeedComp} from '../../components';
const MySavedPosts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const getPostsList = async () => {
    try {
      let response = await getSavedPostsList(0, 100);
      console.log('get feeds list', response?.data?.feedToCustomers[0]?.jtFeed);
      const {
        status,
        data: {feedToCustomers},
      } = response || {};
      if (response && status === 200) {
        setPosts(feedToCustomers);
        setfilteredArray(feedToCustomers);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
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
          <FlatList
            data={filteredArray}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => item?.id}
            renderItem={({item, index}) => <SaveFeedComp post={item} />}
          />
        </View>
      </View>
    </View>
  );
};

export default MySavedPosts;
