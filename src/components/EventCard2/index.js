import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { allTexts, colors } from '../../common';
import { FlatList } from 'react-native-gesture-handler';

const EventCard2 = ({ onPress, data, navigation }) => {
  console.log("Data  =====>>>>>>>>" + data)
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      keyExtractor={({ item, index }) => index}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            //  alert('page under development')
            navigation.navigate(allTexts.screenNames.eventDetails, {
              data: item,
            })
          }>
          <Image
            source={{
              uri: item?.mediaList
                ? item?.mediaList[0]?.url
                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg',
            }}
            style={styles.Image}
          />
          <View style={styles.container2}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {item?.creationTime.slice(0, 10)}
              </Text>
            </View>
            <View style={styles.secondContainer}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.festivalText]}>{item?.name.slice(0, 15).toUpperCase()}</Text>
              <View style={styles.locationIcon}>
                <Icon name="location" color={colors.red1} size={16} />
                <Text style={{ color: colors.gray }}>Vizag</Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.text}>{item?.description} </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default EventCard2;
