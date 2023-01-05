import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginVertical: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 2,
  },
  img: {
    width: '100%',
    height: undefined,
    flex: 1,
    justifyContent: 'center',
  },
  imgContainer: {
    height: 180,
    // borderWidth: 2,
  },
  borderRadiusIcon: {
    borderRadius: 2,
  },
  borderRadiusImg: {
    borderRadius: 10,
  },
  date: {
    fontFamily: fontFamily.popinRegular,
    color: colors.gray,
    fontSize: 10,
  },
  topTittleContainer: {
    flex: 0.75,
  },
  followContainer: {
    flex: 0.25,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  contentItem1: {
    paddingVertical: 12,
    // borderWidth: 2,
  },
  headerItem2: {
    marginLeft: 16,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  footerContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    // borderWidth: 2,
  },
  footerItem: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItemMarginLeft: {
    marginLeft: 28,
  },
  colorBlack: {
    color: colors.black,
  },
  iconText: {
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    fontSize: 12,
    marginLeft: 3,
  },
  flex1: {
    flex: 1,
  },
  boldText: {
    fontFamily: fontFamily.popinMedium,
  },
  greenColor: {
    color: colors.green,
  },
  colorBlue: {
    color: colors.blue,
  },
  iconSize: {
    height: 40,
    width: 40,
  },
});
