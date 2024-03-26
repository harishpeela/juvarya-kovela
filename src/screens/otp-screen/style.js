import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: 20,
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
    textTransform: 'capitalize',
  },
  detail: {
    color: colors.orangeColor,
    fontFamily: fontFamily.popinLight,
    fontSize: 12,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
    top: 22,
    marginRight: '10%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    height: 38,
    width: 36,
    fontSize: 14,
    margin: 12,
    borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  expectOtp: {
    color: colors.orangeColor,
    fontFamily: fontFamily.popinRegular,
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  black: {
    color: colors.black,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
