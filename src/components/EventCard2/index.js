import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';

const EventCard2 = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(allTexts.screenNames.eventsDetails, {
          navigation: navigation,
        });
      }}>
      <Image
        source={{
          uri: 'https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?rs=1&pid=ImgDetMain',
        }}
        style={styles.Image}
      />
      <Text style={[styles.festivalText]}>Ganesh festival</Text>
      <View style={styles.locationContainer}>
       <View style={styles.icon}>
        
         <Icon name="location" style={styles.iconSize} color={colors.orangeColor} size={20} />
         <Text style={styles.text}>Hello</Text>
         
       </View>

       <View style={styles.icon}>
         <Icon name="location"  color={colors.orangeColor} size={20} />
         <Text style={styles.text}>Hello sfgas</Text>
         
       </View>
        {/* <Icon name="location"  color={colors.orangeColor} size={20} /> */}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard2;
