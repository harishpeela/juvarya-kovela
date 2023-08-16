import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
export const PostsComp = ({itemDetails, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.postsView}>
      <Text>{itemDetails?.length || '0'}</Text>
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
    color: '#585858',
    lineHeight: 18,
  },
});
