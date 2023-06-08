/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {BackgroundImage} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {colors} from '../../common';
import {getTempleDetails, getItemCommunities} from '../../utils/api';
import Icon from 'react-native-vector-icons/Feather';
const FollowersMembership = ({route, navigation}) => {
  const {id} = route.params || {};
  console.log('id', id);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [followCount, setFollowCount] = useState();
  const FollowersData = async () => {
    let result = await getTempleDetails(id);
    console.log('res of followers', result?.data);
    if (result) {
      setFollowCount(result?.data?.followersCount);
    }
  };
  const CommunitiesList = async () => {
    let responce = await getItemCommunities(id, 0, 100);
    console.log('community', responce);
  };
  useEffect(() => {
    FollowersData();
    CommunitiesList();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={styles.backArrow}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-left-circle"
          color={colors.orangeColor}
          size={30}
        />
      </View>
      <View style={styles.tabView}>
        <TouchableOpacity onPress={() => setCurrentIndex(1)}>
          <Text
            style={{
              ...styles.tabtext,
              borderBottomWidth: currentIndex === 1 ? 2 : 0,
              borderBottomColor:
                currentIndex === 1 ? colors.orangeColor : 'gray',
              color: currentIndex === 1 ? colors.orangeColor : 'gray',
              fontWeight: currentIndex === 1 ? 'bold' : '400',
            }}>
            {followCount} Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentIndex(2)}>
          <Text
            style={{
              ...styles.tabtext,
              borderBottomWidth: currentIndex === 2 ? 2 : 0,
              borderBottomColor:
                currentIndex === 2 ? colors.orangeColor : 'gray',
              color: currentIndex === 2 ? colors.orangeColor : 'gray',
              fontWeight: currentIndex === 2 ? 'bold' : '400',
            }}>
            membership
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default FollowersMembership;
