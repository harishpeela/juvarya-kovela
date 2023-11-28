import {View, Text, Image, TouchableOpacity} from 'react-native';
import {allTexts, colors} from '../../common';
import React from 'react';
import {styles} from './styles';
import {CustomIcon} from '..';
import Icon from 'react-native-vector-icons/Feather';
import SpeckerIcon from 'react-native-vector-icons/AntDesign';

export const HomeHeader = ({
  name,
  img,
  onBellPress,
  onPlusPress,
  plusVisible,
  text,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode="contain" style={styles.image} source={img} />
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: 'absolute',
            left: 25,
            top: 3,
          }}>
          <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold'}}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textItemsContainer}>
        <View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>{allTexts.homeHeader.welcome}</Text>
            <CustomIcon name={'hand'} color={colors.black} size={15} />
          </View>
          <Text style={styles.name}>{name} </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {plusVisible && (
          <TouchableOpacity onPress={onPlusPress}>
            <View style={styles.plusContainer}>
              <Icon name="plus" color={'white'} size={20} />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onBellPress} style={styles.bellContainer}>
          <SpeckerIcon name="notification" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
