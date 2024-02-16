import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
    paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  searchContainers: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -20,
    width: '80%',
    marginLeft: 15,
  },
  plusContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 10,
    textAlign: 'center',
    height: 30,
    width: 30,
    marginRight: 10,
  },
  plusIcon: {
    color: colors.orangeColor,
  },
  noAvailable: {
    color: colors.orangeColor,
    fontFamily: fontFamily.popinMedium,
  marginTop:'5%',
  fontSize:15,
  textDecorationLine:'underline'
  // fontWeight:'bold'
  },
  searchbarContainer: {
    // borderWidth: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'50%'
  },
  bellContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    margin: 8,
  },
  bell: {marginLeft: 10, marginTop: 10},
  flatListStyle: {
    paddingBottom: 200,
  },
});
