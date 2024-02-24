import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  CardContainer: {},
  followersContainer: {
    borderWidth: 1,
  },
  headerContainer: {
    padding: 10,
    backgroundColor:'white',
    height:100,
    width:'100%',
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
    flexDirection:'row',
    alignItems:'center',
    // justifyContent:'space-between'
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
    marginHorizontal: '4%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%'
    // borderWidth:5,
    // marginBottom:200,
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
    height: '100%'
    
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
  },
  noDataText: {
    fontSize: fontSize.xlarge,
    color: colors.black,
  },
  updateProfileTopCard:{
    height:100
  },
  noText: {
    flex: 1,
    alignItems: 'center',
    marginTop: '75%',
    ntext: {
      fontWeight: 'bold',
      color: colors.orangeColor,
      fontSize: 20,
      fontFamily:'Poppins-Medium'
    }
  },
});
