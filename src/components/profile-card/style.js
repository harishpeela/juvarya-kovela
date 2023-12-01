import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    alignContent:'center',
    textAlign:'center'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  nameText: {
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
    color: colors.black,
    alignContent:'center',
    textAlign:'center'
  },
  emailText: {
    fontFamily: fontFamily.popinLight,
    fontSize: 12,
    color: colors.orangeColor,
  },
  noDobText: {fontSize: 12, color: colors.orangeColor, fontWeight: 'bold'}
});
