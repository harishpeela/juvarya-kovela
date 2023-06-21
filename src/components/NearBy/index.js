/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {styles} from './styles';
import IconSearch from 'react-native-vector-icons/AntDesign';
import IconVoice from 'react-native-vector-icons/MaterialIcons';
import {Loader} from '../loader';
import {colors, allTexts} from '../../common';
import {TempleListCard} from '../TempleListCard';
import {
  PopularTemples,
  GetProfilePicture,
  FollowUnFollow,
  NewGetFollowUmFollowById,
} from '../../utils/api';
export const NearBy = () => {
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);
  const [isFollow, setIsFollow] = useState();

  const PopularTemplesss = async () => {
    try {
      let result = await PopularTemples(0, 20);
      console.log('iuhkmnSzmn =>', result?.data);
      if (result) {
        const dty = result?.data?.data || [];
        setLoading(false);
        dty?.map(d => {
          profilePicture(d);
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const profilePicture = async d => {
    try {
      let result = await GetProfilePicture(d?.id);
      // console.log('989u99', result?.data);
      let responce = await NewGetFollowUmFollowById(d?.id);
      // console.log('responce', responce);
      if (responce) {
        setIsFollow(responce?.data);
      } else {
        setIsFollow(undefined);
      }
      let Following = responce?.data;
      const obj = {...result?.data, ...d, ...Following};
      setfilteredArray(hg => [...hg, obj]);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    PopularTemplesss();
  }, []);
  // console.log('kength ===> ', filteredArray);
  return (
    <View>
      <View style={styles.searchTab}>
        <IconSearch name="search1" size={25} style={styles.iconsearch} />
        <TextInput placeholder="Search Here" style={styles.searchTextInput} />
        <TouchableOpacity style={styles.touchable}>
          <IconVoice name="keyboard-voice" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.upComingTextTab}>
        <Text style={styles.popularTextContainer}>Popular Temple</Text>
        <Text style={{color: colors.orangeColor, fontSize: 18}}>See all</Text>
      </View>
      <View>
        <ScrollView>
          <View>
            {loading === true ? (
              <View style={styles.loaderContainer}>
                <Loader color={colors.orangeColor} />
              </View>
            ) : (
              [
                filteredArray?.length === 0 ? (
                  <View style={styles.loaderContainer}>
                    <Text style={styles.noAvailable}>
                      {'No Temples Available'}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredArray}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={({item, index}) => item?.id}
                    renderItem={({item, index}) => (
                      <TempleListCard
                        post={item}
                        name={item.name}
                        templeId={item.id}
                        date={item.creationTime}
                        isFollowingTrue={isFollow}
                      />
                    )}
                  />
                ),
              ]
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
