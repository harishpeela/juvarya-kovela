import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const ProfileTimingTabs = ({ data }) => {
  return (
    <View style={styles.container}>
      {data?.templeClass === 'A' || 'B' || 'C' ? (
        <View style={styles.toptemp}>
          <Text
            style={{
              padding: 5,
              width: 30,
              textAlign: 'center',
              marginRight: 10,
              color: colors.white,
              backgroundColor: colors.orangeColor,
            }}>
            {data?.templeClass}
          </Text>
          <Text style={{ color: colors.black, right: 10 }}> Top Temple</Text>
        </View>
      ) : (
        ''
      )}

      <View style={styles.time}>
        <AntDesign name="clockcircleo" size={20} />
        <Text style={{ color: '#228C08', fontSize: 12, fontWeight: 'bold' }}> Open {data?.openingTime ? data?.openingTime : '9'} Am</Text>
        <Text style={{ color: colors.red1, fontWeight: 'bold', fontSize: 12 }}>
          {' '}
          • Closes {data?.closingTime ? data?.closingTime : '8'} Pm
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