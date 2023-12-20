import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../common';

export const styles = StyleSheet.create({
  container: {
    height: 215,
    marginHorizontal: '1%',
    marginVertical: '1%',
    width: '48%',
    borderRadius: 7,
    elevation: 5,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderColor:colors.black,
  },
  secondContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:2
  },
  Image: {
    height: '65%',
    width: '100%',
    display: 'flex',
    borderRadius:5,
  },
  dateContainer: {
    backgroundColor: colors.orangeColor,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 5,
  },
  dateText: {
    alignSelf: 'center',
    color: colors.white,
    fontWeight: '800'
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
    alignContent: 'center',
    alignSelf: 'center',
  },
  container2: {
    width: '97%',
    alignSelf: 'center',
    alignItems: 'center',
    height:'31%',
    justifyContent:'space-between',
  },
});
