import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';

const EventCard2 = ({ navigation, data }) => {
  // console.log('medialist', data?.mediaList[0]?.url);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        alert('under development');
        // navigation.navigate(allTexts.screenNames.eventsDetails, {
        //   navigation: navigation,
        // });
      }}>
      <Image
        source={{
          uri: data?.mediaList?.url ? data?.mediaList[0]?.url : 'https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?rs=1&pid=ImgDetMain',
        }}
        style={styles.Image}
      />
      <Text style={[styles.festivalText]}>{data?.name}</Text>
      <View style={styles.locationContainer}>
        <View style={styles.icon}>
          <Icon name="location" style={styles.iconSize} color={colors.orangeColor} size={20} />
          <Text style={styles.text}>{data?.creationTime.slice('0', '10')} </Text>
        </View>
        <View style={styles.icon}>
          <Icon name="location" color={colors.orangeColor} size={20} />
          <Text style={styles.text}>{`${data?.addressToEventDTO?.city} , ${data?.addressToEventDTO?.district} ,${data?.addressToEventDTO?.state}`} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default EventCard2;
