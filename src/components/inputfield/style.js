import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontFamily: fontFamily.popinMedium,
    color: colors.darkBrown,
    // textTransform: 'capitalize',
  },
  inputText: {
    padding: 8,
    paddingVertical: 0,
    margin: 0,
    marginBottom: -5,
    paddingHorizontal: 5,
    borderColor: colors.gray,
    fontSize: 12,
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    width: '100%',
  },
  error: {
    color: colors.orangeColor,
    textTransform: 'capitalize',
    fontFamily: fontFamily.popinRegular,
    fontSize: 12,
    marginTop: -8,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 3,
    color:colors.orangeColor
  },
  imgContainer: {
    width: 57,
    paddingVertical: 5,
    height: '95%',
    borderRadius: 5,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  code: {
    paddingLeft: 2,
    color: colors.black,
    fontFamily: fontFamily.popinLight,
    fontSize: 15,
  },
});
