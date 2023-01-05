import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
  },
  topContainer: {
    // borderWidth: 1,
  },
  popTempleLoader: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
    color: colors.black,
    padding: 10,
  },
  searchbarContainer: {
    // borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  tabContainer: {
    // borderWidth: 1,
    marginBottom: -10,
    marginTop: 10,
  },
  bellContainer: {
    // flex: 1,

    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell: {marginLeft: 10, marginTop: 10},
  cardHeader: {
    // borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardHeading: {
    textTransform: 'capitalize',
    fontFamily: fontFamily.popinBold,
    fontSize: 13,
    color: colors.black,
  },
  seemore: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 11,
    color: colors.green2,
  },
  noItemAvailabe: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  noItemText: {
    color: colors.black,
    fontFamily: fontFamily.popinMedium,
    fontSize: 18,
  },
});
