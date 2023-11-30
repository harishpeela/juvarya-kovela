import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import React from 'react';
import {styles} from './styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ImageLoader} from '..';

export const ExploreCard = ({name, img, location, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imgContainer}>
        <ImageLoader resizeMode={'contain'} url={img} imageStyle={styles.img} />
      </View>
      <View style={styles.allTextContainer}>
        <Text style={styles.nameText}>{name}</Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationIcon}>
            <EntypoIcon name="location-pin" color={colors.green} size={22} />
          </View>
          <Text style={styles.locationText}>{location} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
