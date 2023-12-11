/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  Loader,
  ContactModal,
  TempleProfile_PostsCard,
  BackgroundImageAClass,
  BackgroundImageFlower,
  BackHeaderNew,
  EventCard,
  Ellipsis,
  SearchBar,
  Sort,
  EventCard2,
  EventCard3,
} from '../../components';
import {colors} from '../../common';
import {EventList} from '../../utils/api';
import { InteractionManager } from 'react-native';

const EventsScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  // const [filteredData, setFilteredData] = useState(followersList);
  // const {id} = route.params || {};
  const [followersFirstName, setFollowersFirstName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [eventsLoader, setEventsLoader] = useState(false);

  const EventsList = async () => {
    setEventsLoader(true);
    let result = await EventList(0, 100, 85);
    console.log('result', result?.data?.data[0]?.description);
    if (result.status === 200) {
      setEventsLoader(false);
      setEventsData(result?.data?.data);
    } else {
      setEventsLoader(false);
    }
  };
  useEffect(() => {
    EventsList();
  }, []);

  console.log('EventsScreen =>>>>>>>>>', eventsData);
  console.log('itegebehbe', eventsData?.description);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.Header}>
        <BackHeaderNew
          txt={'Events'}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        {/* <Ellipsis txtColor={colors.black} /> */}
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchAndFilter}>
          <View style={styles.searchContainer}>
            <SearchBar
              // value={searchedText}
              // onTextChange={text => {
              //   setSearchedText(text);
              //   handleSearch(text);
              // }}
              // loading={loading}
              // onCrossPress={() => {
              //   setSearchedText('');
              //   setFilteredData([]);
              // }}
              placeHolder={'Search here'}
              style={styles.customSearch}
              showCrossPress={false}
              bgColor={colors.white}
              brColor={colors.gray2}
              brWidth={1}
            />
          </View>
          <View style={styles.sortContainer}>
            <Sort
              style={styles.sort}
              brColor={colors.gray2}
              txtColor={colors.orangeColor}
              srWidth={'100%'}
              // srHeight={"100%"}
            />
          </View>
        </View>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {searchedText === '' &&
                  (eventsData?.length ? (
                    <FlatList
                      numColumns={2}
                      data={eventsData}
                      contentContainerStyle={styles.flatListStyle}
                      keyExtractor={(item, index) => item.toString()}
                      renderItem={({item}) => (
                        <EventCard2
                          navigation={navigation}
                          item={item}
                          // name={item.user.firstName}
                          // img={item.user.url}
                          // data={item.user}
                          // donation={item.user.donation}
                        />
                      )}
                    />
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: '60%',
                      }}>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {' '}
                        No events to display
                      </Text>
                    </View>
                  ))}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EventsScreen;

