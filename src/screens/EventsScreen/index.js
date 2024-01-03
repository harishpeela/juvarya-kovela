import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
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
  TopBarcard,
} from '../../components';
import {allTexts, colors} from '../../common';
import {EventList} from '../../utils/api';
import { TopBarcard } from '../../components';
import Card from '../../common/Card';
const EventsScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [followersFirstName, setFollowersFirstName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const EventsList = async () => {
    setEventsLoader(true);
    setLoader(true);
    let result = await EventList(0, 200);
    // console.log('list of evengts', result?.data);
    if (result.status === 200) {
      let filtering = result?.data?.events;
      console.log('filtering', filtering);
      setEventsData(result?.data?.events);
      setLoader(false)
      setEventsLoader(false);
    } else {
      setEventsLoader(false);
      setLoader(false)
    }
  };
  const TempleAdmins = async () => {
    let result = await AdminTemples();
    if (result?.status === 200) {
      setAdmin(result?.data);
    } else {
      setAdmin([]);
    }
  }
  useEffect(() => {
    EventsList();
    TempleAdmins();
  }, []);
  return (
    <View>
     <View style={{minHeight: 160, marginTop: '3%'}}>
      <TopBarcard txt={'Search'} menu={true} isBell={true} navigation={navigation}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchedText}
          onTextChange={e => {
            setSearchedText(e);
            SearchPopTemp(e);
          }}
          loading={false}
          onCrossPress={async () => {
            setSearchedText('');
            await PopularTemplesss(pageNo, 20);
          }}
          bgColor={colors.gray4}
          placeHolder={'Search'}
        />
      </View>
      </TopBarcard>
      </View>
      <View style={styles.bodyContainer}>
        {/* <View style={styles.searchAndFilter}>
          <View style={styles.searchContainer}></View>
        </View> */}
        {/* <Card style={styles.card}>
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
        </Card> */}
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
              <FlatList
                numColumns={2}
                data={eventsData}
                contentContainerStyle={styles.flatListStyle}
                style={{ marginBottom: '35%', marginTop: '3%' }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
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
            </>
          )}
        </View>
      </View>
      </View>
  );
};
export default EventsScreen;
