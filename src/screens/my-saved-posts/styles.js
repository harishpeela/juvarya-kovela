import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  footerBackground: {
    borderRadius: 25,
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 30
  },
  headerContainer:{
    padding: 10,
    backgroundColor:'#FFAB0F',
    height:100,
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  headingText:{
    marginRight:140,
    fontWeight:'bold',
    color:'#ffffff',
    fontSize:20
   },
  updateProfileTopCard:{
 height:100
  },
  container:{
    flex: 1,
    borderWidth: 1,
    marginHorizontal: '5%',
    marginVertical: '2%',
    flexDirection: 'row',
    borderRadius: 20,
    padding: '2%',
  },
  saveddescription: {
    marginLeft: '5%',
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  
});
