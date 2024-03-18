import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  CardContainer: {},
  followersContainer: {
    height: 700,
    
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
    marginTop: '5%',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  followersHeader: {
    marginHorizontal: '5%',
    marginVertical: -10,
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchAndFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'space-between',
    height: '7%',
    width: '100%',
    padding: '1%',
    alignContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '82%',
    height: '100%',
    marginTop: -15,
  },
  sortContainer: {
    display: 'flex',
    width: '15%',
    height: '100%',
  },
  list: {},
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
  },
  noDataText: {
    fontSize: fontSize.xlarge,
    color: colors.orangeColor,
    fontWeight: 'bold',
  },
  plusContainer: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    textAlign: 'center',
    height: 30,
    width: 30,
    marginRight: 10,
  },

  searchbarContainer:{     
      flexDirection:'row',
      alignItems:'center',
  }
});
