import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  flatListStyle: {
    paddingBottom: 200,
  },
  nodata: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodataText: {
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: '800',
    color: 'black',
  },
});
