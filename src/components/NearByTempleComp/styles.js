import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  

voidButton1Text: {
    color: '#CC4501',
    marginLeft: '15%',
    fontSize: 11,
    fontWeight: '600',
    textAlign:'center'
  },
  
  
  
  voidButton1: {
    flexDirection: 'row',
    height: 40,
    width: 120,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
   
  },
  
  button:{
    elevation:2,
    backgroundColor: 'white',
    shadowColor: 'black', // Shadow color
    shadowOffset: {width: 2, height: 2}, // Shadow offset
    marginBottom: '1%',
    marginTop: '1%',
  },
});
