import {
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Text,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Loader,
  SearchBar,
  Sort,
  EventCard2,
  TopBarcard,
} from '../../components';
import {AdminTemples} from '../../utils/api';
import {allTexts, colors} from '../../common';
import {EventList} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import Card from '../../common/Card';
const EventsScreen = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loader, setLoader] = useState(false);
  const [admin, setAdmin] = useState();
  const [searchedText, setSearchedText] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [roleType, setRoleType] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const EventsList = async () => {
    setEventsLoader(true);
    setLoader(true);
    let result = await EventList(0, 200);
    // console.log('list of evengts', result?.data);
    if (result.status === 200) {
      let filtering = result?.data?.events;
      // console.log('events sctreen data', filtering);
      setEventsData(result?.data?.events);
      setLoader(false);
      setEventsLoader(false);
    } else {
      setEventsLoader(false);
      setLoader(false);
    }
  };
  const TempleAdmins = async () => {
    let result = await AdminTemples();
    if (result?.status === 200) {
      setAdmin(result?.data);
    } else {
      setAdmin([]);
    }
  };
  useEffect(() => {
    EventsList();
    TempleAdmins();
    Type();
  }, []);

  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    } else {
      console.log('');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{minHeight: 170, marginTop: '2%'}}>
        <TopBarcard
          menu={true}
          txt={'Events'}
          isBell={true}
          navigation={navigation}>
          <View
            style={{
              ...styles.searchAndNew,
              marginHorizontal: admin || roleType === 'ROLE_ADMIN' ? 40 : 0,
            }}>
            <SearchBar
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
            {admin || roleType === 'ROLE_ADMIN' ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.addevents)
                }
                style={styles.plusContainer}>
                <Feather
                  style={styles.plusIcon}
                  name="plus"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              ''
            )}
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
              {eventsData?.length ? (
                <FlatList
                  numColumns={2}
                  data={eventsData}
                  contentContainerStyle={styles.flatListStyle}
                  style={{marginBottom: '35%', marginTop: '3%'}}
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
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {' '}
                  No Data to display
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default EventsScreen;
