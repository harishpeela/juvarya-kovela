import { Text, View, Image, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        <TouchableOpacity onPress={() => setIsHearto(!isHearto)} style={{position: 'absolute', right:15, top: 12}}>
            <AntDesign name={!isHearto ? 'hearto' : 'heart'} size={18} color={isHearto ? 'red' : 'gray'} />
        </TouchableOpacity>
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
          <Icon name="location" color={colors.orangeColor} size={20} />
        </View>
        <View style={styles.icon}>
          <Text style={styles.text}>{data?.creationTime.slice('0', '10')} </Text>
          <Text style={styles.text}>
            {data?.addressToEventDTO?.city ? `${data?.addressToEventDTO?.city} , ${data?.addressToEventDTO?.district} ,${data?.addressToEventDTO?.state}`
              : 'no data'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default EventCard2;
