import {View, StyleSheet} from 'react-native';
import {colors} from '../../common';

export const styles = StyleSheet.create({
    loadingScreen: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dotsWrapper: {
      display:'flex',
      flexDirection:'row',
      borderWidth:5,
    },
    mainContainer:{
      // borderWidth:10
    },
    container:{
      // borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
      
      // paddingVertical:5,
      // marginVertical:10,
    },
    mainContainer1:{
      // borderWidth:2
    },
    imageContainer:{
      borderRadius:50,
      elevation:2,
      shadowColor: colors.black,
      backgroundColor:'white',
      borderWidth:1,
      borderColor:colors.orangeColor,
      marginBottom:15,
    },
    Image:{
      height:50,
      width:50,
    },
  });
