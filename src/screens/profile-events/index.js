import React, { useState, useEffect, useContext } from 'react';
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
import { EventList } from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {colors, allTexts } from '../../common';
import { styles } from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';

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

const Profile_Events = ({ navigation, route }) => {
const {id, data, role, roleItemType} = route?.params || {};
console.log('route', id, 'data==>', role, roleItemType)
  const { userDetails } = useContext(ApplicationContext);
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);

  const EventsList = async () => {
    setLoader(true);
    try {
      let result = await EventList(0, 200);
      console.log('list of events', result?.data);
      if (result.status === 200) {
        let filtering = result?.data?.data;
        console.log('events screen data', filtering[0]);
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

  useEffect(() => {
  }, [data]);
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
          txt={'Temple Events'}
        //   menu={true}
          back={true}
          isBell={true}
          navigation={navigation}
          navMenu={navigation}
        >
          <View style={styles.searchContainers}>
            <SearchBar
              onTextChange={(e) => {
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
            {(role === 'ROLE_ITEM_ADMIN' || roleItemType === 'ROLE_ADMIN') && (
              <TouchableOpacity
                onPress={() => 
                    navigation.navigate(allTexts.screenNames.addevents, {
                        id: id,
                    })}
                style={styles.plusContainer}>
                <FeatherIcon
                  style={styles.plusIcon}
                  name="plus"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            )}
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
              {data?.length ? (
                <FlatList
                  numColumns={2}
                  data={data}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flatListStyle}
                  style={{ marginBottom: '46%' }}
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
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View >
                <Pressable
                  onPress={() => {
                    setSelectedTemple(item);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={{fontFamily:'Poppins-Medium',color:'orange',marginTop:'20%',fontSize:16}}>{item}</Text>
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

export default Profile_Events;