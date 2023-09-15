/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {SearchBar} from '../searchbar';
import {Loader} from '../loader';
import {allTexts, colors} from '../../common';
import {TempleListCard} from '../TempleListCard';
import {PopularTemplesVerticalList} from '../popularVerticalFlatList';
import {PopularTemples, SearchPopularTemples} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
export const PopularTemplesList = ({pageNav, seeallnav}) => {
  let isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArray, setfilteredArray] = useState([]);
  const [isFollow, setIsFollow] = useState();
  const [searchedText, setSearchedText] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [filteredData, setFilteredData] = useState();
  const PopularTemplesss = async () => {
    try {
      let result = await PopularTemples();
      console.log('res', result?.data);
      if (result) {
        const dty = result?.data?.data || [];
        setLoading(false);
        setfilteredArray(dty);
        setFilteredList(dty);
      }
    } catch (error) {
      console.log('error in popular temples', error);
    }
  };

  const renderLoder = () => {
    return loader ? (
      <Text>no temples to Display</Text>
    ) : (
      <View style={{marginTop: 90}}>
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
      // console.log('res', result);
      if (result?.status === 200) {
        setFilteredData(result?.data?.data);
      }
    } catch (error) {
      console.log('error in search pop temp', error);
    }
  };
  return (
    <View>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchedText}
          onTextChange={e => {
            setSearchedText(e);
            // FilteredList(e);
            SearchPopTemp(e);
          }}
          loading={searchLoading}
          onCrossPress={async () => {
            setSearchedText('');
            await PopularTemplesss(pageNo, 20);
          }}
          // onSubmit={FilteredList}
          bgColor={colors.gray4}
          placeHolder={'Search here'}
        />
      </View>
      <>
        {loader ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Loader color={colors.orangeColor} />
          </View>
        ) : (
          <>
            <View style={styles.upComingTextTab}>
              <Text style={styles.popularTextContainer}>Popular Temple</Text>
              <TouchableOpacity
                onPress={() => {
                  seeallnav.navigate(allTexts.screenNames.seeall, {
                    data: filteredList,
                  });
                }}>
                <Text style={{color: colors.black, fontSize: 18}}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
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
                      date={item.creationTime}
                      isFollowingTrue={item?.follow}
                      pageNav={pageNav}
                    />
                  )}
                  ListFooterComponent={renderLoder}
                  onEndReached={() => loadMoreItems()}
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
                    no Temples to Display
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        )}
      </>
    </View>
  );
};
