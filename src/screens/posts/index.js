/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import {BackgroundImage} from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
const Posts = ({navigation, route}) => {
  const {posts} = route.params || {};
  console.log('data', posts[0]?.mediaList);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackgroundImage />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
        </TouchableOpacity>
        <Text style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
          Posts
        </Text>
      </View>
      {!posts?.length ? (
        <View style={styles.noposts}>
          <Text style={styles.noposttext}> no posts to display</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => (
            <View style={styles.postView}>
              <Image
                source={{
                  uri: item?.mediaList[0]?.url
                    ? item?.mediaList[0]?.url
                    : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1670905787229_shiva pic 2.png',
                }}
                style={styles.image}
              />
              <Text style={styles.description}>{item?.description} </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
export default Posts;
