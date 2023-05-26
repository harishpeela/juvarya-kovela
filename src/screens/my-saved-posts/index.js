import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackgroundImage} from '../../components';
import {BackHeader, PrimaryButton, ProfileInfo} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import Feather from 'react-native-vector-icons/Feather';
import {getSavedPostsList} from '../../utils/api';

const MySavedPosts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const templeData = {
    petalImage: 'https://www.linkpicture.com/q/hello.png',
  };

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

  // console.log('filter', filteredArray);

  useEffect(() => {
    getPostsList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.footerBackground}>
        <ImageBackground
          source={{uri: templeData.petalImage}}
          style={{height: 400}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
            </TouchableOpacity>
            <Text
              style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
              My Saved Posts
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
                return <View>{item?.profilePicture?.url}</View>;
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default MySavedPosts;
