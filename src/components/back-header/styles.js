import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  continer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginTop: '10%',
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 2,
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
  },
  plusContainer: {
    backgroundColor: colors.blue3,
    padding: 10,
    borderRadius: 10,
  },
});
