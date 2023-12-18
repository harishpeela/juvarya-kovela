import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = (bgColor,height, radius, paddidng, width) =>
  StyleSheet.create({
    wrapper: {
      width: width?width:"100%",
      padding: paddidng || 15,
      borderRadius: radius || 10,
      backgroundColor: bgColor || colors.blue,
      alignItems: 'center',
      justifyContent: 'center',
      height:height?height:'100%'
      
    },
  });
export const textStyles = (textColor, fontSize) =>
  StyleSheet.create({
    textTitle: {
      fontSize: fontSize || 14,
      color: textColor ? textColor:colors.black,
      fontFamily: fontFamily.popinBold,
      textTransform: 'uppercase',
    },
  });
