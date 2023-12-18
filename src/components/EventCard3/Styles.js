import { StyleSheet } from "react-native"
import { colors, fontSize } from "../../common"

export const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:'3%',
        justifyContent:'space-around',
        alignItems:'center',
        height:90,
        elevation:2,
        backgroundColor:colors.white,
        borderRadius:5,
        // paddingHorizontal:'2%',
        // paddingVertical:'2%',
        marginVertical:'2%',
        // borderColor:colors.orangeColor
    },
    imageContainer:{
       height:'75%',
       width:'18%',
        borderRadius:40,
        // borderWidth:2,
        overflow:'hidden',
        alignContent:'center',
        alignSelf:'center'
        
    },
    eventText:{
        color:colors.black,
        fontSize:fontSize.h6,
        fontWeight:'500'
    },
    locationIcon:{
        flexDirection:'row',
        alignSelf:'center'
    },
    Image:{
        height:'100%',
        width:'100%',
        resizeMode:'cover'
        // borderRadius:20,
    },
    dateText:{
        color:colors.orangeColor,
        fontSize:fontSize.large,
        fontWeight:'600'
    },
    infoContainer:{
        borderWidth:2,
    },

})