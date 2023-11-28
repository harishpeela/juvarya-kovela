import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const ProfileTimingTabs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.toptemp}>
        <Image
          source={require('../../../assets/images/Vector.png')}
          style={{height: 20, width: 20}}
        />
        <Text style={{color: colors.black}}> Top Temple</Text>
      </View>
      <View style={styles.time}>
        <AntDesign name="clockcircleo" size={20} />
        <Text style={{color: '#228C08'}}> Open Now</Text>
        <Text style={{color: colors.black, fontWeight: 'bold'}}>
          {' '}
          • Closes 8 Pm
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  toptemp: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    borderWidth: 0.5,
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 4,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
