import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  uploadPic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noimageText: {color: colors.red2, textAlign: 'left'},
  headerContinaer: {
    padding: 10,
  },
  uploadContainer: {
    marginBottom: 30,
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
    // borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 15,
    width: 90,
    alignSelf: 'flex-end',
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
  radioLabelStyle: {
    fontSize: 13,
    color: colors.green2,
    letterSpacing: -0.33,
    fontFamily: fontFamily.popinMedium,
    paddingBottom: 4,
    paddingRight: 10,
  },
  radioContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  preViewImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 75,
  },
  crossIconContainer: {position: 'absolute', right: 20, zIndex: 100},
  preViewImageContainer: {
    borderWidth: 0.5,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  DTextStyle: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 15,
    color: colors.gray,
    textTransform: 'capitalize',
  },
});
