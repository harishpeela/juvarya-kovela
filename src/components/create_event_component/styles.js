import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  uploadContainer: {
    marginBottom: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  preViewImageContainer: {
    borderWidth: 0.5,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  crossIconContainer: {position: 'absolute', right: 20, zIndex: 100},
  preViewImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 75,
  },
  uploadPic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.orangeColor,
  },
  profileImage: {
    alignItems: 'center',
    height: 100,
    width: 100,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 100 / 2,
    borderColor: colors.orangeColor,
  },
  radioLabelStyle: {
    fontSize: 16,
    color: colors.orangeColor,
    letterSpacing: -0.33,
    fontFamily: fontFamily.bold,
    paddingBottom: 4,
    paddingRight: 10,
  },
  pickDateTxt: {
    color: colors.orangeColor,
    textTransform: 'capitalize',
    fontFamily: fontFamily.popinRegular,
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: colors.orangeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 2,
    marginTop: 10,
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
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: '5%',
  },
  checkIcon: {
    color: colors.orangeColor,
    fontSize: 20,
    marginRight: 5,
  },
  rememberMeText: {
    color: 'black',
    fontSize: 18,
  },
});
