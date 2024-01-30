import {
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Text,
} from 'react-native';
import { Loader, SearchBar, TopBarcard, EventCard2 } from '../../components';
import { AdminTemples } from '../../utils/api';
import { EventList } from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import { allTexts, colors } from '../../common';
import { styles } from './styles';

const modalStyles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: '-39%',
    marginRight: '-35%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    height: '50%',
    width: '50%',
    alignItems: 'center',
    color:'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};

const EventsScreen = ({ navigation, route }) => {
const {id, data} = route?.params || {};
  const { userDetails } = useContext(ApplicationContext);
  const [loader, setLoader] = useState(false);
  const [admin, setAdmin] = useState();
  const [searchedText, setSearchedText] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [roleType, setRoleType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [userAdminTemples, setUserAdminTemples] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const EventsList = async () => {
    setLoader(true);
    try{
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
    } catch(error){
      console.log('error in events list', error)
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
            {/* {(userAdminTemples.length > 0 || roleType === 'ROLE_ADMIN') && (
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
            )} */}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={{fontFamily:'Poppins-Medium'}}>Select a Temple</Text>
            <FlatList
              data={userAdminTemples}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View >
                <Pressable
                  onPress={() => {
                    setSelectedTemple(item);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={{marginTop:'10%'}}>
                  <Text style={{fontFamily:'Poppins-Medium',
                  color:'orange',
                  fontSize:16,borderWidth:0.3, borderStyle:'solid',
                   borderRadius:1,
                   borderColor:'orange',
                   borderTopWidth:0,
                   borderLeftWidth:0,
                   borderBottom:20,
                   borderRightWidth:0}}>{item}
                   </Text>
                
                  </View>
                </Pressable>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default EventsScreen;