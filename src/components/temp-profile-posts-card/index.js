/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {allTexts} from '../../common';
import {styles} from './style'
export const TempleProfile_PostsCard = ({item, nav}) => {
  return (
    <TouchableOpacity
     style={styles.postCardContainer}
      onPress={() =>
        nav.navigate(allTexts.screenNames.feeds, {
          itemDetails: item,
        })
      }>
      {item?.mediaList ? (
        <Image
          source={{uri: item?.mediaList[0]?.url}}
          style={styles.image}
        />
      ) : null}
    </TouchableOpacity>
  );
};
