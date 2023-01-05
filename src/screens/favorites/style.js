import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
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
    backgroundColor: colors.green4,
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
  name: {
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  followCardContainer: {borderWidth: 0, margin: 5},
  optionContainer: {
    // borderWidth: 1,
  },
  notAvailable: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
