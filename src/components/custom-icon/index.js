import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import IcomoonConfig from '../../common/selection.json';
const Icomoon = createIconSetFromIcoMoon(IcomoonConfig);
import React from 'react';
import {View, Text} from 'react-native';
import {colors, fontFamily} from '../../common';
import {styles} from './style';
import IconBadge from 'react-native-icon-badge';

export const CustomIcon = ({name, size, color, onPress, text, isHidden}) => {
  return (
    <View>
      <IconBadge
        MainElement={
          <View style={styles.wrapper}>
            <Icomoon onPress={onPress} name={name} size={size} color={color} />
          </View>
        }
        BadgeElement={<Text style={styles.quantityText}>{text}</Text>}
        IconBadgeStyle={styles.bagdeStyle}
        Hidden={isHidden}
      />
    </View>
  );
};
