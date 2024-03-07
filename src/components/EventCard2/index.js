import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const EventCard2 = ({ navigation, data }) => {
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
      <View style={{marginTop:10,marginLeft:10,alignContent:'flex-start', justifyContent: 'flex-start',}}>
      <Text style={[styles.festivalText]}>{data?.name}</Text>
      <View style={{ borderRadius: 10, backgroundColor: colors.white, width: '70%', height: '40%',  justifyContent: 'center', marginTop: '5%',marginLeft:16 }}>
        {data?.worldWide || data?.countryWide || data?.cityWide && (
                <Text style={{ fontSize: 12}}>{data?.cityWide ? 'Event' : data?.worldWide ? 'Festival' : data?.countryWide ? 'Festival': ''} </Text>

        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
          <View style={{ backgroundColor: 'white', height: 16, width: 16, justifyContent: 'center', alignItems: 'center',borderRadius:3 }}>
            <FeatherIcon style={{ color: colors.orangeColor }} name="calendar" size={12} color="white" />
          </View>
          <Text style={{ fontSize: 10, color: 'black', marginLeft: 10 }}>{data?.creationTime.slice('0', '10')}</Text>
        </View>
        {(data?.countryWide || data?.worldWide ) ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
            <View style={{ backgroundColor: 'white', height: 15, width: 15, justifyContent: 'center', alignItems: 'center',borderRadius:3  }}>
              <EvilIcons style={{ color: colors.orangeColor, backgroundColor: 'white' }} name="location" size={12} color="white" />
            </View> 
            <Text style={{ color: colors.blue, fontSize: 10, marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.blue }}>{data?.worldWide ? 'Accross World' : data?.countryWide ? 'Across India' : ''}</Text>
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
 