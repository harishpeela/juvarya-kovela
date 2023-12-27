import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize } from '../../common';
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
        marginTop:-50
    },
    searchAndFilter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
        // marginTop: '5%',
        paddingHorizontal: '1%',
        justifyContent: 'space-between',
        height: "7%",
        width: "100%",
        padding: "1%",
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
    flatListStyle:{
        justifyContent:'space-between',
        alignItems:'center'
    },
    eventContainer:{
        padding:24,
        backgroundColor:colors.orangeColor,
        height:170,
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
       },
    searchAndNew:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:"#FFFFFF",
        fontSize:25,
        marginHorizontal:'35%',
        marginBottom:20,
        fontWeight:'bold'
    },
    plusIcon:{
        color:colors.orangeColor
        
    },
    eventAndPlus:{
        flexDirection:'row'
    },
    notificationContainer:{
    
   
    },
    plusContainer:{
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        marginLeft:10,
        textAlign:'center',
        height:40,
        width:40
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
