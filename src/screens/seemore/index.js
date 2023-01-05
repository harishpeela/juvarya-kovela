import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {
  BackHeader,
  HomeHeader,
  Loader,
  SearchBar,
  SearchCard,
} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts, colors} from '../../common';
import {styles} from './style';
import {getMoreExploreAPI, getPopularTemples} from '../../utils/api';
import Snackbar from 'react-native-snackbar';
import {useIsFocused} from '@react-navigation/native';

const Seemore = ({navigation, route}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [popTempleLoader, setPopTempleLoader] = useState(false);
  const [popTemples, setPopTemples] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoader, setPaginationLoader] = useState(false);

  //   const [moreExploreTemples, setMoreExploreTemples] = useState([]);
  let isFocused = useIsFocused();
  const performFilter = value => {
    setFilterList(
      popTemples.filter(item =>
        item?.name?.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };
  const moreToExplore = async () => {
    try {
      let moreTempleResponse = await getMoreExploreAPI(pageNumber, 20);
      if (moreTempleResponse && moreTempleResponse.status === 200) {
        setPopTempleLoader(false);
        const {
          data: {items: moreTemple, count, pageSize},
        } = moreTempleResponse || {};
        if (pageNumber === 0) {
          setTotalPages(count / pageSize);
          setPopTemples(moreTemple);
          setFilterList(moreTemple);
        } else {
          let item = [];
          item = moreTemple;
          for (let i = 0; i < item.length; i++) {
            const element = item[i];
            popTemples.push(element);
            filterList.push(element);
          }
        }

        setPaginationLoader(false);
      }
    } catch (error) {
      console.log('Newtwork Error  786 --->', error);
    }
  };

  const getLatestTemples = async () => {
    try {
      let response = await getPopularTemples(pageNumber);
      if (response && response.status === 200) {
        // console.log(response);
        setPopTempleLoader(false);
        const {
          data: {items, count, pageSize},
        } = response || {};

        if (pageNumber === 0) {
          setTotalPages(count / pageSize);
          setPopTemples(items);
          setFilterList(items);
        } else {
          let item = [];
          item = items;
          for (let i = 0; i < item.length; i++) {
            const element = item[i];
            popTemples.push(element);
            filterList.push(element);
          }
        }
      } else {
        Snackbar.show({
          text: allTexts.constants.noInternet,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'Try again',
            textColor: 'green',
            onPress: () => {
              getLatestTemples();
            },
          },
        });
      }
    } catch (error) {
      console.log('Newtwork Error 786', error);
    }
  };
  useEffect(() => {
    if (route?.params?.type === 1) {
      setPopTempleLoader(true);
      getLatestTemples();
    } else {
      setPopTempleLoader(true);
      moreToExplore();
    }
  }, [isFocused]);

  useEffect(() => {
    if (route?.params?.type === 1) {
      getLatestTemples();
    } else {
      moreToExplore();
    }
  }, [pageNumber]);

  const onListEndReached = () => {
    if (pageNumber + 1 <= totalPages) {
      console.log('End Of list');
      setPageNumber(pageNumber + 1);
      setPaginationLoader(true);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={route?.params?.screenTitle}
        />
        {/* <HomeHeader
          img={require('../../utils/assets/images/avatar.png')}
          name={userDetails?.username}
        /> */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchText}
            onTextChange={e => {
              setSearchText(e);
              performFilter(e);
            }}
            onCrossPress={() => {
              setSearchText('');
              if (route?.params?.type === 1) {
                getLatestTemples();
              } else {
                moreToExplore();
              }
            }}
            bgColor={colors.green4}
            placeHolder={'Search'}
          />
        </View>
      </View>
      {popTempleLoader ? (
        <View style={styles.loaderContainer}>
          <Loader color={colors.green2} />
        </View>
      ) : (
        [
          filterList.length !== 0 ? (
            <View style={{flex: 1, marginHorizontal: 10}}>
              <FlatList
                data={filterList}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{}}
                onEndReached={onListEndReached}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                  <SearchCard
                    name={item.name}
                    location={`${item.line1}, ${item.line2} ${item.line3}`}
                    id={item?.id}
                    img={item?.profilePicture?.url}
                    item={item}
                    isFollowTemple={item?.following}
                    onPress={() => {
                      navigation.navigate(allTexts.screenNames.homeDetails, {
                        id: item?.id,
                        title: item?.name,
                      });
                    }}
                  />
                )}
              />
              {paginationLoader && (
                <View>
                  <Loader color={colors.green2} />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.notAvailable}>
              <Text style={styles.name}>{'No Temple Available'}</Text>
            </View>
          ),
        ]
      )}
    </SafeAreaView>
  );
};

export default Seemore;
