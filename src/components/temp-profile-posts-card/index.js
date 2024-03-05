/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image, Dimensions} from 'react-native';
import {allTexts} from '../../common';
export const TempleProfile_PostsCard = ({item, nav, role}) => {
  return (
    <TouchableOpacity
      style={{
        // flex: 1,
        // height: 120,
      }}
      onPress={() =>
        nav.navigate(allTexts.screenNames.feeds, {
          itemDetails: item,
          role: role
        })
      }>
      {item?.mediaList ? (
        <Image
          source={{uri: item?.mediaList[0]?.url}}
          height={Dimensions.get('window').width / 3}
          width={Dimensions.get('window').width / 3}
          style={{
            margin: 1,
            height: Dimensions.get('window').width / 3,
            width: Dimensions.get('window').width / 3,
            resizeMode: 'cover',
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};
