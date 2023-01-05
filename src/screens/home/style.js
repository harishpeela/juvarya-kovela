import {StyleSheet} from 'react-native';
import {colors} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  topContainer: {
    marginTop: 5,
    paddingHorizontal: 8,
  },
  flatListStyle: {
    paddingBottom: 200,
  },
  cardContainer: {
    width: '100%',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
});
