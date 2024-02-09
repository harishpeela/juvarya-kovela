import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import { Loader, SearchBar, TopBarcard, EventCard2 } from '../../components';
import { AdminTemples, EventSearch } from '../../utils/api';
import { EventList } from '../../utils/api';
import { allTexts, colors } from '../../common';
import { styles } from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    color: 'black',
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
  const [loader, setLoader] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [roleType, setRoleType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [userAdminTemples, setUserAdminTemples] = useState([]);
  const [searchError, setSearchError] = useState(false); // New state variable
  const isDarkMode = useColorScheme() === 'dark';

  const EventsList = async () => {
    setLoader(true);
    try {
      let result = await EventList(0, 200);
      // console.log('list of events', result?.data);
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

  const searchEvent = async (txt) => {
    try {
      let result = await EventSearch(txt);
      // console.log('res of search', result?.data);

      if (result?.data?.data.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
        // Update eventsData state only when there is data
        setEventsData(result?.data?.data);
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          minHeight: 160,
          marginTop: '3%',
          marginBottom: '3%',
        }}
      >
        <TopBarcard
          txt={'Events'}
          menu={true}
          isBell={true}
          navigation={navigation}
          navMenu={navigation}
        >
          <View style={styles.searchContainers}>
            <SearchBar
              onTextChange={(e) => {
                setSearchedText(e);
                searchEvent(e);
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
          </View>
        </TopBarcard>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <View style={{ marginTop: '70%' }}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : (
            <>
              {searchError ? (
                <View style={styles.noData}>
                   <MaterialIcons
                  color={colors.orangeColor}
                  name="event"
                  size={50}
                  style={{marginBottom:'5%'}}
                />
                  <Text style={styles.noText}>No Events to Display</Text>
                </View>
              ) : (
                <FlatList
                  numColumns={2}
                  data={eventsData}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flatListStyle}
                  style={{ marginBottom: '46%' }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <EventCard2
                      navigation={navigation}
                      data={item}
                    />
                  )}
                />
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
            <Text style={{ fontFamily: 'Poppins-Medium' }}>Select a Temple</Text>
            <FlatList
              data={userAdminTemples}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Pressable
                    onPress={() => {
                      setSelectedTemple(item);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ fontFamily: 'Poppins-Medium', color: 'orange', marginTop: '20%', fontSize: 16 }}>{item}</Text>
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
