import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../../common'
import { Directions } from 'react-native-gesture-handler'

export const styles = StyleSheet.create({
    container: {
        // borderColor:colors.orangeColor,
        height: 250,
        marginHorizontal: "1%",
        marginVertical: "1%",
        width: '48%',
        // borderRadius: 5,
        // borderWidth:2,
        // elevation: 9,
        // backgroundColor: 'white',
        // shadowColor:colors.black,
        elevation: 3,
        shadowColor: colors.black,
        backgroundColor: colors.white,
        justifyContent: 'space-around',
        borderRadius: 24,

    },
    secondContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10'
    },

    Image: {
        height: "50%",
        width: "70%",
        borderRadius: 100,
        marginLeft: '15%',
        marginTop: 15
    },
    dateContainer: {
        // backgroundColor:colors.orangeColor,
        // textAlign: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        // width: '95',
        borderRadius: 2,
        marginBottom:2,
        flexDirection: 'row',
        
    },
    dateText: {
        // alignSelf: 'center',
        fontSize: 12,
        marginBottom:5
    },
    festivalText: {
        color: colors.black,
        fontSize: fontSize.small,
        fontWeight: '50',
        marginLeft: '20%'
    },
    locationAddressContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:2,
        width:150,
    },
    locationContainer: {
        backgroundColor:colors.blue,
        margin: 5,
        padding:3,
        borderRadius:14,
        height:'20%'
        
    },
    icon:{
        justifyContent:'flex-start',
        flexDirection:'row',
       
    },
    iconSize:{

    },
    text:{
        fontSize:10,
    },
    locationText: {
        fontSize: 12,
        marginLeft:10
    },
    container2: {
        width: '97%',
        height: '30%',
        flexDirection: 'row'
    },
    // dateContainer:{
    //     flexDirection:'row',
    //     // borderWidth:1,
    //     justifyContent:'space-between',
    //     width:"95%"
    // },
    // hrLine:{
    //     borderWidth:0.2,
    //     borderColor:colors.gray
    // },
    // text:{
    //     color:colors.black
    // }

})

