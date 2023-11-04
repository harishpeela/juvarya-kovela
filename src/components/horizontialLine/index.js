import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../common';

const HorizontialLine = () => {
  return (
    <View>
      <Text style={styles.line}></Text>
    </View>
  );
};

export default HorizontialLine;
const styles = StyleSheet.create({
  line: {
    height: 5,
    width: '100%',
    backgroundColor: colors.gray,
  },
});
