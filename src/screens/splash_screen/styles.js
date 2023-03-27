import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  imgBackGround: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  textContainer: {
    marginBottom: 30,
    alignItems: 'flex-start',
    marginHorizontal: 40,
  },
  title: {
    fontSize: 22,
    color: colors.white,
    textAlign: 'left',
    fontFamily: fontFamily.popinBold,
  },
  description: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'left',
    fontFamily: fontFamily.popinRegular,
  },
  btnContainer: {
    marginBottom: 20,
    width: '90%',
  },
});
