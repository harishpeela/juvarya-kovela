/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {allTexts, colors} from '../../common';
import {EventHeader} from '../../components';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import PencilIcon from 'react-native-vector-icons/EvilIcons';
import DeleteIcon from 'react-native-vector-icons/AntDesign';

const Events = ({navigation}) => {
  const [events, setEvents] = useState();
  const EventsList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'JSESSIONID=0D469B0BD0A128F1E53151840D1B03F5');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://20.255.59.150:8082/api/v1/occasion/upcoming/item?itemId=1200&pageNo=0&pageSize=20&access_token=ef4bc0c1-cc28-4e11-a1ec-b43ea1269533',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setEvents(result.occasion);
          console.log('ressss', events);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    EventsList();
    events;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <EventHeader
        onBackPress={() => navigation.goBack()}
        txt={allTexts.screenNames.events}
        plusButton
        onPlusPress={() => navigation.navigate(allTexts.screenNames.addevents)}
        isOption={true}
      />
      {events === 0 ? (
        <View>
          <Text> No Events are available to Display</Text>
        </View>
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false}>
          {events?.map(item => {
            return (
              <EventsCard
                name={item.name}
                date={item.date}
                description={item.description}
                onPencilPress={() => alert('screen under devlop')}
                onDeletePress={() => alert('screen under devlop')}
              />
            );
          })}
        </ScrollView>
        // <FlatList
        //   data={events}
        //   // showsHorizontalScrollIndicator={false}
        //   // contentContainerStyle={styles.flatListStyle}
        //   // keyboardShouldPersistTaps="handled"
        //   // keyExtractor={(item, index) => item?.id}
        //   // renderItem={({item}) => {
        //   //   <EventsCard name={item.name} />;
        //   // }}
        //   keyExtractor={(item, index) => index.id}
        //   renderItem={({item}) => (
        //     <View>
        //       <EventsCard
        //         name={item?.occasion[72]?.name}
        //         date={item?.occasion[72]?.date}
        //         description={item?.occasion[72]?.description}
        //       />
        //     </View>
        //   )}
        // />
      )}
    </SafeAreaView>
  );
};
export default Events;

const EventsCard = ({
  name,
  date,
  description,
  onPencilPress,
  onDeletePress,
}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        margin: '5%',
        backgroundColor: colors.green3,
        padding: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="dot-single" size={52} color={'black'} />
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black',
            textTransform: 'capitalize',
          }}>
          {name}
        </Text>
        <TouchableOpacity
          onPress={onPencilPress}
          style={{position: 'absolute', left: '80%'}}>
          <PencilIcon name="pencil" size={28} color={'blue'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDeletePress}
          style={{position: 'absolute', left: '90%'}}>
          <DeleteIcon name="delete" size={23} color={'green'} />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: '13%'}}>
        <Text style={{marginTop: 10, color: colors.green2}}>
          Date - {date}{' '}
        </Text>
        <Text style={{marginTop: 10, color: colors.green2}}>
          Discription -{' '}
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: colors.green2,
            textTransform: 'capitalize',
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
};
