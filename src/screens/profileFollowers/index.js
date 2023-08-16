/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {BackgroundImage, BackHeaderNew} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TempleFollowersList} from '../../utils/api';
import {Loader, FollowersListCard} from '../../components';
import {colors} from '../../common';
import {styles} from './styles';
const FollowersMembership = ({route, navigation}) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const {id} = route.params || {};
  console.log('id', id);
  let TempleFolowers = async () => {
    try {
      let result = await TempleFollowersList(id);
      console.log('res of followes', result?.data);
      if (result.status === 200) {
        setLoader(false);
        setFollowersList(result?.data?.data);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in temple folowers', error);
    }
  };
  console.log('rs', followersList);
  useEffect(() => {
    TempleFolowers();
  }, [route]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginHorizontal: '5%', marginVertical: -10}}>
        <BackHeaderNew txt={'Followers'} onPress={() => navigation.goBack()} />
      </View>
      <View style={{flex: 1}}>
        {!followersList?.length > 0 ? (
          <Loader size={'large'} color={colors.orangeColor} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, marginTop: '10%'}}>
            <FlatList
              data={followersList}
              contentContainerStyle={styles.flatListStyle}
              keyExtractor={({item, index}) => index}
              renderItem={({item, index}) => (
                <FollowersListCard
                  name={item?.user?.firstName}
                  img={item?.user?.url}
                />
              )}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
export default FollowersMembership;
