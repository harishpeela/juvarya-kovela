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
    <View style={{flex: 1}}>
      <BackgroundImage />
      <View>
        <NearBy />
        <UpComingEvents />
      </View>
    </View>
    // <ScrollView
    //   contentContainerStyle={{paddingBottom: 100}}
    //   style={styles.wrapper}>
    //   <StatusBar backgroundColor="transparent" translucent={true} />

    //   <View style={styles.topContainer}>
    //     <HomeHeader
    //       img={require('../../utils/assets/images/avatar.png')}
    //       name={userDetails?.username}
    //     />
    //     <Text style={styles.heading}>
    //       {'Explore and Find your Best Temple'}
    //     </Text>
    //   </View>
    //   <View style={styles.searchbarContainer}>
    //     <View style={{width: searchLoader ? '80%' : '100%'}}>
    //       <SearchBar
    //         value={searchText}
    //         onCrossPress={() => {
    //           setSearchContentVisible(false);
    //           getLatestTemples();
    //           setSearchText('');
    //         }}
    //         // onSubmit={searchedTextHandler}
    //         onTextChange={e => {
    //           setSearchText(e);
    //           if (e === '') {
    //             setSearchContentVisible(false);
    //           }
    //         }}
    //       />
    //     </View>
    //     {searchLoader && (
    //       <View style={{flex: 1}}>
    //         <Loader color={colors.green2} size={30} />
    //       </View>
    //     )}
    //   </View>
    //   {!searchContentVisible ? (
    //     <>
    //       <CardHeader
    //         onPress={() => {
    //           navigation.navigate(allTexts.screenNames.seemore, {
    //             screenTitle: 'Popular Destination',
    //             type: 1,
    //           });
    //         }}
    //         title={'Popular Destination'}
    //       />
    //       <View>
    //         {popTempleLoader ? (
    //           <View style={styles.popTempleLoader}>
    //             <Loader color={colors.green} />
    //           </View>
    //         ) : (
    //           <FlatList
    //             horizontal
    //             data={popTemples}
    //             showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={{}}
    //             keyboardShouldPersistTaps="handled"
    //             keyExtractor={(item, index) => index}
    //             renderItem={({item, index}) => (
    //               <PopularCard
    //                 title={item.name}
    //                 location={`${item.line1}, ${item.line2} ${item.line3}`}
    //                 review={'5.0'}
    //                 isFollowTemple={item?.following}
    //                 id={item?.id}
    //                 img={require('../../../assets/images/bigTamle.png')}
    //                 onCardPress={() => {
    //                   navigation.navigate(
    //                     allTexts.screenNames.templeProfile,
    //                     {
    //                       id: item.id,
    //                       title: item.name,
    //                       profileImg: item?.profilePicture?.url,
    //                     },
    //                     console.log(
    //                       'id: ',
    //                       item.id,
    //                       'title',
    //                       item.name,
    //                       'profileimg',
    //                       item?.profilePicture?.url,
    //                     ),
    //                   );
    //                 }}
    //               />
    //             )}
    //           />
    //         )}
    //       </View>
    //       <CardHeader
    //         onPress={() => {
    //           navigation.navigate(allTexts.screenNames.seemore, {
    //             screenTitle: 'More to explore',
    //             type: 2,
    //           });
    //         }}
    //         title={'More to explore'}
    //       />
    //       <View>
    //         {moreExploreLoader ? (
    //           <View style={styles.popTempleLoader}>
    //             <Loader color={colors.green} size={'small'} />
    //           </View>
    //         ) : (
    //           <FlatList
    //             horizontal
    //             data={moreExploreTemples}
    //             showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={{}}
    //             keyboardShouldPersistTaps="handled"
    //             keyExtractor={(item, index) => index}
    //             renderItem={({item, index}) => (
    //               <ExploreCard
    //                 location={item.desciption}
    //                 name={item.name}
    //                 img={item?.profilePicture?.url}
    //                 onPress={() => {
    //                   navigation.navigate(
    //                     allTexts.screenNames.templeProfile,
    //                     {
    //                       id: item.id,
    //                       title: item.name,
    //                       // searchData: item,
    //                       profileImg: item?.profilePicture?.url,
    //                     },
    //                     console.log(
    //                       'id: ',
    //                       item.id,
    //                       'title',
    //                       item.name,
    //                       'profileimg',
    //                       item?.profilePicture?.url,
    //                     ),
    //                   );
    //                 }}
    //               />
    //             )}
    //           />
    //         )}
    //       </View>
    //     </>
    //   ) : (
    //     <View>
    //       {searchedContent.length !== 0 ? (
    //         <FlatList
    //           data={searchedContent}
    //           // data={[1, 2, 3, 4, 5, 6, 7]}
    //           showsHorizontalScrollIndicator={false}
    //           style={{}}
    //           contentContainerStyle={{
    //             flex: 1,
    //           }}
    //           keyboardShouldPersistTaps="handled"
    //           keyExtractor={(item, index) => index}
    //           renderItem={({item, index}) => (
    //             <SearchCard
    //               name={item.name}
    //               location={`${item.line1}, ${item.line2} ${item.line3}`}
    //               id={item?.id}
    //               img={item?.profilePicture?.url}
    //               item={item}
    //               isFollowTemple={item?.following}
    //               id={item?.id}
    //               onPress={() => {
    //                 navigation.navigate(allTexts.screenNames.homeDetails, {
    //                   id: item?.id,
    //                   title: item?.name,
    //                 });
    //               }}
    //             />
    //           )}
    //         />
    //       ) : (
    //         <View style={styles.noItemAvailabe}>
    //           <Text style={styles.noItemText}>No Temples Available!</Text>
    //         </View>
    //       )}
    //     </View>
    //   )}
    // </ScrollView>
  );
};

export default Search;
