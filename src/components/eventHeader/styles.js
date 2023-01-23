import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  continer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    height: 40,
    width: 40,
    marginRight: 2,
    backgroundColor: colors.blue3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 1,
    marginLeft: '40%',
  },
  title: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    marginLeft: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  plusContainer: {
    backgroundColor: colors.blue3,
    padding: 10,
    borderRadius: 10,
  },
});
