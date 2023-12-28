import { StyleSheet } from "react-native"
import { colors, fontSize } from "../../common"

export const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:'3%',
        justifyContent:'space-between',
        alignItems:'center',
        height:80,
        elevation:5,
        backgroundColor:colors.white,
        borderRadius:10,
        paddingHorizontal:'2%',
        paddingVertical:'2%',
        marginVertical:'0.5%',
    },
    info:{
    width:'100%',
    marginRight:5
    },
    dateAndLocation:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'flex-start',
        
        
    },
    imageContainer:{
        height:'100%',
        width:'100%',
        borderRadius:20,
        // borderWidth:2
    },
    leftContainer:{
        // borderWidth:2,
        flexDirection:'row',
        // borderColor:'red',
        justifyContent:'space-around',
        alignItems:'center'

    },
    eventText:{
        color:colors.black,
        fontSize:fontSize.large,
    },
    locationIcon:{
        flexDirection:'row',
        alignSelf:'center'
    },
    Image:{
        height:'100%',
        width:'100%',
        borderRadius:60,
    },
    dateText:{
        color:colors.orangeColor,
        fontSize:10
    },
    infoContainer:{
        borderWidth:2,
    },
    EventNameAndIcon:{
        flexDirection:'row',
        justifyContent:'space-between'
    }

})