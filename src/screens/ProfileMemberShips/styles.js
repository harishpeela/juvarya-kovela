import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingHorizontal: 30,

  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  container1: {
    // borderWidth: 2,
    height: '100%',
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    borderRadius: 20,
    marginTop: '20%',
    height: 250,
    elevation: 5,
    backgroundColor: colors.orangeColor,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  image: {
    height: 90,
    width: 90,
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
  button2: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 40,
    elevation: 3,
    height: 30,
    width: 100,
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
    fontSize: fontSize.large,
  },
  moreDetails: {
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: fontSize.large,
  },
  button: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 2,
    height: 20,
    width: 80,
    padding:1,
  },
  firstDetailsTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  followersContainer: {
    height: '100%',
  },
  sortContainer: {
    display: 'flex',
    width: '15%',
    height: '100%',
  },
  list: {
    marginBottom: 240,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: fontSize.xlarge,
    color: colors.black,
  },
 

});
