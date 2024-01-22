import {
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Text,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {styles} from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
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
    setLoader(true);
    let result = await EventList(0, 200);
    console.log('list of events', result?.data);
    if (result.status === 200) {
      let filtering = result?.data?.data;
      console.log('events sctreen data', filtering[0]);
      setEventsData(result?.data?.data);
      setLoader(false);
    } else {
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
  }
  return (
    <View style={{flex: 1}}>
      <View style={{minHeight: 160, marginTop: '3%'
    ,marginBottom:'-4%'}}>
        <TopBarcard
          txt={'Events'}
          menu={true}
          isBell={true}
          navigation={navigation}
          navMenu={navigation}>
          <View style={styles.searchContainers}>
            <SearchBar
              onTextChange={e => {
                setSearchedText(e);
                // SearchPopTemp(e);
              }}
              value={searchedText}
              loading={false}
              onCrossPress={async () => {
                setSearchedText('');
                await EventsList();
              }}
              bgColor={colors.white}
              placeHolder={'Search Events'}
            />
            {admin || roleType === 'ROLE_ADMIN' ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.addevents)
                }
                style={styles.plusContainer}>
                <FeatherIcon
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
        <View style={styles.followersContainer}>
          {loader ? (
            <View style={{marginTop: '70%'}}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : (
            <>
              {eventsData?.length ? (
                <FlatList
                  numColumns={2}
                  data={eventsData}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flatListStyle}
                  style={{marginBottom: '46%'}}
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
                <View style={styles.noData}>
                  <Text style={styles.noText}> No Data to display</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default EventsScreen;
