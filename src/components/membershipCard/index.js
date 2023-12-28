/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../common';
export const MemberShipCard = ({data, onPress, txt}) => {
  return (
    <View>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="handled"
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <LinearGradient
            colors={['#f7f307', '#aba944']}
            style={{
              padding: 20,
              margin: 5,
              height: 200,
              borderRadius: 20,
            }}>
            <View style={styles.logo}>
              {item?.type === 'PREMIUM' && (
                <View style={{alignItems: 'center'}}>
                  <FontAwesome5 name="crown" color={'green'} size={40} />
                  <Text style={styles.typetext}>PRIMIUM</Text>
                </View>
              )}
              {item?.type === 'AVERAGE' && (
                <View style={{alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="shield-crown"
                    color={'#eb15e0'}
                    size={40}
                  />
                  <Text style={styles.typetext}>AVERAGE</Text>
                </View>
              )}
              {item?.type === 'BASIC' && (
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="shield-sun-outline"
                    color={'white'}
                    size={40}
                  />
                  <Text style={styles.typetext}>BASIC</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.underLine} />
            <View>
              <View style={styles.secondContainer}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.offerPrice}> $ 299</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                  <Text style={styles.buttext}>{txt}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  underLine: {
    borderWidth: 0.5,
    marginVertical: 20,
    borderColor: 'lightgray',
  },
  name: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typetext: {
    fontWeight: 'bold',
    marginTop: 3,
  },
  orgprice: {color: 'white', fontSize: 14, textDecorationLine: 'line-through'},
  offerPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 15,
  },
  buttext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
