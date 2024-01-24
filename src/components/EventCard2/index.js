import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const EventCard2 = ({ navigation, data }) => {
  console.log('data in event cad', data?.mediaList[0]?.url)
  // console.log('medialist', data?.mediaList[0]?.url);
  const [isHearto, setIsHearto] = useState(false);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // alert('under development');
        navigation.navigate(allTexts.screenNames.eventDetails, {
          item: data,
        });
      }}>
      <TouchableOpacity onPress={() => setIsHearto(!isHearto)} style={{ position: 'absolute', right: 15, top: 12 }}>
        <AntDesign name={!isHearto ? 'hearto' : 'heart'} size={18} color={isHearto ? 'red' : 'gray'} />
      </TouchableOpacity>
      <Image
        source={{
          uri: data?.mediaList[0]?.url ? data?.mediaList[0]?.url : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17051275477141705127546621.jpg',
        }}
        style={styles.Image}
      />
      <Text style={[styles.festivalText]}>{data?.name?.length < 12 ? data?.name : `${data?.name?.substring(0, 12)} ...`}</Text>
      <View style={{ borderRadius: 10, backgroundColor: colors.gray0, width: '80%', height: '20%', alignSelf: 'center', justifyContent: 'center', marginTop: '10%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
          <View style={{ backgroundColor: 'white', height: 16, width: 16, justifyContent: 'center', alignItems: 'center',borderRadius:3 }}>
            <FeatherIcon style={{ color: colors.orangeColor }} name="calendar" size={12} color="white" />
          </View>

          <Text style={{ fontSize: 10, color: 'black', marginLeft: 10 }}>{data?.creationTime.slice('0', '10')}</Text>
        </View>
        {data?.eventType ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
            <View style={{ backgroundColor: 'white', height: 15, width: 15, justifyContent: 'center', alignItems: 'center',borderRadius:3  }}>
              <EvilIcons style={{ color: colors.orangeColor, backgroundColor: 'white' }} name="location" size={12} color="white" />
            </View>
            <Text style={{ color: colors.blue, fontSize: 10, marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.blue }}>{data?.eventType}</Text>
          </View>
        ) : (
          ''

        )}
      </View>
    </TouchableOpacity>
  );
};
export default EventCard2;
