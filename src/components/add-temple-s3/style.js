import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  keyBoardStyle: {
    width: '100%',
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fieldContainer: {
    width: '90%',
    paddingBottom: 100,
    marginTop: 20,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  dropDownContianer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  addBtnContainer: {width: 90},
  reset: {
    borderWidth: 2,
    borderColor: colors.blue3,
    width: 90,
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  resetText: {
    color: colors.blue3,
    fontSize: 12,
    fontFamily: fontFamily.popinMedium,
  },
  DbuttonStyle: {
    height: 45,
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.green3,
  },
  DTextStyle: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 15,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.green3,
    padding: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.popinRegular,
    color: colors.black,
  },
  detail: {
    fontSize: 12,
    fontFamily: fontFamily.popinRegular,
    color: colors.green2,
  },
  finishcontainer: {
    width: '50%',
    marginTop: 30,
  },
  error: {
    color: colors.red2,
    textTransform: 'capitalize',
    fontFamily: fontFamily.popinRegular,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});
