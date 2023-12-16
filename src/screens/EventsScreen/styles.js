import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  Header: {
    // marginHorizontal: '3%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:'2%'
  },

  bodyContainer: {
    marginHorizontal: '4%',
    display: 'flex',
    flexDirection: 'column',
  },
  searchAndFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'space-between',
    height: '7%',
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
    height: '100%',
    borderWidth:2,
    marginTop:20
  },
  sortContainer: {
    display: 'flex',
    width: '20%',
    height: '100%',

    // borderWidth:2,
  },
  list: {
    marginBottom: 300,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: fontSize.xlarge,
    color: colors.black,
  },
  flatListStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    paddingBottom: 500,
  },
});
