import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    marginTop: 10,
  },
  name: {
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  notAvailable: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
