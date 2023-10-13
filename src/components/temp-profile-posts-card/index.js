/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {allTexts} from '../../common';
export const TempleProfile_PostsCard = ({item, nav}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 140,
        margin: 3,
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
            width: item?.mediaList[0]?.url?.length < 1 || 2 ? 130 : '100%',
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};
