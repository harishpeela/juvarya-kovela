import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  searchTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  searchContainer: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -20,
  },
  searchTextInput: {fontSize: 18, maxWidth: '75%'},
  upComingTextTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
    alignItems: 'center',
  },
  iconsearch: {
    marginHorizontal: 10,
  },
  touchable: {marginLeft: '90%', position: 'absolute'},
  noAvailable: {
    color: colors.black,
    fontFamily: fontFamily.popinBold,
  },
  loaderContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularTextContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  nodataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nodatatext: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  }
});
