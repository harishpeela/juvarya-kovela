import { View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  BackgroundImage
} from '../../components';
import { allTexts, colors } from '../../common';
import { EventList } from '../../utils/api';
import Icon from 'react-native-vector-icons/AntDesign';

const EventsScreen = ({ navigation }) => {
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
    try {
      let result = await EventList(0, 100);
      console.log('data ==>', result?.data);
      if (result.status === 200) {
        setEventsData(result?.data?.events);
        console.log("eventsID=>>>>>>" + eventsData)
        setEventsLoader(false);
      } else {
        setEventsLoader(false);
      }
    } catch (error) {
      console.log("we are getting the error")
    }
  };
  useEffect(() => {
    EventsList();
  }, []);

  console.log('EventsScreen =>>>>>>>>>' + eventsData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <BackgroundImage />
      <View style={styles.Header}>
        <BackHeaderNew
          txt={'EventsScreen'}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(allTexts.screenNames.addevents);
          }}>
          <Icon name="pluscircleo" size={24} color={colors.black} />
        </TouchableOpacity>
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
        <View style={styles.ListContainer}>
          {eventsLoader ? (
            <View
              style={styles.loaderContainer}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : (
            <View style={styles.container}>{searchedText === '' && <EventCard2 data={eventsData} navigation={navigation} />}</View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EventsScreen;
