import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
export const styles = StyleSheet.create({
  currentPlanView: {
    marginTop: 10,
    marginBottom: -28,
    zIndex: 3,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginLeft: 40,
    paddingVertical: 5,
    backgroundColor: 'blue',
    width: 100,
    alignItems: 'center',
  },
  currentPlanText: {
    color: 'white',
    fontSize: 16,
  },
  planCardView: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 30,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.2,
    marginVertical: 15,
    width: '90%',
  },
  followContainer: {
    marginLeft: 20,
  },
  planCardView1: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: 'lightgray',
    elevation: 3,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.2,
    width: 200,
    height: 150,
  },
  searchTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  searchTextInput: {fontSize: 18, maxWidth: '75%'},
  mainTabBgImg: {
    height: 250,
    width: 250,
    marginHorizontal: 7,
  },
  mainTabCardView: {
    position: 'absolute',
    top: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTabNameText: {
    fontSize: 28,
    color: 'white',
    marginLeft: '5%',
    fontWeight: '900',
  },
  mainTabDistText: {
    borderBottomWidth: 2,
    fontSize: 18,
    marginLeft: '15%',
    color: 'white',
  },
  mainTabHeartIcon: {position: 'absolute', top: '10%', right: '10%'},
  upComingTextTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
    alignItems: 'center',
  },
  upComingCardTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upComingCardTextName: {
    fontSize: 22,
    fontWeight: '800',
    color: 'black',
  },
  iconsearch: {
    marginHorizontal: 10,
  },
  touchable: {marginLeft: '90%', position: 'absolute'},
  imageContainer: {
    height: 250,
    width: 250,
    borderRadius: 35,
  },
  noAvailable: {
    color: colors.black,
    fontFamily: fontFamily.popinBold,
  },
  loaderContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCard: {
    top: '-20%',
    color: 'white',
    marginLeft: 10,
  },
});
