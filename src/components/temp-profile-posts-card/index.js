/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {allTexts} from '../../common';
export const TempleProfile_PostsCard = ({item, nav}) => {
  return (
    <TouchableOpacity
      style={{
        height: '100%',
        width: '34%',
        marginBottom: 2,
        marginRight: 2,
      }}
      onPress={() =>
        nav.navigate(allTexts.screenNames.feeds, {
          itemDetails: item,
        })
      }>
      {item?.mediaList ? (
        <Image
          source={{uri: item?.mediaList[0]?.url}}
          style={{
            height: 140,
            width: 140,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};
