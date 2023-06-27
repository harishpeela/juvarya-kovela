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
    paddingHorizontal: 10,
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
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularTextContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
