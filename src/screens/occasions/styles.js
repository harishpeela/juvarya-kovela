import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
export const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  wrapper: {flex: 1, backgroundColor: colors.white},
  followingText: {
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    fontSize: 15,
  },
  fontTxtCont: {
    padding: 10,
  },
  searchContainer: {
    paddingHorizontal: 10,
  },
  containerWrapper: {
    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: colors.green3,
    borderRadius: 5,
  },
  imgContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: colors.gray2,
  },
  followBtnContainer: {
    borderWidth: 0.7,
    borderRadius: 8,
    // flex: 1,
    padding: 5,
    paddingHorizontal: 8,
    marginHorizontal: 5,
  },
  followBtnText: {
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  nameContainer: {
    // borderWidth: 1,
    flex: 1,
    marginLeft: 5,
  },
  occatsionText: {
    fontSize: fontSize.normal,
    fontWeight: 'bold',
    color: colors.black,

  },
  occView:{
    margin: '5%',
    marginTop: '30%',
  },
  input: {
    borderBottomWidth: 1,
  },
  desc: {
    fontSize: fontSize.normal,
    fontWeight: 'bold',
    marginTop: '15%',
    color: colors.black,

  },
  pickDate: {
    fontSize: fontSize.normal,
    fontWeight: 'bold',
    marginTop: '15%',
    color: colors.black,
  },
  radioContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  radioLabelStyle: {
    fontSize: 13,
    color: colors.green2,
    letterSpacing: -0.33,
    fontFamily: fontFamily.popinMedium,
    paddingBottom: 4,
    paddingRight: 10,
  },
});
