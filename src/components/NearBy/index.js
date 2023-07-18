/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {SearchBar} from '../searchbar';
import {Loader} from '../loader';
import {allTexts, colors} from '../../common';
import {TempleListCard} from '../TempleListCard';
import {PopularTemplesVerticalList} from '../popularVerticalFlatList';
import {
  PopularTemples,
  GetProfilePicture,
  NewGetFollowUmFollowById,
} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
export const PopularTemplesList = ({pageNav, seeallnav}) => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArray, setfilteredArray] = useState([]);
  const [isFollow, setIsFollow] = useState();
  const [searchedText, setSearchedText] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  let isFocused = useIsFocused();
  const PopularTemplesss = async (frm, toNo) => {
    try {
      let result = await PopularTemples(frm, toNo);
      // console?.log('res of popular temples', result?.data);
      if (result) {
        const dty = result?.data?.data || [];
        setLoading(false);
        dty?.map(d => {
          profilePicture(d);
        });
      }
    } catch (error) {
      console.log('error in popular temples', error);
    }
  };
  const renderLoder = () => {
    if (isLoading) {
      return null;
    }
    return (
      <View style={{marginTop: 50}}>
        <ActivityIndicator size={'large'} color={colors.orangeColor} />
      </View>
    );
  };
  const loadMoreItems = () => {
    setPageNo(pageNo + 1);
    setIsLoading(false);
  };
  const profilePicture = async d => {
    try {
      let result = await GetProfilePicture(d?.id);
      let responce = await NewGetFollowUmFollowById(d?.id);
      if (responce) {
        setIsFollow(responce?.data);
      } else {
        setIsFollow(undefined);
      }
      let Following = responce?.data;
      const obj = {...result?.data, ...d, ...Following};
      setfilteredArray(hg => [...hg, obj]);
      setFilteredList(hg => [...hg, obj]);
    } catch (error) {
      console.log('error in profile pic', error);
    }
  };
  useEffect(() => {
    if (pageNo >= 0) {
      PopularTemplesss(pageNo, 20);
      console.log('pg', pageNo);
    }
  }, [isFocused, pageNo]);
  const FilteredList = async value => {
    setFilteredList(
      filteredArray.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };
  // console.log('filttered', filteredList);
  return (
    <View>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchedText}
          onTextChange={e => {
            setSearchedText(e);
            FilteredList(e);
          }}
          loading={searchLoading}
          onCrossPress={async () => {
            setSearchedText('');
            await PopularTemplesss();
          }}
          // onSubmit={FilteredList}
          bgColor={'lightgray'}
          placeHolder={'Search here'}
        />
      </View>
      {searchedText === '' && (
        <>
          {loader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Loader color={colors.green2} />
            </View>
          ) : (
            <>
              <View style={styles.upComingTextTab}>
                <Text style={styles.popularTextContainer}>Popular Temple</Text>
                <TouchableOpacity
                  onPress={() =>
                    seeallnav.navigate(allTexts.screenNames.seeall, {
                      data: filteredList,
                    })
                  }>
                  <Text style={{color: colors.orangeColor, fontSize: 18}}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <ScrollView>
                  <View>
                    {loading && (
                      <View style={styles.loaderContainer}>
                        <Loader color={colors.orangeColor} />
                      </View>
                    )}
                    {filteredList?.length >= 0 ? (
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
                            isFollowingTrue={isFollow}
                            pageNav={pageNav}
                          />
                        )}
                        ListFooterComponent={renderLoder}
                        onEndReached={() => loadMoreItems()}
                        onEndReachedThreshold={0.5}
                        decelerationRate={0.8}
                      />
                    ) : filteredList.length > 0 ? (
                      <View style={styles.nodataView}>
                        <Text style={styles.nodatatext}>
                          no items to display
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.loaderContainer}>
                        <Loader color={colors.orangeColor} />
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </>
      )}
      {searchedText.length > 0 && (
        <>
          {loader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Loader color={colors.green2} />
            </View>
          ) : (
            <>
              <View style={styles.upComingTextTab}>
                <Text style={styles.popularTextContainer}>Popular Temple</Text>
                <Text style={{color: colors.orangeColor, fontSize: 18}}>
                  See all
                </Text>
              </View>
              <View>
                <ScrollView>
                  <View>
                    {loading ? (
                      <View style={styles.loaderContainer}>
                        <Loader color={colors.orangeColor} />
                      </View>
                    ) : (
                      [
                        filteredList?.length === 0 ? (
                          <View style={styles.loaderContainer}>
                            <Loader color={colors.orangeColor} />
                          </View>
                        ) : (
                          <FlatList
                            data={filteredList}
                            // horizontal
                            showsHorizontalScrollIndicator={false}
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
                            ListFooterComponent={renderLoder}
                            onEndReached={() => loadMoreItems()}
                            onEndReachedThreshold={0.5}
                          />
                        ),
                      ]
                    )}
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};
