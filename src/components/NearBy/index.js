/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {SearchBar} from '../searchbar';
import {Loader} from '../loader';

import {allTexts, colors} from '../../common';
import {TempleListCard} from '../TempleListCard';
import {NearByTemple} from '../NearByTemples';
import {PopularTemplesVerticalList} from '../popularVerticalFlatList';
import {PopularTemples, SearchPopularTemples} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import {TopBarcard} from '../topBar1/topBarCard';
import {NearByTempleClass} from '../../utils/api';

export const PopularTemplesList = ({pageNav, seeallnav, navigation, route}) => {
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
  const PopularTemplesss = async () => {
    console.log('poptemples');
    setLoader(true);
    try {
      let result = await PopularTemples();
      // console.log('populattemples', result?.data);
      if (result) {
        const dty = result?.data?.data || [];
        setLoading(false);
        setfilteredArray(dty);
        setFilteredList(dty);
        setLoader(false);
      }
    } catch (error) {
      console.log('error in popular temples', error);
    }
  };

  const NearByTemples = async () => {
    setLoader(true);
    let result = await NearByTempleClass('A', 0, 20);
    // console.log('result.date ====>', result.data);
    if (result) {
      setNearByData(result?.data.data);
      setLoader(false);
    } else {
      setNearByData([]);
      setLoader(false);
    }
  };
  useEffect(() => {
    NearByTemples();
  }, []);

  const renderLoder = () => {
    return loader ? (
      <Text>no temples to Display</Text>
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
  useEffect(() => {}, [isFocused]);
  useEffect(() => {
    if (pageNo >= 0) {
      PopularTemplesss();
    }
  }, [pageNo]);
  const SearchPopTemp = async txt => {
    try {
      let result = await SearchPopularTemples(txt);
      if (result?.status === 200) {
        setFilteredData(result?.data?.data);
      }
    } catch (error) {
      console.log('error in search pop temp', error);
    }
  };
  return (
    <View>
      <View style={{minHeight: 160, marginTop: '3%'}}>
        <TopBarcard
          txt={'Search'}
          menu={true}
          isBell={true}
          navigation={navigation}
          navMenu={navigation}>
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchedText}
              onTextChange={e => {
                setSearchedText(e);
                SearchPopTemp(e);
              }}
              loading={false}
              onCrossPress={async () => {
                setSearchedText('');
                await PopularTemplesss(pageNo, 20);
              }}
              bgColor={colors.gray4}
              placeHolder={'Search Temples'}
            />
          </View>
        </TopBarcard>
      </View>
      <>
        {loader ? (
          <View
            style={{
              // alignItems: 'center',
              // justifyContent: 'center',
              height: '100%',
              marginTop: '70%',
            }}>
            <Loader color={colors.orangeColor} />
          </View>
        ) : (
          <>
            <View style={styles.upComingTextTab}>
              <Text style={styles.popularTextContainer}>Popular Temples</Text>
              <TouchableOpacity
                onPress={() => {
                  seeallnav.navigate(allTexts.screenNames.seeall, {
                    data: filteredList,
                  });
                }}>
                <Text style={{color: colors.orangeColor, fontSize: 16}}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{paddingLeft: 12}}>
              {searchedText === '' && (
                <FlatList
                  data={filteredList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={({item, index}) => item?.id}
                  renderItem={({item, index}) => (
                    <TempleListCard
                      post={item}
                      name={item.name}
                      templeId={item.id}
                      isFollowingTrue={item?.follow}
                      pageNav={pageNav}
                    />
                  )}
                  onEndReachedThreshold={0.5}
                  decelerationRate={0.8}
                />
              )}
            </ScrollView>
            <ScrollView style={{height: searchedText ? '85%' : 0}}>
              {searchedText && filteredData ? (
                <FlatList
                  data={filteredData}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={({item, index}) => item?.id}
                  renderItem={({item, index}) => (
                    <PopularTemplesVerticalList
                      post={item}
                      name={item.name}
                      templeId={item.id}
                      date={item.creationTime}
                      isFollowingTrue={isFollow}
                      pageNav={pageNav}
                    />
                  )}
                  onEndReachedThreshold={0.5}
                  decelerationRate={0.8}
                />
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 18, color: 'black'}}>
                    No Temples to Display
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.upComingTextTab}>
              <Text style={styles.popularTextContainer}>Nearby Temples</Text>
              <TouchableOpacity
                onPress={() => {
                  seeallnav.navigate(allTexts.screenNames.nearByTempleSeeAll, {
                    data: NearByData,
                  });
                }}>
                <Text style={{color: colors.orangeColor, fontSize: 16}}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{paddingLeft: 12}}>
              {searchedText === '' && (
                <FlatList
                  data={NearByData}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={({item, index}) => item?.id}
                  renderItem={({item, index}) => (
                    <NearByTemple
                      post={item}
                      name={item.name}
                      templeId={item.templeClass}
                      isFollowingTrue={item?.follow}
                      pageNav={pageNav}
                    />
                  )}
                  onEndReachedThreshold={0.5}
                  decelerationRate={0.8}
                />
              )}
            </ScrollView>
          </>
        )}
      </>
    </View>
  );
};
