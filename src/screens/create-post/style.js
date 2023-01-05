import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    // borderWidth: 1,
  },
  container: {
    //borderWidth: 1,
    flex: 1,
    margin: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  imgUpload: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: colors.gray2,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    padding: 50,
  },
  imgError: {
    color: colors.red2,
    fontFamily: fontFamily.popinMedium,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  imgUplodWraper: {
    marginTop: 30,
  },

  uploadTxt: {
    color: colors.gray2,
    fontFamily: fontFamily.popinMedium,
    textAlign: 'center',
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  imgContainer: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: colors.gray2,
    width: '80%',
    alignSelf: 'center',
  },
  crossIconContainer: {position: 'absolute', right: -10, zIndex: 100, top: -10},
  radioContainer: {
    //borderWidth: 1,
    marginTop: 20,
  },
  title: {
    color: colors.darkBrown,
    fontFamily: fontFamily.popinMedium,
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orgainsedContainer: {
    //borderWidth: 1,
    marginTop: 15,
  },
  orgainserimgContainer: {
    borderWidth: 0.5,
    height: 50,
    width: 50,
    borderRadius: 10,
    borderColor: colors.gray2,
  },
  orgainserimg: {
    height: undefined,
    width: undefined,
    flex: 1,
  },
  organiserContainer: {
    marginTop: 6,
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  organiserTitle: {
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    fontSize: 12,
  },
  verifiedText: {
    color: colors.blue,
    fontFamily: fontFamily.popinRegular,
    fontSize: 10,
  },
  orgainserTxtContainer: {
    marginLeft: 10,
  },
});
