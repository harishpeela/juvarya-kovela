import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  Loader,
  SearchBar,
  Sort,
  EventCard2,
} from '../../components';
import {allTexts, colors} from '../../common';
import {EventList} from '../../utils/api';
import Card from '../../common/Card';
const EventsScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [followersFirstName, setFollowersFirstName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);

  const EventsList = async () => {
    setEventsLoader(true);
    let result = await EventList(0, 200);
    // console.log('list of evengts', result?.data);
    if (result.status === 200) {
      console.log('1');
      let filtering = result?.data?.events;
      setEventsData(result?.data?.events);
      setEventsLoader(false);
    } else {
      setEventsLoader(false);
    }
  };
  useEffect(() => {
    EventsList();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
     <View style={styles.eventContainer}>
      <View style={styles.eventAndPlus}>
      <Text style={styles.text}>Events </Text> 
        </View>
     <View style={styles.searchAndNew}>
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
            {/* <View style={styles.sortContainer}>
            <Sort
              style={styles.sort}
              brColor={colors.gray2}
              txtColor={colors.black}
              srWidth={'100%'}
              // srHeight={"100%"}
            />
          </View> */}
          <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.addevents)} style={styles.plusContainer}>
          <FeatherIcon style={styles.plusIcon} name="plus" size={30} color="white" />
          </TouchableOpacity>
     </View>  
     </View>
      <View style={styles.bodyContainer}>
        {/* <View style={styles.searchAndFilter}>
          <View style={styles.searchContainer}></View>
        </View> */}
        <Card style={styles.card}>
          <AntDesignIcon style={{position: 'absolute', right: 10, top: 10}} name="heart" size={20} color="red" />
          <View>
            <Image 
            style={{height: 120, width: 120, borderRadius: 60}} 
            source={require('../../../assets/images/tempimg1.jpg')}/>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginVertical: 10}}>Holi Festival</Text>
            <View style={{borderRadius: 10, backgroundColor: '#f1f1f1', paddingVertical: 5, width: 150}}>
               <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
               <FeatherIcon style={{color:colors.orangeColor, backgroundColor: 'white'}} name="plus" size={15} color="white" />
                <Text style={{fontSize: 10, color:'black', marginLeft: 10}}>10-21-2023, November</Text>
               </View>
               <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
               <FeatherIcon style={{color:colors.orangeColor, backgroundColor: 'white'}} name="plus" size={15} color="white" />
               <Text style={{color: colors.blue, fontSize: 10, marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.blue}}>Anakapalle</Text>
               </View>
            </View>
          </View>
        </Card>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
                {searchedText === '' && (
                  <FlatList
                    numColumns={2}
                    data={eventsData}
                    contentContainerStyle={styles.flatListStyle}
                    style={{marginBottom: '70%'}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <EventCard2
                        navigation={navigation}
                        data={item}
                        // name={item.user.firstName}
                        // img={item.user.url}
                        // data={item.user}
                        // donation={item.user.donation}
                      />
                    )}
                  />
                )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EventsScreen;
