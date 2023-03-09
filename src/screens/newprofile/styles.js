import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const textStyles = (textColor, fontSize) =>
  StyleSheet.create({
    textTitle: {
      fontSize: fontSize || 14,
      color: textColor || colors.white,
      fontFamily: fontFamily.popinBold,
      textTransform: 'uppercase',
    },
  });
export const style = (bgColor, radius, paddidng, width) =>
  StyleSheet.create({
    wrapper: {
      width: width || '30%',
      padding: paddidng || 15,
      borderRadius: radius || 10,
      backgroundColor: bgColor || colors.blue,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
    },
  });
