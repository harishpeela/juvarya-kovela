import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
export const DotsNation = ({data, scrollX}) => {

  return (
    <View style={styles.container}>
      {data?.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', '#FFA001', '#ccc'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dots, {backgroundColor}]}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  dots: {
    minHeight: 6,
    minWidth: 6,
    borderRadius: 3,
    margin: 5,
  },
  activeDots: {
    minHeight: 12,
    minWidth: 12,
    borderRadius: 6,
    backgroundColor: 'black',
    margin: 5,
  },
  container: {
    flexDirection: 'row',
  //  margin:55,
  //  backgroundColor:'black',
    justifyContent: 'center',
  },
});
