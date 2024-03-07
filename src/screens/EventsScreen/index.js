import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Text,
} from 'react-native';
import {Loader, SearchBar, TopBarcard, EventCard2} from '../../components';
import {EventSearch} from '../../utils/api';
import {EventList, EventScreenList} from '../../utils/api';
import {colors} from '../../common';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EventsScreen = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState('');
  const [searchError, setSearchError] = useState(false); 
  const isDarkMode = useColorScheme() === 'dark';

  const EventsList = async () => {
    setLoader(true);
    try {
      let result = await EventScreenList(0, 200);
      console.log('list of events', result?.data);
      if (result.status === 200) {
        let filtering = result?.data?.data;
        // console.log('events screen data', filtering[0]);
        setEventsData(result?.data?.data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in events list', error);
      setLoader(false);
    }
  };

  const searchEvent = async txt => {
    try {
      let result = await EventSearch(txt);
      // console.log('res of search', result?.data);
      if (result?.data?.data?.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
        // Update eventsData state only when there is data
        setSearchedEvents(result?.data?.data);
      }
    } catch (error) {
      console.log('error in events search', error);
      setSearchError(true);
    }
  };

  useEffect(() => {
    EventsList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white',marginBottom:'-16%'}}>
      <View
        style={{
          height: '11%',
        }}>
        <TopBarcard
          menu={true}
          isBell={true}
          navigation={navigation}
          navMenu={navigation}>
          <View style={styles.searchContainers}>
            <SearchBar
              onTextChange={e => {
                setSearchedText(e);
                searchEvent(e);
              }}
              value={searchedText}
              loading={false}
              showCrossPress={true}
              onCrossPress={() => {
                setSearchedText('');
                EventsList();
              }}
              bgColor={colors.white}
              placeHolder={'Search Events'}
            />
          </View>
        </TopBarcard>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <View style={{marginTop: '70%'}}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : (
            searchedText === '' &&
            eventsData && (
              <FlatList
                numColumns={1}
                data={eventsData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                style={{marginBottom: '25%'}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <EventCard2 navigation={navigation} data={item} />
                )}
              />
            )
          )}
          {!eventsData && !searchedText && (
            <View style={styles.noData}>
              <MaterialIcons
                color={colors.orangeColor}
                name="event"
                size={50}
                style={{marginBottom: '5%'}}
              />
              <Text style={styles.noText}>No Events To Display</Text>
            </View>
          )}
          {!searchedEvents && searchedText && (
            <View style={styles.noData}>
              <MaterialIcons
                color={colors.orangeColor}
                name="event"
                size={50}
                style={{marginBottom: '5%'}}
              />
              <Text style={styles.noText}>No Such Events</Text>
            </View>
          )}
        </View>
        {searchedText && searchedEvents ? (
          <FlatList
            numColumns={2}
            data={searchedEvents}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
            style={{marginBottom: '49%'}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <EventCard2 navigation={navigation} data={item} />
            )}
          />
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

export default EventsScreen;
