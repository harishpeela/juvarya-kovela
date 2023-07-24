/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {BackHeader, Loader, SearchBar, BackgroundImage} from '../../components';
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
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [seracherdText, setSeracherdText] = useState('');
  const [followingCount, setFollowingCount] = useState();
  const [pageNo, setPageNo] = useState(0);
  let isFocused = useIsFocused();
  const getTemples = async (userid, pgno, pgsz) => {
    setIsLoading(true);
    try {
      let response = await GetMyTemples(userid, pgno, pgsz);
      let data = response?.data?.data;
      setFollowingCount(data);
      data?.map(a => {
        TempleDetails(a);
      });
    } catch (error) {
      console.log('error in mytemplesapi', error);
    }
  };
  const TempleDetails = async d => {
    try {
      let result = await getTempledetailsWithId(d?.jtProfile);
      if (result) {
        let templesArray = {...d, ...result?.data};
        setLoading(false);
        setTempleList(array => [...array, templesArray]);
        setfilteredArray(array => [...array, templesArray]);
        setIsLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error in templedetails api is ==>', error);
    }
  };
  useEffect(() => {
    getTemples();
  }, [isFocused]);
  const performFilter = value => {
    setfilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };
  const renderLoder = () => {
    return isLoading ? (
      <Text style={{alignSelf: 'center', marginBottom: '5%', color: 'black'}}>
        {' '}
        No Items to display
      </Text>
    ) : (
      <View>
        <ActivityIndicator size={'large'} color={colors.orangeColor} />
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
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'Following'}
        />
      </View>
      <Text style={{marginLeft: '5%', color: 'black', fontWeight: 'bold'}}>
        {followingCount?.length} Following{' '}
      </Text>
      <View style={styles.searchbarContainer}>
        <View style={{width: '100%'}}>
          <SearchBar
            value={seracherdText}
            onCrossPress={() => {
              setSeracherdText('');
              getTemples();
            }}
            onTextChange={e => {
              // console.log(e);
              setSeracherdText(e);
              performFilter(e);
            }}
          />
        </View>
      </View>

      <View style={styles.cardContainer}>
        {loading === true ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.orangeColor} />
          </View>
        ) : (
          [
            filteredArray.length === 0 ? (
              <View style={styles.loaderContainer}>
                <Text style={styles.noAvailable}>{'No Temples Available'}</Text>
              </View>
            ) : (
              <FlatList
                data={filteredArray}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                keyboardShouldPersistTaps="handled"
                ListFooterComponent={renderLoder}
                onEndReached={() => loadMoreItems()}
                onEndReachedThreshold={0.5}
                decelerationRate={0.5}
                keyExtractor={(item, index) => item?.id}
                renderItem={({item, index}) => {
                  if (item?.name) {
                    return (
                      <FavTempleListCard
                        name={item.name}
                        location={item.line1}
                        date={item.creationTime}
                        img={item?.jtProfileDTO?.logo}
                        onPress={() => {
                          navigation.navigate(
                            allTexts.screenNames.viewProfile,
                            {
                              data: item,
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
