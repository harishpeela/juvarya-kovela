import {View, Text} from 'react-native';
import {colors} from '../../common';
import React from 'react';
import {styles} from './styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ImageLoader} from '..';

export const InfoHeader = ({name, img, location, description}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <ImageLoader url={img} imageStyle={styles.img} resizeMode="contain" />
      </View>
      <View style={styles.allTextContainer}>
        <Text style={styles.nameText}>{description}</Text>
        <View style={styles.locationContainer}>
          <View style={styles.locationIcon}>
            <EntypoIcon name="location-pin" color={colors.green} size={22} />
          </View>
          <Text style={styles.locationText}>Anakapalle, Andhra pradesh </Text>
        </View>
      </View>
    </View>
  );
};
