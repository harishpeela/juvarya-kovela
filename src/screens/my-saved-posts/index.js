/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {BackgroundImage} from '../../components';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {getSavedPostsList} from '../../utils/api';

const MySavedPosts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const getPostsList = async () => {
    try {
      let response = await getSavedPostsList(0, 100);
      // console.log('responce', response);
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
        <View>
          <FlatList
            data={filteredArray}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => item?.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.container}>
                  <Image
                    source={{uri: item?.jtFeedDTO?.mediaList[0]?.url}}
                    style={{height: 100, width: 100, borderRadius: 10}}
                  />
                  <Text style={styles.saveddescription}>
                    {item?.jtFeedDTO?.description}{' '}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MySavedPosts;
