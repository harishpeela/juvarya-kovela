import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: '5%',
  },
  itemText: {
    fontSize: 20,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {flex: 1},
  profileItemsContainer: {
    marginTop: '20%',
    marginLeft: '10%',
  },
  toogleContainer: {},
  addpujari: {
    color: colors.green2,
    fontSize: fontSize.h6,
    fontWeight: 'bold',
  },
  addPoojariView: {
    marginLeft: '10%',
    marginTop: '10%',
  },
  buttonContainer: {
    marginTop: '10%',
    width: 90,
    alignSelf: 'flex-end',
  },
  name: {
    marginLeft: 10,
    fontSize: fontSize.medium,
    textTransform: 'capitalize',
  },
  poojariDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  designation: {
    color: colors.green,
    fontWeight: 'bold',
    marginLeft: 18,
    fontSize: fontSize.small,
    marginTop: 10,
  },
  switch: {
    color: 'red',
  },
  poojariname: {
    padding: 20,
    width: '90%',
    height: '20%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '10%',
    backgroundColor: colors.green3,
  },
  addView: {
    padding: 20,
    width: '90%',
    height: '20%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '10%',
    backgroundColor: colors.green3,
  },
});
