/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {UserFeedCompList, BackgroundImage} from '../../components';
import {getHomeFeedList} from '../../utils/api';
import {styles} from './styles';
const Feed = ({navigation}) => {
  const [loader, setloader] = useState(false);
  const [refrsh, setRefrsh] = useState(false);
  const [homeFeedList, setHomeFeedList] = useState([]);

  const getHomeResponse = async () => {
    try {
      setloader(true);
      let response = await getHomeFeedList(0, 100);
      // console.log('log', response?.data);
      if (response && response.status === 200) {
        const {
          data: {feeds},
        } = response || {};
        setHomeFeedList(feeds);
        setloader(false);
        setRefrsh(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHomeResponse();
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackgroundImage />
      <TouchableOpacity
        style={{marginHorizontal: '5%', marginTop: '10%'}}
        onPress={() => navigation.goBack()}>
        <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
      </TouchableOpacity>
      <ScrollView style={{matginTop: 30}}>
        <FlatList
          data={homeFeedList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refrsh}
              onRefresh={() => {
                setRefrsh(true);
                getHomeResponse();
              }}
            />
          }
          contentContainerStyle={styles.flatListStyle}
          keyboardShouldPersistTaps="handled"
          decelerationRate={0.7}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <UserFeedCompList
              // id={item?.itemDetails?.id}
              id={item?.id}
              post={item}
              // onDotsPress={() => setModelVisible(true)}
              likes={item?.likesCount}
              isLikeTrue={item?.like}
              // onDotsPress={() => setModelVisible(true)}
              // onPressTitle={() =>
              //   navigation.navigate(allTexts.screenNames.viewProfile, {
              //     id: item?.itemDetails?.id,
              //     title: item?.itemDetails?.name,
              //     profileImg: item?.itemDetails?.profilePicture,
              //     data: item,
              //   })
              // }
            />
          )}
        />
      </ScrollView>
    </View>
  );
};
export default Feed;
