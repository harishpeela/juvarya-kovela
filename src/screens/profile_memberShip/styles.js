import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  container1: {
    borderWidth: 2,
    height: '100%',
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    borderRadius: 5,
    marginTop: '20%',
    height: 250,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.orangeColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100 / 2,
  },
  border: {
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  firstDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '20%',
    justifyContent: 'space-between',
  },
  firstDetailsText: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: colors.white,
    fontSize: fontSize.h4,
    fontWeight: '500',
  },
  lastContainerText: {},
  button: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 5,
    height: 40,
    width: 120,
  },
  buttonText: {
    color: colors.black,
  },
  priceText: {
    fontSize: fontSize.small,
    color: colors.white,
    textDecorationLine: 'line-through',
  },
  priceText2: {
    color: colors.white,
    fontSize: fontSize.h4,
  },
  description: {
    color: colors.white,
  },
  moreDetails: {
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: fontSize.large,
  },
});
