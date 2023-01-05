import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  profileContainer: {
    marginTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoutbtnContainer: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
  },
  iconContainer: {flex: 0.15},
  textContainer: {flex: 0.85},
  profileItemsContainer: {
    marginTop: 20,
  },
  itemText1: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
    marginLeft: '10%'
  },
});
