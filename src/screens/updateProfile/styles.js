

import {StyleSheet, useColorScheme} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    padding: 10,
    
  },
  keyBoardStyle: {
    margin: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
    marginTop:'0%',
    justifyContent:'center'
  },
  fieldContainer: {
    marginTop: 30,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    
    
  },
  TextStyle:{
    fontSize:10,
   
  },
  buttonStyle:{
    color:colors.back,
    height:30,
    
  },
  genderText:{
  marginRight:'87%',
  color:colors.orangeColor,
  fontWeight:'normal',
  marginBottom:8
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
  centeredButtonContainer:{
    marginTop:'10%'
  },
  pickerContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.orangeColor,
  },
  pickerStyle: {
    height: 40,
    width: '100%',
    color: colors.orangeColor,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height:35
  },
  dropdownStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
  },
  textStyle:{
    fontSize:12,
  },
  dropDownContianer: {
    marginHorizontal: 10,
    marginTop: 30,
  },


});
