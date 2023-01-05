import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  headerContinaer: {
    padding: 10,
  },
  trackScreenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  line: {
    width: 30,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: colors.black,
  },
  countTrack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray5,
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  countText: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: fontFamily.popinBold,
  },
});
