import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
export const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  borderView: {
    borderWidth: 1,
    marginTop: '15%',
    borderColor: colors.gray,
    marginBottom: '5%'
  },
  img: {
    height: 30,
    width: 30,
  },
  servicesView: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  listTxt: {
    fontSize: fontSize.large,
    fontWeight: fontFamily.hairline,
    color: colors.black,
    marginLeft: '30%',
  },
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
    marginLeft: '10%',
  },
});
