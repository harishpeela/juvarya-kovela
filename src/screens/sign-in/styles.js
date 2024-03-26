import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardStyle: {
    width: '100%',
    flex: 1,
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  imageContainer: {width: 300, height: 200, marginBottom: 8},
  templeLogo: {height: undefined, width: undefined, flex: 1},
  description: {
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: fontFamily.popinMedium,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  inputContainer: {
    width: '90%',
    paddingBottom: 100,
  },
  btnContainer: {marginTop: 15, width: '70%', alignSelf: 'center'},
  navLinkText: {
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: fontFamily.popinBold,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  login: {
    fontFamily: fontFamily.popinBold,
    color: colors.orangeColor,
    paddingLeft: 50,
  },
  signinTextContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    width: 120,
    marginBottom: 20,
    marginTop: 40,
  },
  signinText: {
    color: colors.black,
    textTransform: 'uppercase',
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
  },
  forgotPassword: {
    textAlign: 'center',
    color: 'orange',
    marginTop: '5%',
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
    justifyContent: 'flex-end',
  },
  expectOtp: {
    color: colors.green2,
    fontFamily: fontFamily.popinRegular,
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  black: {
    color: colors.black,
  },
  button: {
    width: '90%',
    alignItems: 'center',
    marginTop: '30%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.orangeColor
  },
});
