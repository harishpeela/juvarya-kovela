import {View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Loader,
  BackHeaderNew,
  SearchBar,
  Sort,
  EventCard2,
  BackgroundImage,
} from '../../components';
import {allTexts, colors} from '../../common';
import {EventList} from '../../utils/api';
import Icon from 'react-native-vector-icons/AntDesign';

const EventsScreen = ({navigation}) => {
  const [searchedText, setSearchedText] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoader, setEventsLoader] = useState(false);

  const EventsList = async () => {
    setEventsLoader(true);
    let result = await EventList(0, 100);
    console.log('data ==>', result?.data);
    if (result.status === 200) {
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={styles.Header}>
        <BackHeaderNew
          txt={'Events'}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
          isArrow={true}
        />
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.createEvent, {
              navigation: navigation,
            });
          }}>
          <Icon name="pluscircleo" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.ListContainer}>
          {eventsLoader ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Loader size={'large'} color={colors.orangeColor} />
            </View>
          ) : (
            <>
              {searchedText === '' && (
                <EventCard2 data={eventsData} navigation={navigation} />
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EventsScreen;
