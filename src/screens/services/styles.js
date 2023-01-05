import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  toogleContainer: {},
  itemText: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 7,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'black',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 40,
    width: '70%',
  },
  iconContainer: {height: 30, width: 30, borderRadius: 20, marginRight: 20},
  textContainer: {flex: 0.85},
  profileItemsContainer: {
    marginTop: 20,
  },
});
