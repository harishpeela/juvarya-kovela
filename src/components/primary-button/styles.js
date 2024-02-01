import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = (bgColor, height, radius, paddidng, width) =>
  StyleSheet.create({
    wrapper: {
      width: width ? width : '100%',
      borderRadius: radius || 25,
      backgroundColor: bgColor || colors.blue,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      // height:height?height:'100%',
      marginBottom: 10,
    },
  });
export const textStyles = (textColor, fontSize) =>
  StyleSheet.create({
    textTitle: {
      fontSize: fontSize || 14,
      color: textColor ? textColor : colors.white,
      fontFamily: fontFamily.popinBold,
      
    },
  });
