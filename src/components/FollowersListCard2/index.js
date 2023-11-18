import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './style';
import {PrimaryButton} from '../primary-button';
import {colors, fontSize} from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';

const FollowersListCard2 = ({
  donation,
  data,
  name,
  location,
  date,
  onPress,
  img,
}) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: img
                ? img
                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
            }}
            style={styles.image}
          />
          <Image
            source={{
              uri: img
                ? img
                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
            }}
            style={styles.backgroundImage}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.listFirstItem}>
          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.firstName}>
              {name}
            </Text>
            <Text style={styles.donationText}>
              {donation === undefined ? (
                <Text>No donations yet</Text>
              ) : (
                <>
                  Donation <Icon name="rupee" />{' '}
                </>
              )}
            </Text>
          </View>
          <View>
            <PrimaryButton
              text={'Block'}
              textColor={'red'}
              width={70}
              bgColor={colors.red5}
              loading={false}
              padding={8}
              fontsize={fontSize.xxsmall}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FollowersListCard2;
