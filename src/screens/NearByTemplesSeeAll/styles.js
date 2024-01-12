import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  loaderContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 3,
    padding: 3,
    marginBottom:8,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  updateProfileTopCard:{
    height:100,
    marginBottom:10
  },
  headingText:{
    marginRight:140,
    fontWeight:'bold',
    color:'#ffffff',
    fontSize:20
   },
  headerContainer: {
    padding: 10,
    backgroundColor:'#FFAB0F',
    height:100,
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
});
