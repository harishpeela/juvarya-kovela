import {StyleSheet, useColorScheme} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    
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
  },
  headingText:{
   marginRight:120,
   fontWeight:'bold',
   color:'#ffffff',
   fontSize:20
  },
  updateProfileTopCard:{
    height:100
  },
  keyBoardStyle: {
    margin: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  fieldContainer: {
    // marginTop: 30,
   
    
  },
  buttonContainer: {
    marginTop: 15,
    width: '70%',
    alignSelf: 'center',
  },

  isLogin: {
    fontFamily: fontFamily.popinBold,
    color: colors.red3,
    paddingLeft: 50,
  },
});
