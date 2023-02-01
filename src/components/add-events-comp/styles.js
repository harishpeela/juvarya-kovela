import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: '30%',
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
    marginTop: 35,
    width: 90,
    marginLeft: 50,
  },
  pickDateTxt: {
    color: colors.green2,
    textTransform: 'capitalize',
    fontFamily: fontFamily.popinRegular,
  },
  inputcalender: {
    width: '40%',
    fontSize: 18,
    backgroundColor: colors.green3,
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: colors.blue3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 2,
    marginTop: 10,
  },
  radioContainer: {
    marginTop: 30,
  },
  radioLabelStyle: {
    fontSize: 16,
    color: colors.green2,
    letterSpacing: -0.33,
    fontFamily: fontFamily.bold,
    paddingBottom: 4,
    paddingRight: 10,
  },
  wrapper1: {
    width: '60%',
  },
  inputText: {
    width: '95%',
    borderRadius: 10,
    backgroundColor: colors.green3,
    textAlign: 'center',
  },
  checkView: {
    // alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
  },
  rememberMeText: {
    color: '#444444',
    fontSize: 18,
    // fontFamily: ,
  },
  checkIcon: {
    color: 'blue',
    fontSize: 20,
    marginRight: 5,
  },
});
