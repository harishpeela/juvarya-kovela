import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context'
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
import { allTexts, colors } from '../../common';
import { EventList } from '../../utils/api';
import Icon from "react-native-vector-icons/AntDesign"


const EventsScreen = ({ navigation }) => {

  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  // const [filteredData, setFilteredData] = useState(followersList);
  // const {id} = route.params || {};
  const [followersFirstName, setFollowersFirstName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [eventsLoader, setEventsLoader] = useState(false);


  const EventsList = async () => {
    setEventsLoader(true);
    let result = await EventList(0, 100);
    // console.log('list of evengts', result?.data);
    if (result.status === 200) {
      setEventsLoader(false);
      console.log('true', eventsLoader);
      console.log("evenlength = >>>>>>>>>" + result?.data?.events.length);
      setEventsData(result?.data?.events);
    } else {
      setEventsLoader(false);
      console.log('false', eventsLoader);
    }
  }
  useEffect(() => {
    EventsList();
  }, [])

  console.log("EventsScreen =>>>>>>>>>" + eventsData)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.Header}>
        <BackHeaderNew
          txt={`Events`}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        <TouchableOpacity  onPress={() => {
            navigation.navigate(allTexts.screenNames.createEvent,{
                navigation:navigation,
            })
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
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {searchedText === '' && (
                  <FlatList
                    numColumns={2}
                    data={eventsData}
                    contentContainerStyle={styles.flatListStyle}
                    keyExtractor={(item, index) => item.toString()}
                    renderItem={({ item }) => (
                      <EventCard2
                        navigation={navigation}
                      // name={item.user.firstName}
                      // img={item.user.url}
                      // data={item.user}
                      // donation={item.user.donation}
                      />
                    )}
                  />
                )}
              </ScrollView>
            </>

          )}
        </View>
      </View>
    </SafeAreaView>
  )
}
export default EventsScreen



{/* <ScrollView style={{ height: searchedText ? '85%' : 0 }}>
            {searchedText && filteredData.length > 0 ? (
            //       <FlatList
            //         style={styles.list}
            //         data={filteredData}
            //         contentContainerStyle={styles.flatListStyle}
            //         keyExtractor={item => item.user.id.toString()}
            //         renderItem={({ item }) => (
            //           <FollowersListCard2
            //             name={item.user.firstName}
            //             img={item.user.url}
            //             data={item.user}
            //             donation={item.user.donation}
            //           />
            //         )}
            //       />
            //     ) : (
            //       <View style={styles.noDataContainer}>
            //         <Text style={styles.noDataText}>
            //           No Followers to Display
            //         </Text>
            //       </View>
            //     )}
            //   </ScrollView>
            // </> */}