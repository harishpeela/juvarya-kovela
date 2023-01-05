import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  noAvailable: {
    color: colors.black,
    fontFamily: fontFamily.popinBold,
  },
  searchbarContainer: {
    // borderWidth: 1,
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
  },
  bell: {marginLeft: 10, marginTop: 10},
  flatListStyle: {
    paddingBottom: 200,
  },
  listItemContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: colors.green3,
    borderRadius: 10,
    padding: 12,
    margin: 10,
    // borderWidth: 1,
    borderColor: 'red',
  },
  secondaryContainer: {
    // borderWidth: 1,
    borderColor: 'blue',
    // flexWrap: 'wrap',
    marginRight: 2,

    flexDirection: 'row',
  },
  listFirstItem: {
    flexDirection: 'row',
    // borderWidth: 1,
    flex: 0.7,
    marginRight: 2,
  },
  bulletConatianer: {
    marginRight: 10,
  },
  bullet: {
    marginTop: 10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.black,
  },
  itemHeading: {
    color: colors.black,
    fontSize: fontSize.large,
    fontFamily: fontFamily.popinMedium,
    // maxLines: 1,
  },
  itemAdmin: {
    color: colors.green2,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
  itemLocation: {
    color: colors.green2,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
  itemDate: {
    color: colors.green2,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
  dateContainer: {
    // borderWidth: 1,
    flex: 0.3,
    alignItems: 'flex-end',
  },
});
