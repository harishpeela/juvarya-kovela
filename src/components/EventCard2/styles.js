import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';

export const styles = StyleSheet.create({
  container: {
    height: 220,
    marginHorizontal: '1%',
    marginVertical: '1%',
    width: '48%',
    borderRadius: 7,
    elevation: 3,
    shadowColor: colors.black,
    backgroundColor: colors.white,
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    height: '65%',
    width: '100%',
    display: 'flex',
  },
  dateContainer: {
    backgroundColor: colors.orangeColor,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
  },
  dateText: {
    alignSelf: 'center',
  },
  festivalText: {
    color: colors.black,
    fontSize: 11,
    fontWeight: 'bold',
  },
  locationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:2,
    alignContent: 'center',
    alignSelf: 'center',
  },
  container2: {
    width: '97%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
});
