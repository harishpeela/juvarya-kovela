import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  noAvailable: {
    color: colors.orange,
    fontFamily: fontFamily.popinBold,
  },
  searchbarContainer: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    margin: 8,
    marginTop: '5%',
  },
  bell: {marginLeft: 10, marginTop: 10},
  flatListStyle: {
    paddingBottom: 200,
  },
});
