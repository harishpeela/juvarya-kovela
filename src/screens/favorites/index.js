/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, SafeAreaView, FlatList, Text, useColorScheme} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Loader, SearchBar, BackgroundImage} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './style';
import {GetMyTemples, getTempledetailsWithId} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import ApplicationContext from '../../utils/context-api/Context';
import {FavTempleListCard} from '../../components';
const Favorite = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {userDetails} = useContext(ApplicationContext);
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  const [loading, setLoading] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [seracherdText, setSeracherdText] = useState('');
  const [pageNo, setPageNo] = useState(0);
  let isFocused = useIsFocused();
  const getTemples = async (userid, pgno, pgsz) => {
    setIsLoading(true);
    setLoading(true);
    try {
      let response = await GetMyTemples(userid, pgno, pgsz);
      if (response?.data?.totalItems === 0) {
        setLoading(false);
      } else if (response.data) {
        let data = response?.data?.data;
        data?.map(a => {
          TempleDetails(a);
        });
      }
    } catch (error) {
      console.log('error in mytemplesapi', error);
    }
  };
  const TempleDetails = async d => {
    try {
      setfilteredArray([]);
      setTempleList([]);
      let result = await getTempledetailsWithId(d?.jtProfile);
      if (result) {
        let templesArray = {...d, ...result?.data};
        setTempleList(array => [...array, templesArray]);
        setfilteredArray(array => [...array, templesArray]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('error in templedetails api in favourites ==>', error);
    }
  };
  const onSelect = data => {
    getTemples(userDetails?.id, 0, 20);
    data?.selected !== '' && templeList.length === 1
      ? setfilteredArray([])
      : '';
  };
  useEffect(() => {}, [isFocused]);
  const performFilter = value => {
    setfilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };
  const renderLoder = () => {
    return isLoading ? (
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: '5%',
          color: colors.gray2,
        }}>
        No Items to display
      </Text>
    ) : (
      <View>
        <Loader size={'large'} color={colors.orangeColor} />
      </View>
    );
  };
  const loadMoreItems = () => {
    setPageNo(pageNo + 1);
    setIsLoading(false);
  };
  useEffect(() => {
    if (pageNo >= 0) {
      getTemples(userDetails?.id, pageNo, 20);
    }
  }, [pageNo]);
  return (
    <SafeAreaView
      style={{
        ...styles.wrapper,
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      <BackgroundImage />
      <View style={styles.headerContainer} />
      <View style={styles.searchbarContainer}>
        <View style={{width: '100%'}}>
          <SearchBar
            value={seracherdText}
            onCrossPress={() => {
              setSeracherdText('');
              getTemples();
            }}
            onTextChange={e => {
              setSeracherdText(e);
              performFilter(e);
            }}
          />
        </View>
      </View>

      <View style={styles.cardContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.orangeColor} />
          </View>
        ) : (
          [
            filteredArray?.length === 0 ? (
              <View style={styles.loaderContainer}>
                <Text style={styles.noAvailable}>{'No Temples Available'}</Text>
              </View>
            ) : (
              <FlatList
                data={filteredArray}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                keyboardShouldPersistTaps="handled"
                // ListFooterComponent={renderLoder}
                // onEndReached={() => loadMoreItems()}
                onEndReachedThreshold={0.5}
                decelerationRate={0.5}
                keyExtractor={item => item?.id}
                renderItem={({item}) => {
                  if (item?.name) {
                    return (
                      <FavTempleListCard
                        name={item.name}
                        location={item.line1}
                        date={item.creationTime}
                        img={item?.jtProfileDTO?.logo}
                        onPress={() => {
                          navigation.navigate(
                            allTexts.screenNames.viewtempleprofile,
                            {
                              data: item,
                              onSelect: onSelect,
                            },
                          );
                        }}
                      />
                    );
                  }
                }}
              />
            ),
          ]
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
