import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  CardContainer: {},
  followersContainer: {
    borderWidth: 1,
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop: '5%',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  followersHeader: {
    marginHorizontal: '10%',
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    // marginHorizontal: '4%',
    display: 'flex',
    flexDirection: 'column',
    // borderWidth:5,
    marginBottom:110,
    backgroundColor:'white'
  },
  searchAndFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%',
    paddingHorizontal: '1%',
    justifyContent: 'space-between',
    height:'7%',
    width:'100%',
    padding:'1%',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '82%',
    height: '100%',
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
    marginBottom: 240,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%'
  },
  noDataText: {
    fontSize: 15,
    color: colors.orangeColor,
    fontFamily:'Poppins-Medium'
  },
  updateProfileTopCard:{
    height:100
  },
  searchbarContainer:{
    bottom:'46%',
    // width:100,
    marginTop:'-6%',
    // backgroundColor:'black',
    marginLeft:'12%',
    marginTop:'-1%'
   
   
    
  }

});
