import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {styles} from './styles';
import {MembersList} from '../../utils/api';

const FollowersListCard4 = ({data, navigation}) => {
  // console.log(data, '--0098>>??>')
  const [state, setState] = useState();
  const MembershipData = async () => {
    try {
      let result = await MembersList(data?.id, 0, 100);
      let responce = result?.data?.data;
      console.log('=====responce ====>>', responce);
      if (responce) {
        setState(responce);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      alert(error);
    }
  };
  useMemo(() => {
    MembershipData();
  }, [data]);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={({item, index}) => item?.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => {
              alert('page under development');
            }}>
            <View style={styles.cardContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: item?.invitedCustomer?.customerProfileUrl
                      ? item?.invitedCustomer?.customerProfileUrl
                      : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
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
                    {item?.invitedCustomer?.fullName}
                  </Text>
                  {/* <Text>MemberShip Id :{state[0]?.membershipId} </Text> */}
                  <View style={styles.textContainer2}>
                    {/* <Text style={styles.premiumText}>
                              {state[0]?.membershipDto?.type}
                            </Text> */}
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
export default FollowersListCard4;
