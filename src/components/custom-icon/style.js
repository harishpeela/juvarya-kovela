import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row-reverse'},
  quantityText: {
    color: colors.white,
    fontSize: fontSize.tiny,
  },
  bagdeStyle: {
    width: 20,
    height: 20,
    backgroundColor: colors.primaryColor,
    position: 'absolute',
    left: 20,
    top: -2,
  },

  //   bubbleContainer: {
  //     backgroundColor: colors.primaryColor,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginLeft: -15,
  //     paddingHorizontal: 5,
  //     zIndex: 100,
  //     borderRadius: 10,
  //     height: 17,
  //   },
  //   text: {
  //     color: colors.white,
  //     fontFamily: fontFamily.popinMedium,
  //     fontSize: 8,
  //   },
});
