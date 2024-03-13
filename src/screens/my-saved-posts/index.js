/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import { Loader } from '../../components';
import { styles } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { getSavedPostsList, Feed } from '../../utils/api';
import { SaveFeedComp } from '../../components';
import { allTexts, colors } from '../../common';
import { TopBarcard } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MySavedPosts = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const getPostsList = async () => {
    setLoading(true);
    try {
      let result = await getSavedPostsList();
      if (!result?.data?.feeds) {
        setLoading(false);
      } else if (result?.data?.feeds) {
        if (result?.status === 200) {
          result?.data?.feeds?.map(id => {
            FeedDetails(id);
          });
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('error in api', error);
    }
  };
  const onSelect = data => {
    // setIsLiked(data?.selected);
  };
  const FeedDetails = async id => {
    let result = await Feed(id?.feedId);
    let data = result?.data || {};
    let savefFeeds = { ...id, ...data };
    if (result) {
      setfilteredArray(array => [...array, savefFeeds]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPostsList();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.footerBackground}>
        <View style={{ minHeight: 70, marginTop: '3%' }}>
          <TopBarCard2
            txt={'Saved Posts'}
            back={true}
            navigation={navigation}
          >
          </TopBarCard2>
        </View>
        <View style={{ height: '85%' }}>
          {loading ? (
            <View>
              <View style={{ marginTop: '-36%' }}>
                <Loader color={colors.orangeColor} size={'large'} />
              </View>
            </View>
          ) : filteredArray?.length > 0 ? (
            <FlatList
              data={filteredArray}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListStyle}
              keyboardShouldPersistTaps="handled"
              keyExtractor={item => item?.id}
              renderItem={({ item }) => (
                <SaveFeedComp
                  post={item}
                  likes={item?.feedDTO?.likesCount}
                  isLikeTrue={item?.feedDTO?.like}
                  id={item?.id}
                  onPressTitle={() =>
                    navigation.navigate(
                      allTexts.screenNames.viewtempleprofile,
                      {
                        data: item,
                        onSelect: onSelect,
                      },
                    )
                  }
                />
              )}
            />
          ) : (
            <View style={{ alignItems: 'center', marginTop: '60%' }}>
              {loading ? (
                <View style={{ marginTop: '60%' }}>
                  <Loader size={'small'} color={colors.orangeColor} />
                </View>
              ) : (
                <View>
                  <FontAwesome5
                    name="save"
                    size={50}
                    color={'orange'}
                    style={{ marginLeft: '10%', marginBottom: '5%' }}
                  />
                  <Text style={{ color: colors.orangeColor, fontFamily: 'Poppins-Medium', fontSize: 15 }}>
                    {' '}
                    No Saved Posts
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MySavedPosts;
