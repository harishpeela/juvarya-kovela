import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PrimaryButton} from '../primary-button';
import {colors, fontSize} from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';

const FollowersListCard3 = ({data, img}) => {
  return (
    <View>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="handled"
        keyExtractor={({item, index}) => index?.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.listItemContainer}>
            <View style={styles.cardContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: item?.loggedInUser?.customerProfileUrl
                      ? item?.loggedInUser?.customerProfileUrl
                      : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
                  }}
                  style={styles.image}
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
                    {item.loggedInUser?.firstName}
                  </Text>
                  <Text> MemberShip Id :{item?.membershipId} </Text>
                  <View style={styles.textContainer2}>
                    <Text style={styles.premiumText}>
                      {item?.membershipDto?.type}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default FollowersListCard3;
