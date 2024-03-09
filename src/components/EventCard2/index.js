import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const EventCard2 = ({ navigation, data, roleId, role }) => {
  const [isHearto, setIsHearto] = useState(false);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(allTexts.screenNames.eventDetails, {
          item: data,
          roleId: roleId,
          role: role
        });
      }}>
      {/* <TouchableOpacity onPress={() => setIsHearto(!isHearto)} style={{ position: 'absolute', right: 15, top: 15 }}>
        <AntDesign name={!isHearto ? 'hearto' : 'heart'} size={18} color={isHearto ? 'red' : 'gray'} />
      </TouchableOpacity> */}
      {data?.mediaList ? (
        <Image
          source={{
            uri: data?.mediaList[0]?.url ? data?.mediaList[0]?.url : 'https://fanfun.s3.ap-south-1.amazonaws.com/17065220870951706522085550.jpg',
          }}
          style={styles.Image}
        />
      ) : (
        <Image
          source={{
            uri: 'https://fanfun.s3.ap-south-1.amazonaws.com/17065220870951706522085550.jpg',
          }}
          style={styles.Image}
        />
      )}
      <View style={{ marginTop: '5%',  width: '55%', marginLeft: '5%'}}>
        <Text numberOfLines={2} style={[styles.festivalText]}>{data?.name}</Text>
        <View style={{ borderRadius: 10, backgroundColor: colors.white, width: '70%', marginTop: '2%' }}>
          {data?.worldWide || data?.countryWide || data?.cityWide && (
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{data?.cityWide ? 'Event' : data?.worldWide ? 'Festival' : data?.countryWide ? 'Festival' : ''} </Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '1%'}}>
              <FeatherIcon style={{ color: colors.orangeColor }} name="calendar" size={12} color="white" />
            <Text style={{ fontSize: 10, color: 'black', marginLeft: 10 }}>{data?.creationTime.slice('0', '10')}</Text>
          </View>
          {(data?.countryWide || data?.worldWide) ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <EvilIcons style={{ color: colors.orangeColor, backgroundColor: 'white' }} name="location" size={12} color="white" />
              <Text style={{ color: colors.blue, fontSize: 10,  marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.blue }}>{data?.worldWide ? 'Accross World' : data?.countryWide ? 'Across India' : ''}</Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default EventCard2;
