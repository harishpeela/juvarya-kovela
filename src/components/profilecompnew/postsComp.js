import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../common';
export const PostsComp = ({itemDetails, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.postsView}>
      <Text style={styles.postTextNum}>{itemDetails?.length || '0'}</Text>
      <Text style={styles.postText}>Posts </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  postsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  postText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 18,
  },
  postTextNum: {
    fontSize: 18,
    color: colors.black,
    lineHeight: 18,
    fontWeight: 'bold',
  },
});
