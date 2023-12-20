import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize } from '../../common';
export const styles = StyleSheet.create({
  Header: {
    // marginHorizontal: '3%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%',
  },

  bodyContainer: {
    marginHorizontal: '3%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    // borderWidth: 2,
    // borderColor: 'green',
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
    height: '97%',
  },
  sortContainer: {
    display: 'flex',
    width: '20%',
    height: '100%',
  },
  list: {
  },
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
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
