import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,   
    borderWidth:1,
  },

  field: {
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    fontSize: 13,
    height: 37,
    // borderWidth:0.5,
    width:"136%",
    borderRadius:10,
    textAlign:'center',
    // marginTop:20,
    marginBottom:30,
    backgroundColor:'#FAFAFA',
    padding:10,
  },
  iconContainer: {
    paddingLeft:8,
    flexDirection: 'row',
    marginTop:-17,
    borderRadius: 15,
    height:40,
    width:190,
    marginLeft:'3%',
   
    // backgroundColor:'red',
    
    borderRadius:24
  
    
  },
});
