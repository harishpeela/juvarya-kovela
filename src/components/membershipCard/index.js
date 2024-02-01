/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { allTexts, colors } from '../../common';
export const MemberShipCard = ({ data, onPress, txt, nav, roleId }) => {
  return (
    <View style={{}}>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="handled"
        style={{marginBottom: '32%'}}
        keyExtractor={({ item, index }) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={['#FFA001', '#ECF219', '#FFA001']}
            style={{
              padding: 20,
              margin: 5,
              height: 200,
              borderRadius: 20,
            }}>
            <View style={styles.logo}>
              {item?.type === 'PREMIUM' && (
                <View>
                  <View style={{ alignItems: 'center' }}>
                    <FontAwesome5 name="crown" color={'green'} size={40} />
                    <Text style={styles.typetext}>PRIMIUM</Text>
                  </View>
                  <View style={styles.underLine} />
                  <View>
                    <View style={styles.secondContainer}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.offerPrice}> ₹299</Text>
                      </View>
                      <TouchableOpacity style={styles.button} onPress={onPressPressId}>
                        <Text style={styles.buttext}>{txt}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              {item?.type === 'AVERAGE' && (
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name="shield-crown"
                    color={'#eb15e0'}
                    size={40}
                  />
                  <Text style={styles.typetext}>AVERAGE</Text>
                </View>
              )}
              {item?.type === 'BASIC' && (
                // <TouchableOpacity style={{alignItems: 'center'}}>
                //   <MaterialCommunityIcons
                //     name="shield-sun-outline"
                //     color={'white'}
                //     size={40}
                //   />
                //   <Text style={styles.typetext}>BASIC</Text>
                // </TouchableOpacity>
                <TouchableOpacity style={{width: '100%'}} onPress={() => nav.navigate(allTexts.screenNames.profilemembership, {
                  id: item?.id,
                  roleId:roleId
                })}>
                  <View style={{ }}>
                  <MaterialCommunityIcons
                     name="shield-sun-outline"
                     color={'white'}
                     size={40}
                   />
                    <Text style={styles.typetext}>BASIC</Text>
                  </View>
                  <View style={styles.underLine} />
                    <View style={styles.secondContainer}>
                      <View style={{}}>
                        <Text style={styles.offerPrice}>{item?.salePrice ? item?.salePrice : 'Free'} </Text>
                      </View>
                      <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttext}>{txt}</Text>
                      </TouchableOpacity>
                   
                  </View>
                </TouchableOpacity>
              )}
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
    width: '100%'
  },
  name: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typetext: {
    fontWeight: 'bold',
    marginTop: 3,
  },
  orgprice: { color: 'white', fontSize: 14, textDecorationLine: 'line-through' },
  offerPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
