import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const EventCard2 = ({ navigation, data }) => {
  // console.log('medialist', data?.mediaList[0]?.url);
  const [isHearto, setIsHearto] = useState(false);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // alert('under development');
        navigation.navigate(allTexts.screenNames.eventDetails, {
          navigation: navigation,
        });
      }}>
      <TouchableOpacity onPress={() => setIsHearto(!isHearto)} style={{ position: 'absolute', right: 15, top: 12 }}>
        <AntDesign name={!isHearto ? 'hearto' : 'heart'} size={18} color={isHearto ? 'red' : 'gray'} />
      </TouchableOpacity>
      <Image
        source={{
          uri: data?.mediaList?.url ? data?.mediaList[0]?.url : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17042617067851704261704290.jpg',
        }}
        style={styles.Image}
      />
      <Text style={[styles.festivalText]}>{data?.name}</Text>
      <View style={{ borderRadius: 10, backgroundColor: '#f1f1f1', paddingVertical: 5, width: 150, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
          <FeatherIcon style={{ color: colors.orangeColor, backgroundColor: 'white' }} name="calendar" size={15} color="white" />
          <Text style={{ fontSize: 10, color: 'black', marginLeft: 10 }}>{data?.creationTime.slice('0', '10')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
          <EvilIcons style={{ color: colors.orangeColor, backgroundColor: 'white' }} name="location" size={15} color="white" />
          <Text style={{ color: colors.blue, fontSize: 10, marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.blue }}>{data?.eventType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default EventCard2;
