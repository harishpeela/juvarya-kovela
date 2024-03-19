/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { SearchBar } from '../searchbar';
import { Loader } from '../loader';

import { allTexts, colors } from '../../common';
import { TempleListCard } from '../TempleListCard';
import { NearByTemple } from '../NearByTemples';
import { PopularTemplesVerticalList } from '../popularVerticalFlatList';
import { PopularTemples, SearchPopularTemples } from '../../utils/api';
import { useIsFocused } from '@react-navigation/native';
import { TopBarcard } from '../topBar1/topBarCard';
import { NearByTempleClass, getNearByTemples, getEventByCommunityId, GetArtist } from '../../utils/api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Artist_Search } from '../artist_search';
import { statusBarHeight } from '../../utils/config/config';
import { useLazyGetPopularTempleDataQuery } from '../../redux/services/searchService';

export const PopularTemplesList = ({ pageNav, seeallnav, navigation }) => {

  let isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArray, setfilteredArray] = useState([]);
  const [isFollow, setIsFollow] = useState();
  const [searchedText, setSearchedText] = useState('');
  const [loader, setLoader] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [filteredData, setFilteredData] = useState();
  const [NearByData, setNearByData] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [nearBy, setNearBy] = useState(true);
  const [eventCommunity, setEventCommunity] = useState();


  //RTK Query
  const [getPopularTemple] = useLazyGetPopularTempleDataQuery();
  const [getNearByTemple] = useLazyGetPopularTempleDataQuery();

  const PopularTemples = () => {
    console.log('LLLLLLLLLLLLLL')
    setLoader(true);
    try {
      let data = {
        pageNo: 0,
        pageSize: 100,
      };
      getPopularTemple(data)
        .unwrap()
        .then(response => {
          if (response) {
            setLoading(false);
            setfilteredArray(response.data);
            setFilteredList(response.data);
            setLoader(false);
            setRefreshing(false);
          }
        })
        .catch(error => {
          console.log('error--->', error);
          setLoader(false);
          setRefreshing(false);
        });
    } catch (error) {
      setLoader(false);
      setRefreshing(false);
      console.log('error in popular temples5', error);
    }
  };

  // const PopularTemples = async () => {
  //   console.log('LLLLLLLLLLLLLL')
  //   setLoader(true);
  //   try {
  //     let result = await PopularTemples(0, 100);
  //     // console.log('populattemples', result?.data);
  //     if (result) {
  //       const dty = result?.data?.data || [];
  //       setLoading(false);
  //       setfilteredArray(dty);
  //       setFilteredList(dty);
  //       setLoader(false);
  //       setRefreshing(false);
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     setRefreshing(false);
  //     console.log('error in popular temples5', error);
  //   }
  // };

  const NearByTemples = async () => {
    console.log('MMMMMMMMMMMM')
    setLoader(true);
    let result = await getNearByTemples('VSP, AKP', 0, 20);
    // console.log('result.date ====>', result.data);
    if (result) {
      setNearByData(result?.data.data);
      // setLoader(false);
    } else {
      setNearByData([]);
      // setLoader(false);
    }
  };

  const eventsByCommunity = async () => {
    console.log('NNNNNNNNNNNNNNnn')
    let result = await GetArtist(0, 100, 3);
    console.log('result of community id', result?.data);
    if (result?.status === 200) {
      setEventCommunity(result?.data?.data);
    } else {
      // alert('no data')
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (pageNo >= 0) {
        PopularTemples(0, 100);
      }
      return () => { };
    }, []),
  );

  // useEffect(() => {
  //   NearByTemples();
  //   eventsByCommunity();
  // }, [isFocused]);

  const renderLoder = () => {
    return loader ? (
      <Text>No Temples To Display</Text>
    ) : (
      <View style={{}}>
        <Loader size={'large'} color={colors.orangeColor} />
      </View>
    );
  };
  const loadMoreItems = () => {
    setPageNo(pageNo + 1);
    setIsLoading(false);
  };



  const SearchPopTemp = async txt => {
    console.log('ooooooooooooooooooo')
    try {
      let result = await SearchPopularTemples(txt);
      if (result?.status === 200) {
        setFilteredData(result?.data?.data);
      }
    } catch (error) {
      console.log('error in search pop temp', error);
    }
  };
  // console.log('filtered array ===>', filteredArray);
  return (
    <>
      {loader ? (
        <View style={{ flex: 1, marginTop: '-3%' }}>
          <Loader color={colors.orangeColor} size={'large'} />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              marginTop: statusBarHeight,
              height: 60,
            }}
          >
            <TopBarcard
              menu={true}
              isBell={true}
              navigation={navigation}
              navMenu={navigation}>
              <View>
                <SearchBar
                  onTextChange={e => {
                    setSearchedText(e);
                    SearchPopTemp(e);
                    setNearBy(false);
                  }}
                  value={searchedText}
                  loading={false}
                  showCrossPress={true}
                  onCrossPress={() => {
                    setSearchedText('');
                    PopularTemples();
                    setNearBy(true);
                  }}
                  bgColor={colors.white}
                  placeHolder={'Search Temples'}
                />
              </View>
            </TopBarcard>
          </View>
          <ScrollView style={{ height: '100%' }} refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[colors.orangeColor]}
              onRefresh={() => {
                setRefreshing(true);
                PopularTemples(pageNo, 100);
                setLoader(false)
              }}
            />
          } >
            {loader ? (
              <View
                style={{
                  // height: '110%',
                  // marginTop: '70%',
                }}>
                <Loader color={colors.orangeColor} />
              </View>
            ) : (
              <>
                {searchedText === '' && (
                  <>
                    <View style={styles.upComingTextTab}>
                      <Text style={styles.popularTextContainer}>
                        Popular Temples
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          seeallnav.navigate(allTexts.screenNames.seeall, {
                            data: filteredList,
                          });
                        }}>
                        <Text style={{ color: colors.orangeColor, fontSize: 16 }}>
                          See all
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={filteredList}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                      keyExtractor={({ item, index }) => item?.id}
                      renderItem={({ item, index }) => (
                        <TempleListCard
                          post={item}
                          templeId={item.id}
                          isFollowingTrue={item?.follow}
                          pageNav={pageNav}
                          name={item?.name}
                        />
                      )}
                      onEndReachedThreshold={0.5}
                      decelerationRate={0.8}
                    />
                  </>
                )}
                <ScrollView
                  style={{
                    height: searchedText ? '75%' : 0,
                  }}>
                  {searchedText && filteredData ? (
                    <FlatList
                      data={filteredData}
                      keyboardShouldPersistTaps="handled"
                      keyExtractor={({ item, index }) => item?.id}
                      renderItem={({ item, index }) => (
                        <PopularTemplesVerticalList
                          post={item}
                          name={item.name}
                          templeId={item.id}
                          date={item.creationTime}
                          isFollowingTrue={isFollow}
                          pageNav={pageNav}
                          description={item.description}
                        />
                      )}
                      onEndReachedThreshold={0.5}
                      decelerationRate={0.8}
                    />
                  ) : (
                    <View style={{ alignItems: 'center', marginTop: '50%' }}>
                      <FontAwesome5
                        name="gopuram"
                        size={50}
                        color={'orange'}
                        style={{ marginBottom: '5%' }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'orange',
                          fontFamily: 'Poppins-Medium',
                        }}>
                        No Temples To Display
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </>
            )}
            <View>
            </View>
            {searchedText === '' ? (
              <>
                <ScrollView style={{ paddingLeft: 12 }}>
                  <View style={styles.upComingTextTab}>
                    <Text style={{ ...styles.nearbyTextContainer }}>
                      Nearby Temples
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        seeallnav.navigate(
                          allTexts.screenNames.nearByTempleSeeAll,
                          {
                            data: NearByData,
                          },
                        );
                      }}>
                      <Text style={{ color: colors.orangeColor, fontSize: 16 }}>
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {searchedText === '' && (
                    <FlatList
                      data={NearByData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                      keyExtractor={({ item, index }) => item?.id}
                      renderItem={({ item, index }) => (
                        <NearByTemple
                          post={item}
                          name={item?.profileDTO?.name}
                          templeId={item.templeClass}
                          isFollowingTrue={item?.follow}
                          pageNav={pageNav}
                          img={item?.profileDTO?.logo}
                          onPress={() => {
                            pageNav?.navigate(allTexts.screenNames.viewtempleprofile, {
                              data: post,
                              onSelect: onSelect,
                            });
                          }}
                        />
                      )}
                      onEndReachedThreshold={0.5}
                      decelerationRate={0.8}
                    />
                  )}
                </ScrollView>
              </>
            ) : (
              ''
            )}
            {searchedText === '' && eventCommunity ? (
              <>
                <View style={styles.upComingTextTab}>
                  <Text style={styles.popularTextContainer}>Artist</Text>
                  <TouchableOpacity
                    onPress={() => {
                      seeallnav.navigate(allTexts.screenNames.communityeventsseeall, {
                        data: eventCommunity,
                      });
                    }}>
                    <Text style={{ color: colors.orangeColor, fontSize: 16 }}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>

                {searchedText === '' && (
                  <FlatList
                    data={eventCommunity}
                    horizontal
                    style={{ marginHorizontal: '4%' }}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={({ item, index }) => item?.id}
                    renderItem={({ item, index }) => (
                      <Artist_Search
                        name={item?.fullName}
                        img={item?.logo}
                        type={item?.type}
                        onPress={() => alert('page under development')}
                      />
                    )}
                    onEndReachedThreshold={0.5}
                    decelerationRate={0.8}
                  />
                )}
              </>
            ) : ''}
          </ScrollView>
        </ScrollView>
      )}
    </>

  );
};
