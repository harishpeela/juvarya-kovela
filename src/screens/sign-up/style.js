import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyBoardStyle: {
    width: '100%',
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    padding: 8,
    paddingTop: -10,
    height: 170,
    width: 180,
  },
  templeLogo: {height: undefined, width: undefined, flex: 1},
  description: {
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: fontFamily.PoetsenOneRegular,
    color: colors.red1,
    textTransform: 'capitalize',
    fontSize: 28,
    letterSpacing: 10,
  },
  fieldContainer: {
    width: '90%',
    paddingBottom: 100,
  },
  buttonContainer: {
    marginTop: 15,
    width: '70%',
    alignSelf: 'center',
    // borderWidth: 1,
  },
  alreadyTextContainer: {
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: fontFamily.popinBold,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  isLogin: {
    fontFamily: fontFamily.popinBold,
    color: colors.red3,
    paddingLeft: 50,
  },
  alreadyAcc: {
    marginTop: 10,
  },
  signupText: {
    color: colors.black,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
    marginLeft: 20,
  },
});
