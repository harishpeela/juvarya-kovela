import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
    color: colors.black,
  },
  emailText: {
    fontFamily: fontFamily.popinLight,
    fontSize: 12,
    color: colors.orangeColor,
  },
  noDobText: {fontSize: 12, color: colors.orangeColor, fontWeight: 'bold'}
});
