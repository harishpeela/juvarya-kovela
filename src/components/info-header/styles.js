import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 15,
  },
  imgContainer: {
    width: 120,
    height: 120,
    borderWidth: 0,
  },
  img: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: colors.black,
  },
  allTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  nameText: {
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinRegular,
    color: colors.black,
  },
  locationContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: -8,
  },
  locationIcon: {
    height: 20,
    width: 20,
  },
  locationText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fontFamily.popinLight,
    flex: 1,
  },
});
