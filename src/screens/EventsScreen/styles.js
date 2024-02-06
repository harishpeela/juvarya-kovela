import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  Header: {
    // marginHorizontal: '-2%',
    // marginVertical: 10,
    // marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    marginHorizontal: '4%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    marginBottom: '3%',
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

  updateProfileTopCard: {
    height: 100,
  },
  followersContainer: {
    height: '100%',
  },
  sortContainer: {
    display: 'flex',
    width: '15%',
    height: '100%',

    // borderWidth:2,
  },
  list: {
    // borderWidth:1,
    marginBottom: 300,
  },
  noDataContainer: {
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: fontSize.xlarge,
    color: colors.black,
  },
  flatListStyle: {
    justifyContent: 'space-between',
  },
  eventContainer: {
    padding: 24,
    backgroundColor: '#FFAB0F',
    height: 150,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  searchAndNew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginStart: '40%',
    fontWeight: 'bold',
  },
  plusIcon: {
    color: colors.orangeColor,
  },
  eventAndPlus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  notificationContainer: {},
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
  searchAndFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1%',
    alignContent: 'center',
  },
  searchContainer: {
    width: '82%',
    height: '100%',
    margin: '2%',
  },
  ListContainer: {
    height: '97%',
  },
  sortContainer: {
    display: 'flex',
    width: '20%',
    height: '100%',
  },
  list: {},
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: fontSize.xlarge,
    color: colors.black,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // card: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container: {
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    marginStart: '35%',
  },
  customSearch: {
    height: 20,
  },
  card: {
    marginVertical: 20,
    width: '50%',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    marginTop: '50%',
  },
  noText: {
    fontSize:15,
    color: colors.orangeColor,
    fontFamily:'Poppins-Medium'
   
  },
});
