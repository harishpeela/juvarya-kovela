/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
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
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
export const PopularTemplesList = ({pageNav, seeallnav}) => {
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);
  const [isFollow, setIsFollow] = useState();
  const [searchedText, setSearchedText] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  let isFocused = useIsFocused();
  const PopularTemplesss = async () => {
    try {
      let result = await PopularTemples(0, 200);
      // console.log('iuhkmnSzmn =>', result?.data);
      if (result) {
        const dty = result?.data?.data || [];
        setLoading(false);
        dty?.map(d => {
          // console.log('dddddddd', d);
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
      let responce = await NewGetFollowUmFollowById(d?.id);
      // console.log('follow status', responce?.data);
      if (responce) {
        setIsFollow(responce?.data);
      } else {
        setIsFollow(undefined);
      }
      let Following = responce?.data;
      // console.log('follow', Following);
      const obj = {...result?.data, ...d, ...Following};
      setfilteredArray(hg => [...hg, obj]);
      setFilteredList(hg => [...hg, obj]);
    } catch (error) {
      console.log('error', error);
    }
  };
  // console.log('following.......', isFollow);
  useEffect(() => {
    PopularTemplesss();
  }, []);
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
                    {loading === true ? (
                      <View style={styles.loaderContainer}>
                        <Loader color={colors.orangeColor} />
                      </View>
                    ) : (
                      [
                        filteredList?.length === 0 ? (
                          <View style={styles.loaderContainer}>
                            {/* <Text style={styles.noAvailable}>
                            {'No Temples Available'}
                          </Text> */}
                            <Loader color={colors.orangeColor} />
                          </View>
                        ) : (
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
                    {loading === true ? (
                      <View style={styles.loaderContainer}>
                        <Loader color={colors.orangeColor} />
                      </View>
                    ) : (
                      [
                        filteredList?.length === 0 ? (
                          <View style={styles.loaderContainer}>
                            {/* <Text style={styles.noAvailable}>
                          {'No Temples Available'}
                        </Text> */}
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
