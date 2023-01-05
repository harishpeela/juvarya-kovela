import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
import {fontSize} from '../../common';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    // borderWidth: 2,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  image: {
    width: 40,
    height: 40,
    flex: 1,
  },
  textItemsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    // marginLeft: 5,
    alignItems: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontFamily: fontFamily.popinLight,
    baseText: fontSize.medium,
    color: colors.gray,
  },
  hi: {
    width: '100%',
    height: undefined,
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.popinMedium,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 3,
  },
  bellContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusContainer: {
    backgroundColor: colors.blue3,
    padding: 12,
    borderRadius: 10,
  },
  bell: {marginLeft: 10, marginTop: 10},
});
