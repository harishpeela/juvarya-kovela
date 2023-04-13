import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 0.8,
  },
  wrapper: {
    // backgroundColor: colors.blue3,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    flex: 0.2,
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
  },
  emailText: {
    fontFamily: fontFamily.popinLight,
    fontSize: 12,
    color: colors.black,
    marginLeft: 9,
  },
});
