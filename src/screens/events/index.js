/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
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
import ApplicationContext from '../../utils/context-api/Context';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';

function Events({navigation, route}) {
  const [events, setEvents] = useState();
  // const [idData, setIdData] = useState();
  const {id} = useContext(ApplicationContext);
  const {idparam} = route?.params || {};
  const EventsList = async () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    let token = await getAuthTokenDetails();
    let Access_Token = token.replace('bearer ', '');
    console.log('acess_Tocken------', Access_Token);
    setEvents([]);
    fetch(
      `http://20.255.59.150:8082/api/v1/occasion/upcoming/item?itemId=${
        idparam || id
      }&pageNo=0&pageSize=40&access_token=${Access_Token}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setEvents(result.occasion);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    EventsList();
  }, [route]);
  return (
    <SafeAreaView style={styles.container}>
      <EventHeader
        onBackPress={() => navigation.goBack()}
        txt={allTexts.screenNames.events}
        plusButton
        onPlusPress={() =>
          navigation.navigate(allTexts.screenNames.addevents, {
            id: idparam,
          })
        }
        isOption={true}
      />
      {!events?.length ? (
        <View style={styles.nodata}>
          <Text style={styles.nodataText}>
            {' '}
            No Events are available to Display
          </Text>
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
            maxWidth: 190,
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
