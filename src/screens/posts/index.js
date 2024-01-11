/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Text, Image, useColorScheme} from 'react-native';
import {BackgroundImage, BackHeader} from '../../components';
import {styles} from './styles';
const Posts = ({navigation, route}) => {
  const {posts} = route.params || {};
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{backgroundColor: isDarkMode ? 'white' : 'white', flex: 1}}>
      <View style={styles.header}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'Posts'}
        />
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
                    : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
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
