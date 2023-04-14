import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  PopularCard,
  ExploreCard,
  HomeHeader,
  SearchBar,
  HomeTabs,
  Loader,
  SearchCard,
  BackgroundImage,
  NearBy,
  UpComingEvents,
} from '../../components';
import {styles} from './style';
import {SearchFilter} from '../../utils/svgs';
import ApplicationContext from '../../utils/context-api/Context';
import {
  getMoreExploreAPI,
  getPopularTemples,
  getSearchedTemple,
} from '../../utils/api';
import {allTexts, colors} from '../../common';
import {getUserDetails} from '../../utils/preferences/localStorage';
import Snackbar from 'react-native-snackbar';

const Search = ({navigation}) => {
  let debounceTimer;
  const {userDetails, setUserDetails} = useContext(ApplicationContext);
  const [popTemples, setPopTemples] = useState([]);
  const [moreExploreTemples, setMoreExploreTemples] = useState([]);
  const [searchedContent, setSearchedContent] = useState([]);
  const [popTempleLoader, setPopTempleLoader] = useState(false);
  const [moreExploreLoader, setmoreExploreLoader] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchContentVisible, setSearchContentVisible] = useState(false);
  useEffect(() => {
    getLatestTemples();
    if (!userDetails?.username) {
      getDetails();
    }
  }, []);
  // console.log('popTemples', popTemples);
  const getDetails = async () => {
    let result = await getUserDetails();
    setUserDetails(result);
  };

  const getLatestTemples = async () => {
    try {
      setPopTempleLoader(true);
      let response = await getPopularTemples(0);
      // console.log('response', response?.data);
      if (response && response.status === 200) {
        // console.log('Latest Temples API Calling response', response);
        setPopTempleLoader(false);
        const {
          data: {items},
        } = response || {};
        setPopTemples(items);
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
    try {
      setmoreExploreLoader(true);
      let moreTempleResponse = await getMoreExploreAPI(0, 10);
      // console.log('more exam', moreTempleResponse?.data);
      if (moreTempleResponse && moreTempleResponse.status === 200) {
        setmoreExploreLoader(false);
        const {
          data: {items: moreTemple},
        } = moreTempleResponse || {};
        setMoreExploreTemples(moreTemple);
        // console.log('55555555555555555555555555', moreTemple);
        // console.log('temppppppppppp', moreExploreTemples);
      }
    } catch (error) {
      console.log('Newtwork Error  786 --->', error);
    }
  };
  const searchedTextHandler = async () => {
    setSearchLoader(true);
    let response = await getSearchedTemple(searchText);
    if (response && response.status === 200) {
      setSearchLoader(false);
      setSearchContentVisible(true);
      // console.log(response.data.items);
      setSearchedContent(response.data.items);
    }
    // alert(JSON.stringify(response.data.items));
  };

  const CardHeader = ({title, onPress}) => (
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeading}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seemore}> {'See more'}</Text>
      </TouchableOpacity>
    </View>
  );

  const debounce = (callback, time) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, time);
  };
  // console.log('pop', popTemples);
  useEffect(() => {
    if (searchText) {
      debounce(searchedTextHandler, 300);
    }
  }, [searchText]);
  return (

    <ScrollView
      contentContainerStyle={{paddingBottom: 100}}
      style={styles.wrapper}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}

      <View style={styles.topContainer}>
        <HomeHeader
          img={require('../../utils/assets/images/avatar.png')}
          name={userDetails?.username}
        />
        <Text style={styles.heading}>
          {'Explore and Find your Best Temple'}
        </Text>
      </View>
      <View style={styles.searchbarContainer}>
        <View style={{width: searchLoader ? '80%' : '100%'}}>
          <SearchBar
            value={searchText}
            onCrossPress={() => {
              setSearchContentVisible(false);
              getLatestTemples();
              setSearchText('');
            }}
            // onSubmit={searchedTextHandler}
            onTextChange={e => {
              setSearchText(e);
              if (e === '') {
                setSearchContentVisible(false);
              }
            }}
          />
        </View>
        {searchLoader && (
          <View style={{flex: 1}}>
            <Loader color={colors.green2} size={30} />
          </View>
        )}
    <View style={{flex: 1}}>
      <BackgroundImage />
      <View>
        <NearBy />
        <UpComingEvents />
      </View>
    </View>
  );
};

export default Search;
