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
import {allTexts} from '../../common';

const FollowersListCard3 = ({data, navigation}) => {
  return (
    <View>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="handled"
        keyExtractor={({item, index}) => index?.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.membershipdetails, {
                data: item,
              }),
                console.log('item', item);
            }}>
            <View style={styles.cardContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: item?.loggedInUser?.customerProfileUrl
                      ? item?.loggedInUser?.customerProfileUrl
                      : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
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
