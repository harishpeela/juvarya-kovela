/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors} from '../../../common';
import {BackgroundSmallFlowerRs} from '../../backgroundFlower';
export const Donation_Second_Tab = () => {
  const [activeIndex, setActiveIndex] = useState();
  let Data = [
    {id: 1, rs: '101'},
    {id: 2, rs: '201'},
    {id: 3, rs: '301'},
    {id: 4, rs: '401'},
    {id: 5, rs: '501'},
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.choose}>Choose amount</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Data}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => setActiveIndex(index)}
            style={{
              ...styles.flatlist,
              backgroundColor: activeIndex === index ? '#CC4501' : colors.white,
            }}>
            <Image
              source={require('../../../../assets/images/smallflower.png')}
            />
            <Text
              style={{
                ...styles.text,
                color: activeIndex === index ? colors.white : '#CC4501',
              }}>
              {' '}
              ₹{item?.rs}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.inputView}>
        <BackgroundSmallFlowerRs />
        <TextInput placeholder="Other Amount" style={styles.input} />
      </View>
      <View />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  choose: {margin: 10, fontSize: 18, fontWeight: 'bold', color: colors.black},
  flatlist: {
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    width: 100,
    flexDirection: 'row',
    borderRadius: 25,
    marginTop: 30,
  },
  text: {
    position: 'absolute',
    top: 13,
    left: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputView: {
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginHorizontal: 20,
    marginTop: '5%',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  input: {
    marginLeft: 40,
    fontSize: 16,
    fontWeight: '600',
  },
});
