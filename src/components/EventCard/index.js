/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Foundation from 'react-native-vector-icons/Foundation';
import {allTexts, colors} from '../../common';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const EventCard = ({data, navigation}) => {
  const [items, setItems] = useState(data);

  console.log('items data in eventCardscreen  => ' + items);
  console.log('data in the EventCard => ' + data);

  return (
    <View style={styles.Container}>
      <FlatList
        data={data}
        style={styles.ImagesContainer}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(allTexts.screenNames.eventsScreen)
            }
            style={styles.eventsCard}>
            <View style={styles.leftContainer}>
              <Image
                source={{
                  uri: 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg',
                }}
                style={styles.Image}
              />
            </View>

            <View style={styles.rightContainer}>
              <View style={styles.firstContainer}>
                <Text style={styles.firstContainerText}>
                  {item?.description}{' '}
                </Text>

                <View style={styles.iconsContainer}>
                  <TouchableOpacity>
                    <Foundation
                      name="star"
                      size={20}
                      color={colors.orangeColor}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <FeatherIcon
                      name="send"
                      size={18}
                      color={colors.orangeColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.locationContainer}>
                <Icon2 name="location" size={20} color={colors.black} />
                <Text style={styles.locationText}>Location....</Text>
              </View>

              <View style={styles.lastContainer}>
                <View style={styles.lastContainer2}>
                  <Icon
                    name="timer-outline"
                    size={20}
                    color={colors.orangeColor}
                  />
                  <Text style={styles.IconText}>Start Date</Text>
                </View>

                <View style={styles.lastContainer2}>
                  <Icon
                    name="timer-outline"
                    size={20}
                    color={colors.orangeColor}
                  />
                  <Text style={styles.IconText}>End Date</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EventCard;
