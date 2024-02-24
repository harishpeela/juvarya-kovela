import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,   
    borderWidth:1,
    // marginTop:'23%',  
  },

  field: {
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    fontSize: 13,
    height: 35,
    // borderWidth:0.5,
    width:"120%",
    borderRadius:10,
    textAlign:'center',
    marginBottom:30,
    backgroundColor:'#FAFAFA',
    padding:10,
  },
  iconContainer: {
    paddingLeft:8,
    flexDirection: 'row',
    marginBottom:10,
    borderRadius: 15,
    height:40,
    width:190,
    marginLeft:6,
    // backgroundColor:'black',
    
    borderRadius:24
  
    
  },
});
